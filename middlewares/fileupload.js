const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        // Ensure the uploads directory exists
        fs.existsSync(dir) || fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Set the filename to avoid collisions
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage });