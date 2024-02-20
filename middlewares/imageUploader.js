// Importa el módulo 'fs' para manejar el sistema de archivos
const fs = require('fs');
const path = require('path');

// Ruta donde se guardarán los archivos de imagen
const uploadDirectory = path.join(__dirname, 'uploads');

// Middleware para manejar el archivo cargado
const uploadImage = (req, res, next) => {
    // Verifica si hay un archivo cargado
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = req.files.image;

    // Genera un nombre único para el archivo
    const fileName = `${Date.now()}-${image.name}`;

    // Mueve el archivo al directorio de carga
    image.mv(path.join(uploadDirectory, fileName), (err) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        req.imagePath = fileName; // Guarda la ruta del archivo en la solicitud
        next();
    });
};

module.exports.uploadImage = uploadImage;
