const { pool } = require("../config/database.js");

const orderController = {
    // Obtener todas las órdenes
    getAllOrders: async (req, res) => {
        try {
            const query = `
        SELECT 
          o.OrderID,
          o.UserID,
          o.GuestContactID,
          o.OrderDate,
          o.TotalAmount,
          o.Status,
          u.Name as UserName,
          u.Email as UserEmail,
          g.Name as GuestName,
          g.Email as GuestEmail,
          g.Phone as GuestPhone
        FROM \`order\` o
        LEFT JOIN user u ON o.UserID = u.UserID
        LEFT JOIN guestordercontact g ON o.GuestContactID = g.GuestContactID
        ORDER BY o.OrderDate DESC
      `;

            const [rows] = await pool.execute(query);
            res.json({
                success: true,
                data: rows
            });
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Obtener una orden por ID
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;

            const query = `
        SELECT 
          o.OrderID,
          o.UserID,
          o.GuestContactID,
          o.OrderDate,
          o.TotalAmount,
          o.Status,
          u.Name as UserName,
          u.Email as UserEmail,
          g.Name as GuestName,
          g.Email as GuestEmail,
          g.Phone as GuestPhone
        FROM \`order\` o
        LEFT JOIN user u ON o.UserID = u.UserID
        LEFT JOIN guestordercontact g ON o.GuestContactID = g.GuestContactID
        WHERE o.OrderID = ?
      `;

            const [rows] = await pool.execute(query, [id]);

            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada'
                });
            }

            res.json({
                success: true,
                data: rows[0]
            });
        } catch (error) {
            console.error('Error al obtener orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Crear una nueva orden
    createOrder: async (req, res) => {
        try {
            const { UserID, GuestContactID, TotalAmount, Status } = req.body;

            // Validación básica
            if (!TotalAmount) {
                return res.status(400).json({
                    success: false,
                    message: 'El monto total es requerido'
                });
            }

            // Verificar que se proporcione UserID o GuestContactID
            if (!UserID && !GuestContactID) {
                return res.status(400).json({
                    success: false,
                    message: 'Se debe proporcionar UserID o GuestContactID'
                });
            }

            const query = `
        INSERT INTO \`order\` (UserID, GuestContactID, TotalAmount, Status)
        VALUES (?, ?, ?, ?)
      `;

            const [result] = await pool.execute(query, [
                UserID || null,
                GuestContactID || null,
                TotalAmount,
                Status || 'Pendiente'
            ]);

            res.status(200).json({
                success: true,
                message: 'Orden creada exitosamente',
                data: {
                    OrderID: result.insertId,
                    UserID: UserID || null,
                    GuestContactID: GuestContactID || null,
                    TotalAmount,
                    Status: Status || 'Pendiente'
                }
            });
        } catch (error) {
            console.error('Error al crear orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Actualizar una orden existente
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const { UserID, GuestContactID, TotalAmount, Status } = req.body;

            // Verificar si la orden existe
            const checkQuery = 'SELECT OrderID FROM `order` WHERE OrderID = ?';
            const [checkRows] = await pool.execute(checkQuery, [id]);

            if (checkRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada'
                });
            }

            const query = `
        UPDATE \`order\` 
        SET UserID = ?, GuestContactID = ?, TotalAmount = ?, Status = ?
        WHERE OrderID = ?
      `;

            await pool.execute(query, [
                UserID || null,
                GuestContactID || null,
                TotalAmount,
                Status,
                id
            ]);

            res.json({
                success: true,
                message: 'Orden actualizada exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Eliminar una orden
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;

            // Verificar si la orden existe
            const checkQuery = 'SELECT OrderID FROM `order` WHERE OrderID = ?';
            const [checkRows] = await pool.execute(checkQuery, [id]);

            if (checkRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada'
                });
            }

            const query = 'DELETE FROM `order` WHERE OrderID = ?';
            await pool.execute(query, [id]);

            res.json({
                success: true,
                message: 'Orden eliminada exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Obtener órdenes por usuario
    getOrdersByUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const query = `
        SELECT 
          o.OrderID,
          o.UserID,
          o.OrderDate,
          o.TotalAmount,
          o.Status,
          u.Name as UserName,
          u.Email as UserEmail
        FROM \`order\` o
        JOIN user u ON o.UserID = u.UserID
        WHERE o.UserID = ?
        ORDER BY o.OrderDate DESC
      `;

            const [rows] = await pool.execute(query, [userId]);

            res.json({
                success: true,
                data: rows
            });
        } catch (error) {
            console.error('Error al obtener órdenes por usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Obtener órdenes por invitado
    getOrdersByGuest: async (req, res) => {
        try {
            const { guestContactId } = req.params;

            const query = `
        SELECT 
          o.OrderID,
          o.GuestContactID,
          o.OrderDate,
          o.TotalAmount,
          o.Status,
          g.Name as GuestName,
          g.Email as GuestEmail,
          g.Phone as GuestPhone
        FROM \`order\` o
        JOIN guestordercontact g ON o.GuestContactID = g.GuestContactID
        WHERE o.GuestContactID = ?
        ORDER BY o.OrderDate DESC
      `;

            const [rows] = await pool.execute(query, [guestContactId]);

            res.json({
                success: true,
                data: rows
            });
        } catch (error) {
            console.error('Error al obtener órdenes por invitado:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    },

    // Actualizar solo el estado de una orden
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { Status } = req.body;

            if (!Status) {
                return res.status(400).json({
                    success: false,
                    message: 'El estado es requerido'
                });
            }

            // Verificar si la orden existe
            const checkQuery = 'SELECT OrderID FROM `order` WHERE OrderID = ?';
            const [checkRows] = await pool.execute(checkQuery, [id]);

            if (checkRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada'
                });
            }

            const query = 'UPDATE `order` SET Status = ? WHERE OrderID = ?';
            await pool.execute(query, [Status, id]);

            res.json({
                success: true,
                message: 'Estado de la orden actualizado exitosamente'
            });
        } catch (error) {
            console.error('Error al actualizar estado de orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
};

module.exports = orderController;