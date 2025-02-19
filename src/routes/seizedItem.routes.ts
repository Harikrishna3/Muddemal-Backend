import e from 'express';
import express from 'express';
import { upload } from '../middlewares/googleDriveUpload';
import { createSeizedItem, uploadItemImage } from '../controllers/seizedItems.controller';



const router = express.Router();

router.post('/createSeizedItem', createSeizedItem);
router.post('/uploadImage', upload.single('image'), uploadItemImage);

export default router;