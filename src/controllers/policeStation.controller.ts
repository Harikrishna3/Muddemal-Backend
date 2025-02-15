import { Request, Response } from 'express';
import { createPoliceStationService } from '../services/policeStation.service';


export const createPoliceStation = async (req: Request, res: Response) => {
    const { name, region, address, state, district, taluka } = req.body;
    const policeStation = await createPoliceStationService(name, region, address, state, district, taluka);
    res.status(201).json(policeStation);
}