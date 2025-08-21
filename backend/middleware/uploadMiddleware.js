const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if (file.fieldname === 'foto') {
      folder = 'uploads/fotos/';
    } else if (file.fieldname === 'certificado') {
      folder = 'uploads/certificados/';
    }
    
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.basename(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB por arquivo
}).fields([
  { name: 'foto', maxCount: 1 },
  { name: 'certificado', maxCount: 1 }
]);

module.exports = upload;