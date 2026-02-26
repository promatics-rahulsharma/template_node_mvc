const { uploadToS3 } = require("../../utils/upload");


exports.uploadSingle = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const folder = req.body.path || 'uploads';


  const result = await uploadToS3({
    file: req.file,
    folder,
  });

  res.json({
    success: true,
    message: 'File uploaded successfully',
    file: {
      original_name: req.file.originalname,
      size: req.file.size,
      mime_type: req.file.mimetype,
      path: folder,
      filename: result.filename,
    },
  });
};