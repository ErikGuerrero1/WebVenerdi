const { pool } = require("../config/database.js");

// Obtener todos los tamaños de productos
const getAllProductSizes = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            ORDER BY ps.ProductID, ps.Price
        `);
        res.json({
            success: true,
            data: rows,
            message: 'Tamaños de productos obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener tamaños de productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener tamaños por ProductID
const getProductSizesByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!productId || isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de producto inválido'
            });
        }

        const [rows] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            WHERE ps.ProductID = ?
            ORDER BY ps.Price
        `, [productId]);

        res.json({
            success: true,
            data: rows,
            message: 'Tamaños del producto obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener tamaños del producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener un tamaño específico por ID
const getProductSizeById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de tamaño inválido'
            });
        }

        const [rows] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            WHERE ps.ProductSizeID = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tamaño de producto no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0],
            message: 'Tamaño de producto obtenido exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener tamaño de producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear un nuevo tamaño de producto
const createProductSize = async (req, res) => {
    try {
        const { ProductID, Size, Price } = req.body;

        // Validaciones
        if (!ProductID || isNaN(ProductID)) {
            return res.status(400).json({
                success: false,
                message: 'ProductID es requerido y debe ser un número'
            });
        }

        if (!Size || Size.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El tamaño es requerido'
            });
        }

        if (Size.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'El tamaño no puede exceder 50 caracteres'
            });
        }

        if (!Price || isNaN(Price) || Price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El precio es requerido y debe ser un número mayor a 0'
            });
        }

        // Verificar si el producto existe
        const [productExists] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [ProductID]
        );

        if (productExists.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El producto especificado no existe'
            });
        }

        // Verificar si ya existe el mismo tamaño para el producto
        const [existing] = await pool.execute(
            'SELECT ProductSizeID FROM productsize WHERE ProductID = ? AND Size = ?',
            [ProductID, Size.trim()]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe este tamaño para el producto'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO productsize (ProductID, Size, Price) VALUES (?, ?, ?)',
            [ProductID, Size.trim(), Price]
        );

        // Obtener el tamaño recién creado
        const [newProductSize] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            WHERE ps.ProductSizeID = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            data: newProductSize[0],
            message: 'Tamaño de producto creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear tamaño de producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Actualizar un tamaño de producto
const updateProductSize = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductID, Size, Price } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de tamaño inválido'
            });
        }

        // Validaciones
        if (!ProductID || isNaN(ProductID)) {
            return res.status(400).json({
                success: false,
                message: 'ProductID es requerido y debe ser un número'
            });
        }

        if (!Size || Size.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El tamaño es requerido'
            });
        }

        if (Size.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'El tamaño no puede exceder 50 caracteres'
            });
        }

        if (!Price || isNaN(Price) || Price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El precio es requerido y debe ser un número mayor a 0'
            });
        }

        // Verificar si el tamaño existe
        const [existing] = await pool.execute(
            'SELECT ProductSizeID FROM productsize WHERE ProductSizeID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tamaño de producto no encontrado'
            });
        }

        // Verificar si el producto existe
        const [productExists] = await pool.execute(
            'SELECT ProductID FROM product WHERE ProductID = ?',
            [ProductID]
        );

        if (productExists.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El producto especificado no existe'
            });
        }

        // Verificar si ya existe el mismo tamaño para el producto (excluyendo el actual)
        const [duplicate] = await pool.execute(
            'SELECT ProductSizeID FROM productsize WHERE ProductID = ? AND Size = ? AND ProductSizeID != ?',
            [ProductID, Size.trim(), id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe este tamaño para el producto'
            });
        }

        await pool.execute(
            'UPDATE productsize SET ProductID = ?, Size = ?, Price = ? WHERE ProductSizeID = ?',
            [ProductID, Size.trim(), Price, id]
        );

        // Obtener el tamaño actualizado
        const [updatedProductSize] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            WHERE ps.ProductSizeID = ?
        `, [id]);

        res.json({
            success: true,
            data: updatedProductSize[0],
            message: 'Tamaño de producto actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar tamaño de producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar un tamaño de producto
const deleteProductSize = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de tamaño inválido'
            });
        }

        // Verificar si el tamaño existe
        const [existing] = await pool.execute(`
            SELECT ps.*, p.Name as ProductName 
            FROM productsize ps
            LEFT JOIN product p ON ps.ProductID = p.ProductID
            WHERE ps.ProductSizeID = ?
        `, [id]);

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tamaño de producto no encontrado'
            });
        }

        // Aquí podrías verificar si hay órdenes que usan este tamaño
        // Por ahora solo eliminamos directamente

        await pool.execute('DELETE FROM productsize WHERE ProductSizeID = ?', [id]);

        res.json({
            success: true,
            data: existing[0],
            message: 'Tamaño de producto eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar tamaño de producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllProductSizes,
    getProductSizesByProductId,
    getProductSizeById,
    createProductSize,
    updateProductSize,
    deleteProductSize
};