const { text } = require("express");

// Configuración momentanea de WhatsApp
const CONFIG = {
    VERSION: "v22.0",
    PHONE_NUMBER_ID: "646978738490011",
    TOKEN: "EAAQsXy0ozoMBO6zTnyMDF0iOqZAi9t8EHZBAeTIm4HbGyTPkGjQniOxZBqwvLLLjqL1ZCSz3YZBTFW1iSrB8ZCPvSRQ3tStfcsHOZCX7Tvl4XCAAqD1uJ05pMyvErVoB2gembNFfRPUAhMm5bWVbqTSmIOgMYZBNL4md2qI5GcmmPExR0NKHzZCDsjonP40WriApyz9dtT7LLiOZBmHf4OkX2VpldTcHPsnIRhkWcZD"
};

const crearCuerpoMensaje = (telefono, plantilla) => {
    const nombre = "erik";
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
                                    text: "Erik"
                                }
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
        const { telefono, plantilla = "hello_world" } = req.body;
        if (!telefono) {
            return res.status(400).json({
                success: false,
                message: "El número de teléfono es requerido"
            });
        }

        const url = `https://graph.facebook.com/${CONFIG.VERSION}/${CONFIG.PHONE_NUMBER_ID}/messages`;
        const body = crearCuerpoMensaje(telefono, plantilla);

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