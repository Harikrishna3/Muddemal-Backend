import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createUser } from "./user.service";
const bcrypt = require('bcrypt');
interface HashPasswordFunction {
    (password: string): Promise<string>;
}

const saltRounds: number = 10;
export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
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
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid credentials" });
          return
      }
  
      // Send response with user details (excluding password)
      
      const { id, name, role, policeStation } = user;
      res.status(200).json({ id, name, email, role, policeStation });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  export const signUp = async (req: Request, res: Response)=> {
    const { name, email, role, password, policeStationId } = req.body;
  
    try {
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
          policeStationId,
        },
        include: {
          policeStation: { select: { id: true, name: true } },
        },
      });
  
      const { id, policeStation } = user;
       res.status(201).json({ id, name, email, role, policeStation });
  
    } catch (error) {
      console.error("Error creating user:", error);
       res.status(400).json({ message: "Error in creating user" });
    }
  };

const hashPassword: HashPasswordFunction = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};