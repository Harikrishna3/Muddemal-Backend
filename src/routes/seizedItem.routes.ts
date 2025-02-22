import e from 'express';
import express from 'express';
import { upload } from '../middlewares/googleDriveUpload';
import { createSeizedItem, getAllSeizedItems, addSeizedItems, uploadItemImage, updateSeizedItem } from '../controllers/seizedItems.controller';



const router = express.Router();

router.post('/createSeizedItem', createSeizedItem);
router.post('/addSeizedItems', addSeizedItems);
router.post('/updateSeizedItem', updateSeizedItem);
router.get('/getAllSeizedItems/:userId', getAllSeizedItems);
router.post('/uploadImage', upload.single('image'), uploadItemImage);

export default router;