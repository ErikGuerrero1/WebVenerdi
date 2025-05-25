const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/images/products');
    
    // Crear directorio si no existe
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp + nombre original
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filtro para solo permitir imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
});

const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No se subió ninguna imagen'
      });
    }

    const imageUrl = `products/${req.file.filename}`;
    const fullUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/images/${imageUrl}`;

    res.json({
      success: true,
      data: {
        imageUrl,      // Para guardar en BD
        fullUrl        // URL completa para mostrar
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadProductImage
};