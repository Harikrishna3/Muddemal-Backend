import { Response, Request } from "express";
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import path from 'path';
import crypto from 'crypto';

const s3 = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || '',
    },
  });
  

  
  
  // Generate a random filename
  const generateFileName = (originalName: string): string => {
    const ext = path.extname(originalName);
    return `${crypto.randomBytes(16).toString("hex")}${ext}`;
  };
  

  export const uploadItemImage = async (req: Request, res: Response) => {
    console.log("Uploading file...", req.file);
    
    try {
        if (!req.file) {
             res.status(400).json({ error: "No file uploaded" });
             return;
        }

        console.log("Uploaded file:", req.file);

        const file = req.file;
        const fileName = generateFileName(file.originalname);

        const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const fileUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${fileName}`;
        
        res.json({ message: "File uploaded successfully", fileUrl });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};
