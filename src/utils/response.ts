import { Response } from 'express';

export const successResponse = (res: Response, data: any, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
};

export const errorResponse = (res: Response, message: string, statusCode = 400) => {
    res.status(statusCode).json({ success: false, message });
};