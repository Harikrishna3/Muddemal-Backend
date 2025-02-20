import QRCode from 'qrcode';
const path = require('path');
const fs = require('fs');

interface GenerateQRCode {
    (caseId: string): Promise<string | null>;
}

export const generateQRCode: GenerateQRCode = async (caseId) => {
    try {
        const qrData = `http://localhost:3000/api/getACase/${caseId}`;
        const base64Image = await QRCode.toDataURL(qrData);

        return base64Image;
        // return `/${qrPath}`;
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        return null;
    }
};