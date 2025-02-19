import { Request, Response } from 'express';
import { createPoliceStationService, getAllPoliceStationsService } from '../services/policeStation.service';


export const createPoliceStation = async (req: Request, res: Response) => {
    const { name, region, address, state, district, taluka } = req.body;
    try{
        const policeStation = await createPoliceStationService(name, region, address, state, district, taluka);
        res.status(201).json(policeStation);
    }catch{
        res.status(400).json({message: "Error in creating police station"});
    }
}

export const getAllPoliceStations = async (req: Request, res: Response) => {
    try{
        const policeStations = await getAllPoliceStationsService();
        res.status(200).json(policeStations);
    }catch{
        res.status(400).json({message: "Error in fetching police stations"});
    }
}