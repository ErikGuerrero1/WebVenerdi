const mysql = require('mysql2/promise');
const config = require('./environment');

// Pool de conexiones
const pool = mysql.createPool(config.DB_CONFIG);

// Función para verificar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection
};