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

        const query = `SELECT * FROM orderitem WHERE OrderID = ?`
        const [rows] = await pool.execute(query, [orderId]);

        if (rows.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'Elementos de pedido de orden no encontrados'
            });
        }

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error getting orderItem by orderId:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener elemento de pedido por ID de pedido'
        });
    }
}

// Params: productId
// Body: None
const getOrderItemByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const query = `SELECT * FROM orderitem WHERE ProductID = ?`
        const [rows] = await pool.execute(query, [productId]);

        if (rows.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'Elementos de pedido con producto no encontrados'
            });
        }

        return res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error getting orderItem by productId:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener elemento de pedido por ID de producto'
        });
    }
}

// Params: None
// Body: OrderID, ProductID, Quantity
const createOrderItem = async (req, res) => {
    try {
        const nuevoElementoPedido = {
            OrderID: req.body.OrderID,
            ProductID: req.body.ProductID,
            Quantity: req.body.Quantity,
        };

        const query = `INSERT INTO orderitem SET ?`;
        const resp = pool.query(query, nuevoElementoPedido);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error creating orderItem:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear elemento de pedido'
        });
    }
}

// Params: orderItemId
// Body: OrderID, ProductID, Quantity
const updateOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params;

        const query = `UPDATE orderitem SET ? WHERE OrderItemID = ?`;
        const resp = await pool.query(query, [req.body, orderItemId]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch {
        console.error('Error updating orderItem:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar elemento de pedido'
        });
    }
}

// Params: orderItemId
// Body: None
const deleteOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.params;

        const query = `DELETE FROM orderitem WHERE OrderItemID = ?`;
        const resp = await pool.query(query, [orderItemId]);

        return res.status(200).json({
            success: true,
            data: resp
        });
    } catch (error) {
        console.error('Error deleting orderItem:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar elemento de pedido'
        });
    }
}

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    getOrderItemByOrderId,
    getOrderItemByProductId,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
};