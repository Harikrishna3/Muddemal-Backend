import { Response, Request } from "express";
import { createSeizedItem as cSI} from "../services/seizedItems.service";

export const createSeizedItem = async (req: Request, res: Response) => {
    const { case_id, item_category, sub_category, item_description, seized_date, seized_location, seizing_officer, current_status, release_date, released_to, remarks } = req.body;
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
}