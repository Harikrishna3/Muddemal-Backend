// import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs/promises"; // Use promises instead of readFileSync
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const s3 = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || '',
  },
});

// export const uploadItemImage = async (filePath: string) => {
//   console.log("Uploading file...", filePath);

//   try {
//     if (!filePath) {
//       return { error: "No file provided" };
//     }

//     // Read file into buffer
//     const fileBuffer = fs.readFileSync(filePath);

//     // Extract file name and MIME type
//     const fileName = path.basename(filePath);
//     const mimeType = "image/png"; // Change based on file type if needed

//     console.log("Uploading:", fileName, "with type:", mimeType);

//     const params = {
//       Bucket: process.env.REACT_APP_S3_BUCKET!,
//       Key: fileName,
//       Body: fileBuffer,
//       ContentType: mimeType,
//     };

//     await s3.send(new PutObjectCommand(params));

//     const fileUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${fileName}`;

//     return fileUrl;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return { error: "Error uploading file" };
//   }
// };


export const uploadItemImage = async (filePath: string) => {
  console.log("Uploading file...", filePath);

  try {
    if (!filePath) {
      return { error: "No file provided" };
    }

    // Read file asynchronously
    const fileBuffer = await fs.readFile(filePath);

    // Extract file name and MIME type
    const fileName = path.basename(filePath);
    const mimeType = "image/png"; // You can use a library like `mime-types` to get actual MIME

    console.log("Uploading:", fileName, "with type:", mimeType);

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET!,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${fileName}`;

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { error: "Error uploading file" };
  }
};

export const deleteUploadedImage = async (fileUrl: string) => {
  try {
    const fileName = fileUrl.split("/").pop(); // Extract filename from URL

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET!,
      Key: fileName,
    };

    await s3.send(new DeleteObjectCommand(params));
    console.log(`Deleted file: ${fileUrl}`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};