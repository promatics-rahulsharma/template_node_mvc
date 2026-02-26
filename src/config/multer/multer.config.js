const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ⬇️ points to project-root/public/uploads
// const baseUploadPath = path.join(process.cwd(), 'public');
const baseUploadPath = path.join(process.cwd(), 'freestyle');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("🚀 ~ req:body", req.body)
    const folder = req.body.path || 'uploads';
    console.log("🚀 ~ folder:", folder)

    // 🛡 prevent ../ traversal
    const safeFolder = folder.replace(/(\.\.(\/|\\))/g, '');

    const fullPath = path.join(baseUploadPath, safeFolder);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    const unique =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
