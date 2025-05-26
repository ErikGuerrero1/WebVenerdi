const { pool } = require("../config/database.js");

// Obtener todos los ingredientes
const getAllIngredients = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM ingredient ORDER BY Name');
        res.json({
            success: true,
            data: rows,
            message: 'Ingredientes obtenidos exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener ingredientes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener un ingrediente por ID
const getIngredientById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM ingredient WHERE IngredientID = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ingrediente no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0],
            message: 'Ingrediente obtenido exitosamente'
        });
    } catch (error) {
        console.error('Error al obtener ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear un nuevo ingrediente
const createIngredient = async (req, res) => {
    try {
        const { Name } = req.body;

        // Validaciones
        if (!Name || Name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del ingrediente es requerido'
            });
        }

        if (Name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'El nombre no puede exceder 100 caracteres'
            });
        }

        // Verificar si ya existe un ingrediente con el mismo nombre
        const [existing] = await pool.execute(
            'SELECT IngredientID FROM ingredient WHERE Name = ?',
            [Name.trim()]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un ingrediente con ese nombre'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO ingredient (Name) VALUES (?)',
            [Name.trim()]
        );

        // Obtener el ingrediente recién creado
        const [newIngredient] = await pool.execute(
            'SELECT * FROM ingredient WHERE IngredientID = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            data: newIngredient[0],
            message: 'Ingrediente creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Actualizar un ingrediente
const updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        // Validaciones
        if (!Name || Name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del ingrediente es requerido'
            });
        }

        if (Name.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'El nombre no puede exceder 100 caracteres'
            });
        }

        // Verificar si el ingrediente existe
        const [existing] = await pool.execute(
            'SELECT IngredientID FROM ingredient WHERE IngredientID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ingrediente no encontrado'
            });
        }

        // Verificar si ya existe otro ingrediente con el mismo nombre
        const [duplicate] = await pool.execute(
            'SELECT IngredientID FROM ingredient WHERE Name = ? AND IngredientID != ?',
            [Name.trim(), id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe otro ingrediente con ese nombre'
            });
        }

        await pool.execute(
            'UPDATE ingredient SET Name = ? WHERE IngredientID = ?',
            [Name.trim(), id]
        );

        // Obtener el ingrediente actualizado
        const [updatedIngredient] = await pool.execute(
            'SELECT * FROM ingredient WHERE IngredientID = ?',
            [id]
        );

        res.json({
            success: true,
            data: updatedIngredient[0],
            message: 'Ingrediente actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar un ingrediente
const deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de ingrediente inválido'
            });
        }

        // Verificar si el ingrediente existe
        const [existing] = await pool.execute(
            'SELECT * FROM ingredient WHERE IngredientID = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ingrediente no encontrado'
            });
        }

        // Verificar si hay productos asociados a este ingrediente
        const [products] = await pool.execute(
            'SELECT COUNT(*) as count FROM product_ingredient WHERE IngredientID = ?',
            [id]
        );

        if (products[0].count > 0) {
            return res.status(400).json({
                success: false,
                message: 'No se puede eliminar el ingrediente porque está asociado a productos'
            });
        }

        await pool.execute('DELETE FROM ingredient WHERE IngredientID = ?', [id]);

        res.json({
            success: true,
            data: existing[0],
            message: 'Ingrediente eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar ingrediente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};