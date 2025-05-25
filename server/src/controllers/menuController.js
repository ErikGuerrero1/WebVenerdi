const { pool } = require("../config/database.js");

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
                c.Name AS Category
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE p.Available > 0
            ORDER BY c.Name, p.Name
        `;

        const [rows] = await pool.execute(query);

        // Agregamos URL completa para las imágenes
        const products = rows.map((product) => ({
            ...product,
            ImageURL: product.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error('Error getting all products:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos'
        });
    }
};

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
                c.Name AS Category
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            WHERE p.CategoryID = ? AND p.Available > 0
            ORDER BY p.Name
        `;

        const [rows] = await pool.execute(query, [categoryId]);

        // Agregamos URL completa para las imágenes
        const products = rows.map((product) => ({
            ...product,
            ImageURL: product.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error('Error getting products by category:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos por categoría'
        });
    }
};

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
                c.Name AS Category
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

        // Agregamos URL completa para la imagen
        product.ImageURL = product.ImageURL
            ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
            : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`;

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

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
};