const express = require('express');
const path = require('path');
const cors = require('cors');  // <--- importa cors
const routes = require('./routes/index.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

// Configura CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Rutas
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'Hola desde Express',
        status: 'Server running',
        timestamp: new Date().toISOString()
    });
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
