import QRCode from 'qrcode';
const path = require('path');
const fs = require('fs');

interface GenerateQRCode {
    (caseId: string): Promise<string | null>;
    Model: string;
}

interface GenerateQRCodeFunction {
    (caseId: string, Model: string): Promise<string | null>;
}

export const generateQRCode: GenerateQRCodeFunction = async (caseId: string, Model: string): Promise<string | null> => {
    try {
        if (Model === 'case') {
            const qrData = `http://localhost:3000/api/getACase/${caseId}`;
            const base64Image = await QRCode.toDataURL(qrData);
            return base64Image;
        } else if (Model === 'seizedItem') {
            const qrData = `http://localhost:3000/api/getSeizedItem/${caseId}`;
            const base64Image = await QRCode.toDataURL(qrData);
            return base64Image;
        }
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        return null;
    }
    return null;
};
