const { pool } = require('../config/database.js');

const procesarCompra = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        // Iniciar transacción para asegurar consistencia de datos
        await connection.beginTransaction();

        const {
            // ID del usuario (opcional si ya está logueado)
            idUser,

            // Datos del usuario/invitado
            nombre,
            phone,
            address,

            // Información de entrega
            isPickup = false,

            // Carrito de productos
            carrito,

            // Precio total
            precioTotal,

            // Status por defecto
            Status = 'Pendiente',

            // Datos para WhatsApp (opcionales)
            plantillaWhatsApp = 'pedido'
        } = req.body;

        // Validaciones básicas
        if (!precioTotal || precioTotal <= 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'El precio total es requerido y debe ser mayor a 0'
            });
        }

        if (!carrito || carrito.length === 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'El carrito debe contener al menos un producto'
            });
        }

        if (!nombre || !phone) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: 'Nombre y teléfono son requeridos'
            });
        }

        let finalUserID = idUser || null;
        let finalGuestContactID = null;
        let contactPhone = phone.trim();
        let contactName = nombre.trim();

        // Paso 1: Manejar información de contacto
        if (!idUser) {
            // Usuario no ha iniciado sesión - crear registro de invitado
            const guestQuery = `INSERT INTO guestordercontact (Name, Email, Phone, Address) VALUES (?, ?, ?, ?)`;

            const [guestResult] = await connection.execute(guestQuery, [
                contactName,
                '', // Email vacío para invitados sin email
                contactPhone,
                address ? address.trim() : ''
            ]);

            finalGuestContactID = guestResult.insertId;
            finalUserID = null;
        } else {
            // Usuario ya inició sesión - verificar que existe
            const userQuery = `SELECT Name, Phone FROM user WHERE UserID = ?`;
            const [userRows] = await connection.execute(userQuery, [idUser]);

            if (userRows.length === 0) {
                await connection.rollback();
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Usar datos del usuario registrado si están disponibles
            if (userRows[0].Phone) contactPhone = userRows[0].Phone;
            if (userRows[0].Name) contactName = userRows[0].Name;
        }

        // Paso 2: Crear la orden principal
        const orderQuery = `
            INSERT INTO \`order\` (UserID, GuestContactID, TotalAmount, Status)
            VALUES (?, ?, ?, ?)
        `;

        const [orderResult] = await connection.execute(orderQuery, [
            finalUserID,
            finalGuestContactID,
            precioTotal,
            Status
        ]);

        const orderID = orderResult.insertId;

        // Paso 3: Crear los items de la orden y preparar nombres para WhatsApp
        const orderItemsCreated = [];
        const nombresProductos = [];

        for (const item of carrito) {
            const { productId, quantity, name, price, size, sizeId, isCustomPizza, customIngredients } = item;

            if (!productId || !quantity || quantity <= 0) {
                await connection.rollback();
                return res.status(400).json({
                    success: false,
                    message: 'Cada producto debe tener productId y quantity válidos'
                });
            }

            // Verificar si es una pizza personalizada
            if (isCustomPizza || productId === 9999) {
                // Para pizzas personalizadas, NO guardar en la base de datos
                // pero sí agregar al array de respuesta y WhatsApp
                orderItemsCreated.push({
                    OrderItemID: null, // No se creó en BD
                    OrderID: orderID,
                    ProductID: productId,
                    Quantity: quantity,
                    ProductName: name,
                    Size: size,
                    UnitPrice: price,
                    SizeID: sizeId,
                    IsCustomPizza: true,
                    CustomIngredients: customIngredients || []
                });

                // Agregar nombre del producto personalizado para WhatsApp
                if (name) {
                    let productDisplayName = size ? `${name} (${size})` : name;

                    // Agregar ingredientes personalizados al nombre para WhatsApp
                    if (customIngredients && customIngredients.length > 0) {
                        const ingredientesTexto = customIngredients.join(', ');
                        productDisplayName += ` - Ingredientes: ${ingredientesTexto}`;
                    }

                    nombresProductos.push(productDisplayName);
                }
            } else {
                // Para productos normales, guardar en la base de datos
                const orderItemQuery = `INSERT INTO orderitem (OrderID, ProductID, Quantity) VALUES (?, ?, ?)`;

                const [orderItemResult] = await connection.execute(orderItemQuery, [
                    orderID,
                    productId,
                    quantity
                ]);

                orderItemsCreated.push({
                    OrderItemID: orderItemResult.insertId,
                    OrderID: orderID,
                    ProductID: productId,
                    Quantity: quantity,
                    ProductName: name,
                    Size: size,
                    UnitPrice: price,
                    SizeID: sizeId,
                    IsCustomPizza: false
                });

                // Agregar nombre del producto normal para WhatsApp
                if (name) {
                    const productDisplayName = size ? `${name} (${size})` : name;
                    nombresProductos.push(productDisplayName);
                }
            }
        }

        // Confirmar la transacción antes de enviar WhatsApp
        await connection.commit();

        // Paso 4: Enviar mensaje de WhatsApp
        let whatsappResponse = null;

        if (contactPhone) {
            try {
                // Preparar datos para WhatsApp según el número de productos
                let plantilla = plantillaWhatsApp;
                if (nombresProductos.length === 1) {
                    plantilla = 'pedidouno';
                } else if (nombresProductos.length === 2) {
                    plantilla = 'pedidodos';
                } else if (nombresProductos.length > 2) {
                    plantilla = 'pedidotres'
                }

                const whatsappData = {
                    telefono: contactPhone.replace(/\D/g, ''), // Limpiar teléfono de caracteres no numéricos
                    plantilla: plantilla,
                    nombre: contactName,
                    productos: nombresProductos,
                    numeroPedido: orderID.toString()
                };

                const CONFIG = {
                    VERSION: "v22.0",
                    PHONE_NUMBER_ID: "646978738490011",
                    TOKEN: "EAAQsXy0ozoMBO989b8xXSTBabSkwBKFuCYkim1ZA3P9cKpZCyjFDZBcXu2kvoQAcZAQBZCoac5jcRcf2AX0dF3YY7H3OCglE42gQqKOVzsI29eoHL8bD92LN8e6uUheWM8rkGCxH3yjqRs6cN8KnLjtvrfQMK5Wqm5ebuVyD4lQNrJOOlVaRvx98RtUZB0ldcrsgZDZD"
                };

                const whatsappBody = crearCuerpoMensajeWhatsApp(
                    whatsappData.telefono,
                    whatsappData.plantilla,
                    whatsappData.nombre,
                    whatsappData.productos,
                    whatsappData.numeroPedido
                );

                const whatsappUrl = `https://graph.facebook.com/${CONFIG.VERSION}/${CONFIG.PHONE_NUMBER_ID}/messages`;

                const whatsappFetchResponse = await fetch(whatsappUrl, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${CONFIG.TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(whatsappBody)
                });

                whatsappResponse = await whatsappFetchResponse.json();

            } catch (whatsappError) {
                console.error('Error enviando WhatsApp (no crítico):', whatsappError);
                // No fallar la compra si WhatsApp falla
            }
        }

        // Respuesta exitosa
        return res.status(200).json({
            success: true,
            message: 'Compra procesada exitosamente',
            data: {
                order: {
                    OrderID: orderID,
                    UserID: finalUserID,
                    GuestContactID: finalGuestContactID,
                    TotalAmount: precioTotal,
                    Status: Status,
                    OrderDate: new Date()
                },
                orderItems: orderItemsCreated,
                whatsappSent: whatsappResponse ? true : false,
                whatsappResponse: whatsappResponse,
                customerInfo: {
                    name: contactName,
                    phone: contactPhone,
                    address: address || null,
                    isPickup: isPickup
                }
            }
        });

    } catch (error) {
        // Rollback en caso de error
        await connection.rollback();
        console.error('Error procesando compra:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno al procesar la compra',
            error: error.message
        });
    } finally {
        // Liberar la conexión
        connection.release();
    }
};

