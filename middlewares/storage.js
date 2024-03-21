const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storage/images");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Middleware para redimensionar la imagen
const resizeImage = async (req, res, next) => {
    if (!req.file) return next();
    const originalFilePath = req.file.path;
    const newFilePath = originalFilePath.replace(path.extname(originalFilePath), '-resized' + path.extname(originalFilePath));
    try {
        await sharp(originalFilePath)
            .resize(32, 32)
            .toFile(newFilePath);
        // Eliminar el archivo original después de redimensionarlo
        fs.unlinkSync(originalFilePath);
        // Establecer la ruta del archivo redimensionado en el objeto req
        req.file.path = newFilePath;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Error resizing the image" });
    }
};

module.exports = { upload, resizeImage };
