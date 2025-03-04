import { Response, Request } from "express";
import { createSeizedItem as cSI, createManySeizedItem as CMSI, getAllSeizedItems as GASI ,getASeizedItemsFromCase as GASIFC, updateSeizedItem as USI, getSeizedItem as GSI, showQRCodeForSeizedItem} from "../services/seizedItems.service";
import { upload, uploadToDrive } from '../middlewares/googleDriveUpload';


interface MulterRequest extends Request {
    files: Express.Multer.File[];
  }

export const createSeizedItem = async (req: Request, res: Response) => {
    const { case_id, item_category, sub_category, item_description, seized_date, seized_location, seizing_officer, current_status, release_date, released_to, remarks, Bhag, depositDate, fromWhomReceived, weight, NoOfItems, itemStateDescription } = req.body;
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
        Bhag,
        depositDate,
        fromWhomReceived,
        weight,
        NoOfItems,
        itemStateDescription
    });
    res.status(201).json(seizedMobile);
}catch{
    res.status(400).json({message: "Error in creating seized item"});
}
}

export const getAllSeizedItems = async (req: Request, res: Response) => {
    const userId = req.params.userId;  
    try {
        const seizedItems = await GASI(userId);
        res.status(200).json(seizedItems);
    } catch {
        res.status(400).json({ message: "Error in fetching seized items" });
    }
}

export const getASeizedItemsFromCase = async (req: Request, res: Response) => {
    try {
        const seizedItems = await GASIFC(req.params.case_id);
        res.status(200).json(seizedItems);
    }
    catch {
        res.status(400).json({ message: "Error in fetching seized items" });
    }
}

export const getSeizedItem = async (req: Request, res: Response) => {
    const { item_id } = req.params;
    try {
        const seizedItem = await GSI(item_id);
        res.status(200).json(seizedItem);
    } catch {
        res.status(400).json({ message: "Error in fetching seized item" });
    }
}

export const showQRCodeForSeizedItemData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const item = await showQRCodeForSeizedItem(id);
        console.log(item,"hello");
        if (item) {
            res.render('itemTemplate', { item: item });
        } else {
            res.status(404).json({ message: "Seized item not found" });
        }
    } catch {
        res.status(400).json({ message: "Error in fetching seized item" });
    }
}

export const addSeizedItems = async (req: Request, res: Response) => {
    const { seize_item_info } = req.body;
    try {
        const seizedItems = await CMSI(seize_item_info);
        res.status(201).json(seizedItems);
    } catch {
        res.status(400).json({ message: "Error in updating seized items" });
    }
}

export const updateSeizedItem = async (req: Request, res: Response) => {
    const { item_id, item_category, sub_category, item_description, seized_date, seized_location, seizing_officer, current_status, release_date, released_to, remarks, Bhag, depositDate, fromWhomReceived, weight, NoOfItems, itemStateDescription } = req.body; 
    try {
        const seizedItem = await USI({
            item_id,
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
            Bhag,
            depositDate,
            fromWhomReceived,
            weight,
            NoOfItems,
            itemStateDescription
        });
        res.status(200).json(seizedItem);
    } catch {
        res.status(400).json({ message: "Error in updating seized item" });
    }
}
