const { pool } = require('../config/database.js');
const bcrypt = require('bcrypt');

// Params: None
// Body: None
const getAllUsers = async (req, res) => {
    try {
        const query = `SELECT * FROM user`;
        const [rows] = await pool.execute(query);

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error getting all users:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios'
        });
    }
}

// Params: userId
// Body: None
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const query = `SELECT * FROM user WHERE UserID = ?`;
        const [rows] = await pool.execute(query, [userId]);
        const user = rows[0] || null;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario'
        });
    }
}

// Params: None
// Body: Name, Email, Phone, Address, PasswordHash (password original, el hash se hace en esta función), CreatedAt
const createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.PasswordHash = await bcrypt.hash(req.body.PasswordHash, salt);

        const query = `INSERT INTO user SET ?`;
        const resp = await pool.query(query, [req.body]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear usuario'
        });
    }
}

// Params: userId
// Body: Name, Email, Phone, Address, PasswordHash (aquí sí ya hecho el hash), CreatedAt
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const query = `UPDATE user SET ? WHERE UserID = ?`;
        const resp = await pool.query(query, [req.body, userId]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario'
        });
    }
}

// Params: userId
// Body: None
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const query = `DELETE FROM user WHERE UserID = ?`;
        const resp = await pool.query(query, [userId]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario'
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};