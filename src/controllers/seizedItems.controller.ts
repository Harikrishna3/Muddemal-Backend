import { Response, Request } from "express";
import { createSeizedItem as cSI} from "../services/seizedItems.service";
import { upload, uploadToDrive } from '../middlewares/googleDriveUpload';

interface MulterRequest extends Request {
    files: Express.Multer.File[];
  }

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


export const uploadItemImage = async (req: Request, res: Response): Promise<void>  => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const uploadedFile = await uploadToDrive(file.path, file.filename);
        res.status(200).json({ fileId: uploadedFile.id, link: uploadedFile.webViewLink });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error });
    }
};