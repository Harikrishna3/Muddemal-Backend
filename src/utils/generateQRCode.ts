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
            console.log("Case QR Code Generation");
            const qrData = `http://localhost:3000/api/showQRCode/${caseId}`;
            const base64Image = await QRCode.toDataURL(qrData);
            console.log(base64Image,"this is the base64 image");
            return base64Image;
        } else if (Model === 'seizedItem') {
            console.log("Seized Item QR Code Generation");
            const qrData = `http://localhost:3000/api/showQRCodeforSeizeItems/${caseId}`;
            const base64Image = await QRCode.toDataURL(qrData);
            return base64Image;
        }
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        return null;
    }
    return null;
};
