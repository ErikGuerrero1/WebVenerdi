const { pool } = require("../config/database.js");

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute(`SELECT product.ProductID, product.Name, product.Description, product.BasePrice, product.Available, category.Name AS CategoryName, product.ImageURL
            FROM product, category
            WHERE product.CategoryID = category.CategoryID
            ORDER BY ProductID;`);

        // Añadir http://localhost:3000/
        const products = rows.map(product => ({
            ...product,
            ImageURL: `http://localhost:3000/images/${product.ImageURL}`
        }));
        res.json({
            success: true,
            data: products,
            message: 'Productos obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        const [rows] = await pool.execute(
            `SELECT product.ProductID, product.Name, product.Description, product.BasePrice, product.Available, category.Name AS CategoryName, product.ImageURL
            FROM product, category
            WHERE product.CategoryID = category.CategoryID AND product.ProductID = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0],
            message: 'Producto obtenido exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { Name, Description, BasePrice, Available, CategoryID, ImageURL } = req.body;

        console.log('Datos recibidos para crear producto:', req.body);

        if (!Name || !Description || !BasePrice || !CategoryID) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos para crear el producto'
            });
        }

        // Verificar que CategoryID sea un número válido
        if (isNaN(CategoryID)) {
            return res.status(400).json({
                success: false,
                message: 'ID de categoría inválido'
            });
        }

        // Verificar si ya existe un producto con el mismo nombre
        const [existing] = await pool.execute(
            'SELECT ProductID FROM product WHERE Name = ?',
            [Name]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un producto con ese nombre'
            });
        }

        const [newProduct] = await pool.execute(
            `INSERT INTO product (Name, Description, BasePrice, Available, CategoryID, ImageURL)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [Name, Description, BasePrice, Available, CategoryID, ImageURL]
        );

        const [result] = await pool.execute(
            'SELECT ProductID, Name, Description, BasePrice, Available, CategoryID, ImageURL FROM product WHERE ProductID = ?',
            [newProduct.insertId]
        );

        const product = {
            ...result[0],
            ImageURL: `http://localhost:3000/images/${result[0].ImageURL}`
        };

        res.status(201).json({
            success: true,
            data: product,
            message: 'Producto creado exitosamente'
        });

    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Description, BasePrice, Available, CategoryID, ImageURL } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        // Validaciones
        if (!Name || !Description || !BasePrice || !CategoryID) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos para actualizar el producto'
            });
        }

        // Verificar que CategoryID sea un número válido
        if (isNaN(CategoryID)) {
            return res.status(400).json({
                success: false,
                message: 'ID de categoría inválido'
            });
        }

        // Verificar si el producto existe
        const [existing] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar si ya existe un producto con el mismo nombre
        const [duplicate] = await pool.execute(
            'SELECT ProductID FROM product WHERE Name = ? AND ProductID != ?',
            [Name, id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un producto con ese nombre'
            });
        }

        const [result] = await pool.execute(
            `UPDATE product SET Name = ?, Description = ?, BasePrice = ?, Available = ?, CategoryID = ?, ImageURL = ?
            WHERE ProductID = ?`,
            [Name, Description, BasePrice, Available, CategoryID, ImageURL, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        const [updatedProduct] = await pool.execute(
            'SELECT p.*, c.Name AS CategoryName FROM product p JOIN category c ON p.CategoryID = c.CategoryID WHERE p.ProductID = ?',
            [id]
        );

        const product = {
            ...updatedProduct[0],
            ImageURL: `http://localhost:3000/images/${updatedProduct[0].ImageURL}`
        };

        res.json({
            success: true,
            data: product,
            message: 'Producto actualizado exitosamente'
        });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        // Verificar si el producto existe
        const [existing] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Verificar si el producto está asociado a alguna orden
        //const [orders] = await pool.execute(
        //    'SELECT OrderID FROM order WHERE ProductID = ?',
        //    [id]
        //);
//
        //if (orders.length > 0) {
        //    return res.status(400).json({
        //        success: false,
        //        message: 'No se puede eliminar el producto porque está asociado a una orden'
        //    });
        //}
//
        await pool.execute('DELETE FROM product WHERE ProductID = ?', [id]);

        res.json({
            success: true,
            data: existing[0],
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};