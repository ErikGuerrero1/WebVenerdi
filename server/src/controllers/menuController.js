const { pool } = require("../config/database.js");

// Obtener todos los productos con información completa
const getAllProducts = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.ProductID,
                p.Name,
                p.Description,
                p.BasePrice,
                p.Available,
                p.ImageURL,
                c.CategoryID,
                c.Name AS Category,
                c.Description AS CategoryDescription
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE p.Available > 0
            ORDER BY c.Name, p.Name
        `;

        const [rows] = await pool.execute(query);

        // Procesamos los productos para incluir tamaños e ingredientes
        const productsWithDetails = await Promise.all(rows.map(async (product) => {
            // Obtenemos los tamaños
            const sizesQuery = `SELECT ProductSizeID, Size, Price FROM productsize WHERE ProductID = ? ORDER BY Price`;
            const [sizes] = await pool.execute(sizesQuery, [product.ProductID]);

            // Obtenemos los ingredientes
            const ingredientsQuery = `
                SELECT i.IngredientID, i.Name 
                FROM ingredient i
                INNER JOIN product_ingredient pi ON i.IngredientID = pi.IngredientID
                WHERE pi.ProductID = ?
            `;
            const [ingredients] = await pool.execute(ingredientsQuery, [product.ProductID]);

            return {
                ...product,
                ImageURL: product.ImageURL
                    ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                    : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
                sizes: sizes,
                ingredients: ingredients
            };
        }));

        return res.status(200).json({
            success: true,
            data: productsWithDetails
        });

    } catch (error) {
        console.error('Error getting all products:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos'
        });
    }
};

// Obtener productos por categoría
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const query = `
            SELECT 
                p.ProductID,
                p.Name,
                p.Description,
                p.BasePrice,
                p.Available,
                p.ImageURL,
                c.CategoryID,
                c.Name AS Category,
                c.Description AS CategoryDescription
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE p.CategoryID = ? AND p.Available > 0
            ORDER BY p.Name
        `;

        const [rows] = await pool.execute(query, [categoryId]);

        // Procesamos los productos para incluir tamaños e ingredientes
        const productsWithDetails = await Promise.all(rows.map(async (product) => {
            // Obtenemos los tamaños
            const sizesQuery = `SELECT ProductSizeID, Size, Price FROM productsize WHERE ProductID = ? ORDER BY Price`;
            const [sizes] = await pool.execute(sizesQuery, [product.ProductID]);

            // Obtenemos los ingredientes
            const ingredientsQuery = `
                SELECT i.IngredientID, i.Name 
                FROM ingredient i
                INNER JOIN product_ingredient pi ON i.IngredientID = pi.IngredientID
                WHERE pi.ProductID = ?
            `;
            const [ingredients] = await pool.execute(ingredientsQuery, [product.ProductID]);

            return {
                ...product,
                ImageURL: product.ImageURL
                    ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                    : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
                sizes: sizes,
                ingredients: ingredients
            };
        }));

        return res.status(200).json({
            success: true,
            data: productsWithDetails
        });

    } catch (error) {
        console.error('Error getting products by category:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos por categoría'
        });
    }
};

// Obtener producto por ID con todos los detalles
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const query = `
            SELECT 
                p.ProductID,
                p.Name,
                p.Description,
                p.BasePrice,
                p.Available,
                p.ImageURL,
                c.CategoryID,
                c.Name AS Category,
                c.Description AS CategoryDescription
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE p.ProductID = ?
        `;

        const [rows] = await pool.execute(query, [productId]);
        const product = rows[0] || null;

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Obtenemos los tamaños
        const sizesQuery = `SELECT ProductSizeID, Size, Price FROM productsize WHERE ProductID = ? ORDER BY Price`;
        const [sizes] = await pool.execute(sizesQuery, [productId]);

        // Obtenemos los ingredientes
        const ingredientsQuery = `
            SELECT i.IngredientID, i.Name 
            FROM ingredient i
            INNER JOIN product_ingredient pi ON i.IngredientID = pi.IngredientID
            WHERE pi.ProductID = ?
        `;
        const [ingredients] = await pool.execute(ingredientsQuery, [productId]);

        // Agregamos URL completa para la imagen
        product.ImageURL = product.ImageURL
            ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
            : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`;

        product.sizes = sizes;
        product.ingredients = ingredients;

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error('Error getting product by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el producto'
        });
    }
};

// Buscar productos por nombre
const searchProducts = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search || search.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda requerido'
            });
        }

        const query = `
            SELECT 
                p.ProductID,
                p.Name,
                p.Description,
                p.BasePrice,
                p.Available,
                p.ImageURL,
                c.CategoryID,
                c.Name AS Category
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE (p.Name LIKE ? OR p.Description LIKE ?) AND p.Available > 0
            ORDER BY p.Name
        `;

        const searchTerm = `%${search}%`;
        const [rows] = await pool.execute(query, [searchTerm, searchTerm]);

        // Agregamos URL completa para las imágenes
        const products = rows.map((product) => ({
            ...product,
            ImageURL: product.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        return res.status(200).json({
            success: true,
            data: products,
            count: products.length
        });

    } catch (error) {
        console.error('Error searching products:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al buscar productos'
        });
    }
};

// Obtener menú completo organizado por categorías
const getFullMenu = async (req, res) => {
    try {
        // Primero obtenemos todas las categorías
        const categoriesQuery = `SELECT * FROM category ORDER BY Name`;
        const [categories] = await pool.execute(categoriesQuery);

        // Para cada categoría, obtenemos sus productos
        const menuData = await Promise.all(categories.map(async (category) => {
            const productsQuery = `
                SELECT 
                    p.ProductID,
                    p.Name,
                    p.Description,
                    p.BasePrice,
                    p.Available,
                    p.ImageURL
                FROM product p
                WHERE p.CategoryID = ? AND p.Available > 0
                ORDER BY p.Name
            `;

            const [products] = await pool.execute(productsQuery, [category.CategoryID]);

            // Procesamos cada producto para incluir tamaños
            const productsWithSizes = await Promise.all(products.map(async (product) => {
                const sizesQuery = `SELECT ProductSizeID, Size, Price FROM productsize WHERE ProductID = ? ORDER BY Price`;
                const [sizes] = await pool.execute(sizesQuery, [product.ProductID]);

                return {
                    ...product,
                    ImageURL: product.ImageURL
                        ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                        : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
                    sizes: sizes
                };
            }));

            return {
                ...category,
                products: productsWithSizes
            };
        }));

        return res.status(200).json({
            success: true,
            data: menuData
        });

    } catch (error) {
        console.error('Error getting full menu:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el menú completo'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    searchProducts,
    getFullMenu
};