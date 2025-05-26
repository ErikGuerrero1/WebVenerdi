const { pool } = require("../config/database.js");

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM category ORDER BY CategoryID');
        res.json({
            success: true,
            data: rows,
            message: 'Categorías obtenidas exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de categoría inválido'
            });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM category WHERE CategoryID = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            data: rows[0],
            message: 'Categoría obtenida exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
    try {
        const { Name, Description } = req.body;

        // Validaciones
        if (!Name || Name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la categoría es requerido'
            });
        }

        if (Name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'El nombre no puede exceder 100 caracteres'
            });
        }

        // Verificar si ya existe una categoría con el mismo nombre
        const [existing] = await pool.execute(
            'SELECT CategoryID FROM category WHERE Name = ?',
            [Name.trim()]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO category (Name, Description) VALUES (?, ?)',
            [Name.trim(), Description || null]
        );

        // Obtener la categoría recién creada
        const [newCategory] = await pool.execute(
            'SELECT * FROM category WHERE CategoryID = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            data: newCategory[0],
            message: 'Categoría creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de categoría inválido'
            });
        }

        const { Name, Description } = req.body;

        // Validaciones
        if (!Name || Name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de la categoría es requerido'
            });
        }

        if (Name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'El nombre no puede exceder 100 caracteres'
            });
        }

        // Verificar si la categoría existe
        const [existing] = await pool.execute(
            'SELECT CategoryID FROM category WHERE CategoryID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        // Verificar si ya existe otra categoría con el mismo nombre
        const [duplicate] = await pool.execute(
            'SELECT CategoryID FROM category WHERE Name = ? AND CategoryID != ?',
            [Name.trim(), id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe otra categoría con ese nombre'
            });
        }

        await pool.execute(
            'UPDATE category SET Name = ?, Description = ? WHERE CategoryID = ?',
            [Name.trim(), Description || null, id]
        );

        // Obtener la categoría actualizada
        const [updatedCategory] = await pool.execute(
            'SELECT * FROM category WHERE CategoryID = ?',
            [id]
        );

        res.json({
            success: true,
            data: updatedCategory[0],
            message: 'Categoría actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de categoría inválido'
            });
        }

        // Verificar si la categoría existe
        const [existing] = await pool.execute(
            'SELECT * FROM category WHERE CategoryID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        // Verificar si hay productos asociados a esta categoría
        const [products] = await pool.execute(
            'SELECT COUNT(*) as count FROM product WHERE CategoryID = ?',
            [id]
        );

        if (products[0].count > 0) {
            return res.status(400).json({
                success: false,
                message: 'No se puede eliminar la categoría porque tiene productos asociados'
            });
        }

        await pool.execute('DELETE FROM category WHERE CategoryID = ?', [id]);

        res.json({
            success: true,
            data: existing[0],
            message: 'Categoría eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};