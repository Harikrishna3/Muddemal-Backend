import { Request, Response } from 'express';
import  {createUser as US,getUser as gU}from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await US(name, email);
    res.status(201).json(user);
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await gU(Number(id));
    res.status(200).json(user);
};