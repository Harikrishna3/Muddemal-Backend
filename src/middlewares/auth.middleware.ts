import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
 
    console.log("token",req.headers,"token",req.headers.authorization);
    
    let token = req.headers?.authorization?.split(" ")[1] || "";

  console.log("token",token);
  
    if (!token) {
         res.status(401).json({ message: "Unauthorized access" });
         return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);        
        req.user = decoded;
        next();
    } catch (error) {
         res.status(403).json({ message: "Invalid or expired token" });
         return;
    }
};
