const { pool } = require('../config/database.js');

// Params: None
// Body: None
const getAllOrderItems = async (req, res) => {
    try {
        const query = `SELECT * FROM orderitem`;
        const [rows] = await pool.query(query);

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error getting all orderItems:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener elementos de órdenes'
        });
    }
}

// Params: orderItemId
// Body: None
const getOrderItemById = async (req, res) => {
    try {
        const { orderItemId } = req.params;

        const query = `SELECT * FROM orderitem WHERE OrderItemID = ?`;
        const [rows] = await pool.execute(query, [orderItemId]);
        const guestOrderContact = rows[0] || null;

        if (!guestOrderContact) {
            return res.status(404).json({
                success: false,
                message: 'Elemento de pedido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: guestOrderContact
        });
    } catch (error) {
        console.error('Error getting orderItem by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener elemento de pedido por ID'
        });
    }
}

// Params: orderId
// Body: None
const getOrderItemByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const query = `SELECT`
    } catch (error) {
        console.error('Error getting orderItem by orderId:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener elemento de pedido por ID de pedido'
        });
    }
}

module.exports = {
    getAllOrderItems,
    getOrderItemById,
};