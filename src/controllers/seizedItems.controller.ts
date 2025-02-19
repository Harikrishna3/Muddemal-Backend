import { Response, Request } from "express";
import { createSeizedItem as cSI} from "../services/seizedItems.service";

export const createSeizedItem = async (req: Request, res: Response) => {
    const { case_id, item_category, sub_category, item_description, seized_date, seized_location, seizing_officer, current_status, release_date, released_to, remarks } = req.body;
    try{
    const seizedMobile = await cSI({
        case_id,
        item_category,
        sub_category,
        item_description,
        seized_date,
        seized_location,
        seizing_officer,
        current_status,
        release_date,
        released_to,
        remarks,
    });
    res.status(201).json(seizedMobile);
}catch{
    res.status(400).json({message: "Error in creating seized item"});
}
}