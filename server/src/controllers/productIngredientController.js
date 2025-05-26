const { pool } = require("../config/database.js");

// Obtener ingredientes de un producto específico
const getProductIngredients = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId || isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        const [rows] = await pool.execute(`
            SELECT 
                pi.ProductID,
                pi.IngredientID,
                i.Name as IngredientName,
                p.Name as ProductName
            FROM product_ingredient pi
            JOIN ingredient i ON pi.IngredientID = i.IngredientID
            JOIN product p ON pi.ProductID = p.ProductID
            WHERE pi.ProductID = ?
            ORDER BY i.Name
        `, [productId]);

        res.json({
            success: true,
            data: rows,
            message: 'Ingredientes del producto obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener ingredientes del producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener productos que contienen un ingrediente específico
const getProductsByIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        if (!ingredientId || isNaN(ingredientId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        const [rows] = await pool.execute(`
            SELECT 
                pi.ProductID,
                pi.IngredientID,
                p.Name as ProductName,
                p.Description as ProductDescription,
                p.BasePrice,
                p.ImageURL,
                i.Name as IngredientName
            FROM product_ingredient pi
            JOIN product p ON pi.ProductID = p.ProductID
            JOIN ingredient i ON pi.IngredientID = i.IngredientID
            WHERE pi.IngredientID = ? AND p.Available > 0
            ORDER BY p.Name
        `, [ingredientId]);

        // Agregar URL completa para las imágenes
        const products = rows.map((product) => ({
            ...product,
            ImageURL: product.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        res.json({
            success: true,
            data: products,
            message: 'Productos con el ingrediente obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener productos por ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Asignar ingredientes a un producto (en lote) - VERSIÓN CORREGIDA
const assignIngredientsToProduct = async (req, res) => {
    let connection;

    try {
        const { productId } = req.params;
        const { ingredientIds } = req.body; // Array de IDs de ingredientes

        if (!productId || isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un array de IDs de ingredientes'
            });
        }

        // Verificar si el producto existe
        const [productExists] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [productId]
        );

        if (productExists.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El producto especificado no existe'
            });
        }

        // Verificar que todos los ingredientes existen
        const placeholders = ingredientIds.map(() => '?').join(',');
        const [ingredientsExist] = await pool.execute(
            `SELECT IngredientID FROM ingredient WHERE IngredientID IN (${placeholders})`,
            ingredientIds
        );

        if (ingredientsExist.length !== ingredientIds.length) {
            return res.status(400).json({
                success: false,
                message: 'Uno o más ingredientes no existen'
            });
        }

        // Obtener conexión del pool para manejar transacciones
        connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Eliminar ingredientes actuales del producto
            await connection.execute(
                'DELETE FROM product_ingredient WHERE ProductID = ?',
                [productId]
            );

            // Insertar nuevos ingredientes
            for (const ingredientId of ingredientIds) {
                await connection.execute(
                    'INSERT INTO product_ingredient (ProductID, IngredientID) VALUES (?, ?)',
                    [productId, ingredientId]
                );
            }

            await connection.commit();

            // Obtener la lista actualizada de ingredientes
            const [updatedIngredients] = await pool.execute(`
                SELECT 
                    pi.ProductID,
                    pi.IngredientID,
                    i.Name as IngredientName,
                    p.Name as ProductName
                FROM product_ingredient pi
                JOIN ingredient i ON pi.IngredientID = i.IngredientID
                JOIN product p ON pi.ProductID = p.ProductID
                WHERE pi.ProductID = ?
                ORDER BY i.Name
            `, [productId]);

            res.json({
                success: true,
                data: updatedIngredients,
                message: 'Ingredientes asignados al producto exitosamente'
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        }

    } catch (error) {
        console.error('Error al asignar ingredientes al producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// Agregar un ingrediente específico a un producto
const addIngredientToProduct = async (req, res) => {
    try {
        const { productId, ingredientId } = req.params;

        if (!productId || isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        if (!ingredientId || isNaN(ingredientId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        // Verificar si el producto existe
        const [productExists] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [productId]
        );

        if (productExists.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El producto especificado no existe'
            });
        }

        // Verificar si el ingrediente existe
        const [ingredientExists] = await pool.execute(
            'SELECT IngredientID FROM ingredient WHERE IngredientID = ?',
            [ingredientId]
        );

        if (ingredientExists.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El ingrediente especificado no existe'
            });
        }

        // Verificar si la relación ya existe
        const [relationExists] = await pool.execute(
            'SELECT * FROM product_ingredient WHERE ProductID = ? AND IngredientID = ?',
            [productId, ingredientId]
        );

        if (relationExists.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El ingrediente ya está asignado a este producto'
            });
        }

        // Insertar la nueva relación
        await pool.execute(
            'INSERT INTO product_ingredient (ProductID, IngredientID) VALUES (?, ?)',
            [productId, ingredientId]
        );

        // Obtener información detallada de la relación creada
        const [newRelation] = await pool.execute(`
            SELECT 
                pi.ProductID,
                pi.IngredientID,
                i.Name as IngredientName,
                p.Name as ProductName
            FROM product_ingredient pi
            JOIN ingredient i ON pi.IngredientID = i.IngredientID
            JOIN product p ON pi.ProductID = p.ProductID
            WHERE pi.ProductID = ? AND pi.IngredientID = ?
        `, [productId, ingredientId]);

        res.status(201).json({
            success: true,
            data: newRelation[0],
            message: 'Ingrediente agregado al producto exitosamente'
        });
    } catch (error) {
        console.error('Error al agregar ingrediente al producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Remover un ingrediente de un producto
const removeIngredientFromProduct = async (req, res) => {
    try {
        const { productId, ingredientId } = req.params;

        if (!productId || isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        if (!ingredientId || isNaN(ingredientId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        // Verificar si la relación existe
        const [relationExists] = await pool.execute(`
            SELECT 
                pi.ProductID,
                pi.IngredientID,
                i.Name as IngredientName,
                p.Name as ProductName
            FROM product_ingredient pi
            JOIN ingredient i ON pi.IngredientID = i.IngredientID
            JOIN product p ON pi.ProductID = p.ProductID
            WHERE pi.ProductID = ? AND pi.IngredientID = ?
        `, [productId, ingredientId]);

        if (relationExists.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'El ingrediente no está asignado a este producto'
            });
        }

        // Eliminar la relación
        await pool.execute(
            'DELETE FROM product_ingredient WHERE ProductID = ? AND IngredientID = ?',
            [productId, ingredientId]
        );

        res.json({
            success: true,
            data: relationExists[0],
            message: 'Ingrediente removido del producto exitosamente'
        });
    } catch (error) {
        console.error('Error al remover ingrediente del producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener todas las relaciones producto-ingrediente
const getAllProductIngredients = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                pi.ProductID,
                pi.IngredientID,
                p.Name as ProductName,
                p.Description as ProductDescription,
                p.ImageURL,
                i.Name as IngredientName
            FROM product_ingredient pi
            JOIN product p ON pi.ProductID = p.ProductID
            JOIN ingredient i ON pi.IngredientID = i.IngredientID
            ORDER BY p.Name, i.Name
        `);

        // Agregar URL completa para las imágenes
        const relations = rows.map((relation) => ({
            ...relation,
            ImageURL: relation.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${relation.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        res.json({
            success: true,
            data: relations,
            message: 'Todas las relaciones producto-ingrediente obtenidas exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener relaciones producto-ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Función auxiliar para buscar productos por múltiples ingredientes
const getProductsByMultipleIngredients = async (req, res) => {
    try {
        const { ingredientIds } = req.body; // Array de IDs de ingredientes

        if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un array de IDs de ingredientes'
            });
        }

        const placeholders = ingredientIds.map(() => '?').join(',');

        // Buscar productos que contengan TODOS los ingredientes especificados
        const [rows] = await pool.execute(`
            SELECT 
                p.ProductID,
                p.Name as ProductName,
                p.Description,
                p.BasePrice,
                p.ImageURL,
                c.Name as CategoryName,
                COUNT(pi.IngredientID) as MatchingIngredients
            FROM product p
            LEFT JOIN category c ON p.CategoryID = c.CategoryID
            LEFT JOIN product_ingredient pi ON p.ProductID = pi.ProductID
            WHERE pi.IngredientID IN (${placeholders}) AND p.Available > 0
            GROUP BY p.ProductID, p.Name, p.Description, p.BasePrice, p.ImageURL, c.Name
            HAVING COUNT(pi.IngredientID) = ?
            ORDER BY p.Name
        `, [...ingredientIds, ingredientIds.length]);

        // Agregar URL completa para las imágenes
        const products = rows.map((product) => ({
            ...product,
            ImageURL: product.ImageURL
                ? `${process.env.BASE_URL || "http://localhost:3000"}/images/${product.ImageURL}`
                : `${process.env.BASE_URL || "http://localhost:3000"}/images/products/default.jpg`,
        }));

        res.json({
            success: true,
            data: products,
            message: 'Productos encontrados con todos los ingredientes especificados'
        });
    } catch (error) {
        console.error('Error al buscar productos por múltiples ingredientes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getProductIngredients,
    getProductsByIngredient,
    assignIngredientsToProduct,
    addIngredientToProduct,
    removeIngredientFromProduct,
    getAllProductIngredients,
    getProductsByMultipleIngredients
};