// Import necessary types from Express
import { Request, Response, NextFunction } from 'express';
import { addCourtDeatils as addCourtDetailsService, getCourtDetails as getCourtDetailsService } from '../services/court.service';

// Define the controller function
export const addCourtDeatils = async (req: Request, res: Response, next: NextFunction) => {
   try {
       // Extract data from the request body
       const {
           order_number,
           court_type,
           court_name,
           courtCaseNumber,
           court_policestation_info,
           court_order_info,
           case_id,
           hearing_date,
           verdict_date,
           verdict_summary,
           judge_name,
           status
       } = req.body;

       // Call the service function with the extracted data
       const court = await addCourtDetailsService({
           order_number,
           court_type,
           court_name,
           courtCaseNumber,
           court_policestation_info,
           court_order_info,
           case_id,
           hearing_date,
           verdict_date,
           verdict_summary,
           judge_name,
           status
       });

       // Send a successful response
       res.status(201).json(court);
   } catch (err) {
       // Pass any errors to the error handling middleware
       next(err);
   }
};

export const getCourtDetails = async (req: Request, res: Response, next: NextFunction) => {
    const [id] = req.params.id;
    try {
        const court = await getCourtDetailsService(id);
        res.status(200).json(court);
    }
    catch (err) {   
        next(err);
    }
}