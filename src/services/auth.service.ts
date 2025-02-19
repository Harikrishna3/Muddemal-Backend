import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createUser } from "./user.service";

export const login = async(req:Request, res:Response) =>{
    const {email, password} = req.body;
    let user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    });
    let policeStation = null;
    if(user && user.policeStationId){
         policeStation = await prisma.policeStation.findUnique({
            where: {
                id: user.policeStationId
            }
        });
    }
    user = user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        policeStation: policeStation
    }as any : null;
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: "User not found"});
    }
}

export const signUp = async (req: Request, res: Response) => {
    const { name, email, role, password, policeStationId } = req.body;
    try{
    const user = await createUser(name, email, password, role, policeStationId);
    res.status(201).json(user);
    }catch{
        res.status(400).json({message: "Error in creating user"});
    }
}