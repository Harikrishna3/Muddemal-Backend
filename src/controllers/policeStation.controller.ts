import { Request, Response } from 'express';
import { createPoliceStationService } from '../services/policeStation.service';


export const createPoliceStation = async (req: Request, res: Response) => {
    const { name, region, address, state, district, taluka } = req.body;
    try{
        const policeStation = await createPoliceStationService(name, region, address, state, district, taluka);
        res.status(201).json(policeStation);
    }catch{
        res.status(400).json({message: "Error in creating police station"});
    }
}