// Función auxiliar para crear el cuerpo del mensaje de WhatsApp (sin cambios)
const crearCuerpoMensajeWhatsApp = (telefono, plantilla, nombre = "", productos = [], numeroPedido = "") => {
    switch (plantilla) {
        case "hello_world":
            return {
                messaging_product: "whatsapp",
                to: `52${telefono}`,
                type: "template",
                template: {
                    name: plantilla,
                    language: { code: "en_US" }
                }
            };

        case "pedido":
            return {
                messaging_product: "whatsapp",
                to: `52${telefono}`,
                type: "template",
                template: {
                    name: "pedido",
                    language: { code: "en_US" },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: "text",
                                    text: nombre
                                }
                            ]
                        }
                    ]
                }
            };

        case "pedidouno":
            return {
                messaging_product: "whatsapp",
                to: `52${telefono}`,
                type: "template",
                template: {
                    name: "pedidouno",
                    language: { code: "en_US" },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: "text", text: nombre },
                                { type: "text", text: productos[0] || "" },
                                { type: "text", text: numeroPedido }
                            ]
                        }
                    ]
                }
            };

        case "pedidodos":
            return {
                messaging_product: "whatsapp",
                to: `52${telefono}`,
                type: "template",
                template: {
                    name: "pedidodos",
                    language: { code: "en_US" },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: "text", text: nombre },
                                { type: "text", text: productos[0] || "" },
                                { type: "text", text: productos[1] || "" },
                                { type: "text", text: numeroPedido }
                            ]
                        }
                    ]
                }
            };

        case "pedidotres":
            return {
                messaging_product: "whatsapp",
                to: `52${telefono}`,
                type: "template",
                template: {
                    name: "pedidotres",
                    language: { code: "en_US" },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: "text", text: nombre },
                                { type: "text", text: productos[0] || "" },
                                { type: "text", text: productos[1] || "" },
                                { type: "text", text: numeroPedido }
                            ]
                        }
                    ]
                }
            };

        default:
            throw new Error(`Plantilla ${plantilla} no encontrada`);
    }
};

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
    procesarCompra
};