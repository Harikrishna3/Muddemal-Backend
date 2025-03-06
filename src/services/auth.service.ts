import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createUser } from "./user.service";
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";

const saltRounds: number = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface HashPasswordFunction {
    (password: string): Promise<string>;
}

const generateToken = (user:any) => {
  // console.log("user",user);
  
  return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" } 
  );
};

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          policeStation: {
            select: { id: true, name: true }
          }
        }
      });
  
      if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid credentials" });
          return
      }
      const token = generateToken({ ...user, id: user.id });

      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access
        secure: process.env.NODE_ENV === "development", // Use HTTPS in production
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiry
    });
      
      // const { id, name, role, policeStation } = user;
      res.status(200).json({  token });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const signUp = async (req: Request, res: Response)=> {
    const { name, email, role, password, policeStationId } = req.body;
  
    try {

      if (policeStationId) {
        const policeStationExists = await prisma.policeStation.findUnique({
          where: { id: policeStationId },
        });
  
        if (!policeStationExists) {
           res.status(404).json({ message: "Police Station not found" });
           return;
        }
      }
  

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
         res.status(409).json({ message: "User already exists" });
         return;
      }


  
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password: hashedPassword,
          policeStationId: policeStationId || null,
        },
        include: {
          policeStation: { select: { id: true, name: true } },
        },
      });
      
      const token = generateToken({ ...user });
  
      const { id, policeStation } = user;
       res.status(201).json({ id, name, email, role, policeStation , token });
  
    } catch (error) {
      console.error("Error creating user:", error);
       res.status(400).json({ message: "Error in creating user" });
    }
  };

  export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
             res.status(401).json({ message: "Unauthorized" });
             return;
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                policeStation: {
                    select: { id: true, name: true }
                }
            }
        });

        if (!user) {
             res.status(404).json({ message: "User not found" });
             return;
        }

       res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
       res.status(500).json({ message: "Internal server error" });
       return;
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).json({ message: "Logged out successfully" });
};


const hashPassword: HashPasswordFunction = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};