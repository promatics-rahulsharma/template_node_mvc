const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');
const path = require('path');
// const s3 = require('../../config/aws/s3.client');
const s3 = require('../config/aws/s3.client');

exports.uploadToS3 = async ({ file, folder }) => {
  // const fileExt = path.extname(file.originalname);
  //  const filename = `${uuidv4()}${fileExt}`;

  const ext = path.extname(file.originalname);
  const baseName = path
    .basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9-_]/g, '_')  // sanitize

  const filename = `${Date.now()}-${baseName}${ext}`;

  const key = `freestyle/${folder}/${filename}`; //--> folder name added becuase shared s3 for development

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    key,
    filename,
    url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};
