const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_REGION
});

const uploadPhoto = async file => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    return url;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadPhoto;
