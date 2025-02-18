import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createUser } from "./user.service";

export const login = async(req:Request, res:Response) =>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    });
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: "User not found"});
    }
}

export const signUp = async (req: Request, res: Response) => {
    const { name, email, role, password, policeStationId } = req.body;
    const user = await createUser(name, email, password, role, policeStationId);
    res.status(201).json(user);
}