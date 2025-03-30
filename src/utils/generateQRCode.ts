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
        const baseUrl = 'http://localhost:3000/api';
        const endpoint = Model === 'case' ? 'showQRCode' : 'showQRCodeforSeizeItems';
        const qrData = `${baseUrl}/${endpoint}/${caseId}`;
        return await QRCode.toDataURL(qrData);
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        return null;
    }
};
