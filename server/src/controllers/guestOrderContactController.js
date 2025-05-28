const { pool } = require('../config/database.js');

// Params: None
// Body: None
const getAllGuestOrderContacts = async (req, res) => {
    try {
        const query = `SELECT * FROM guestordercontact`;
        const [rows] = await pool.execute(query);

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error getting all guestOrderContacts:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los datos de invitados'
        });
    }
}

// Params: guestContactId
// Body: None
const getGuestOrderContactById = async (req, res) => {
    try {
        const { guestContactId } = req.params;

        const query = `SELECT * FROM user WHERE UserID = ?`;
        const [rows] = await pool.execute(query, [guestContactId]);
        const guestOrderContact = rows[0] || null;

        if (!guestOrderContact) {
            return res.status(404).json({
                success: false,
                message: 'Datos de invitado no encontrados'
            });
        }

        return res.status(200).json({
            success: true,
            data: guestOrderContact
        });
    } catch (error) {
        console.error('Error getting guestOrderContact by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener datos de invitado por ID'
        });
    }
}

// Params: None
// Body: Name, Email, Phone, Address
const createGuestOrderContact = async (req, res) => {
    try {
        const nuevoInvitado = {
            Name: req.body.Name.trim(),
            Email: req.body.Email.trim(),
            Phone: req.body.Phone.trim(),
            Address: req.body.Address.trim(),
        };

        const query = `INSERT INTO guestordercontact SET ?`;
        const resp = pool.query(query, [nuevoInvitado]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error creating guestOrderContact:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear datos de invitado'
        });
    }
}

module.exports = {
    getAllGuestOrderContacts,
    getGuestOrderContactById,
    createGuestOrderContact,
};