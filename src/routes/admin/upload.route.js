const express = require("express");
const router = express.Router();
const uploadController = require("../../controllers/admin/upload.controller");
const upload = require('../../config/multer/multer.memory');

router.post(
  '/upload',
  upload.single('media'), 
  uploadController.uploadSingle
);


module.exports = router;


