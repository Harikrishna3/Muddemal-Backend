import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});


export const upload = multer({ storage });

// Google Drive setup
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../config/credentials.json'),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

// Upload to Google Drive
export const uploadToDrive = async (filePath: string, fileName: string) => {
    const fileMetadata = { name: fileName };
    const media = { mimeType: 'image/jpeg', body: fs.createReadStream(filePath) };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
    });

    fs.unlinkSync(filePath); // Delete local file after upload
    return response.data;
};
