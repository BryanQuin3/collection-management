const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Middleware para redimensionar la imagen antes de guardarla
const resizeImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const resizedImageBuffer = await sharp(req.file.buffer)
            .resize(32, 32)
            .toBuffer();
        req.file.buffer = resizedImageBuffer;
        next();
    } catch (error) {
        console.error("Error resizing the image:", error);
        return res.status(500).json({ error: "Error resizing the image" });
    }
};

// Middleware para guardar la imagen redimensionada en la carpeta de destino
const saveResizedImage = (req, res, next) => {
    if (!req.file) return next();
    const ext = req.file.originalname.split('.').pop();
    const newFileName = `img-${Date.now()}.${ext}`;
    req.file.path = `./storage/images/${newFileName}`;
    fs.writeFile(req.file.path, req.file.buffer, err => {
        if (err) {
            console.error("Error saving the resized image:", err);
            return res.status(500).json({ error: "Error saving the resized image" });
        }
        next();
    });
};

module.exports = { upload, resizeImage, saveResizedImage };
