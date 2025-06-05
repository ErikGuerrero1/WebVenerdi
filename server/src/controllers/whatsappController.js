const { text } = require("express");

// Configuración momentanea de WhatsApp
const CONFIG = {
    VERSION: "v22.0",
    PHONE_NUMBER_ID: "646978738490011",
    TOKEN: "EAAQsXy0ozoMBO989b8xXSTBabSkwBKFuCYkim1ZA3P9cKpZCyjFDZBcXu2kvoQAcZAQBZCoac5jcRcf2AX0dF3YY7H3OCglE42gQqKOVzsI29eoHL8bD92LN8e6uUheWM8rkGCxH3yjqRs6cN8KnLjtvrfQMK5Wqm5ebuVyD4lQNrJOOlVaRvx98RtUZB0ldcrsgZDZD"
};

const crearCuerpoMensaje = (telefono, plantilla, nombre = "", productos = [], numeroPedido = "") => {
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


        default:
            throw new Error(`Plantilla ${plantilla} no encontrada`);
    }
};

const sendTemplate = async (req, res) => {
    try {
        const { telefono, plantilla = "hello_world", nombre, productos = [], numeroPedido } = req.body;

        if (!telefono) {
            return res.status(400).json({
                success: false,
                message: "El número de teléfono es requerido"
            });
        }

        const url = `https://graph.facebook.com/${CONFIG.VERSION}/${CONFIG.PHONE_NUMBER_ID}/messages`;
        const body = crearCuerpoMensaje(telefono, plantilla, nombre, productos, numeroPedido);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CONFIG.TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            res.json({
                success: true,
                message: "Mensaje enviado correctamente",
                data: data
            });
        } else {
            res.status(response.status).json({
                success: false,
                message: "Error al enviar mensaje",
                error: data
            });
        }

    } catch (error) {
        console.error('Error enviando mensaje WhatsApp:', error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

module.exports = {
    sendTemplate
};