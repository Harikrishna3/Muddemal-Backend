import { Request, Response } from 'express';
import  {createUser as CU,getUser as gU}from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
    const { name, email, role, password,policeStationId } = req.body;
    // const password = 'defaultPassword'; // Add a default password or get it from req.body
    const user = await CU(name, email, password, role, policeStationId);
    res.status(201).json(user);
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await gU(id);
    res.status(200).json(user);
};

// export const createSeizedMobile = async (req: Request, res: Response) => {
//     const { case_id, item_category, sub_category, item_description, seized_date, seized_location, seizing_officer, current_status, release_date, released_to, remarks, mobile } = req.body;
//     const seizedMobile = await cSM({
//         case_id,
//         item_category,
//         sub_category,
//         item_description,
//         seized_date,
//         seized_location,
//         seizing_officer,
//         current_status,
//         release_date,
//         released_to,
//         remarks,
//         mobile,
//     });
//     res.status(201).json(seizedMobile);
// }