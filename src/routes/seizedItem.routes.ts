import e from 'express';
import express from 'express';
import { upload } from '../middlewares/googleDriveUpload';
import { createSeizedItem, getAllSeizedItems, addSeizedItems, uploadItemImage, updateSeizedItem, getASeizedItemsFromCase, getSeizedItem } from '../controllers/seizedItems.controller';



const router = express.Router();

router.post('/createSeizedItem', createSeizedItem);
router.post('/addSeizedItems', addSeizedItems);
router.post('/updateSeizedItem', updateSeizedItem);
router.post('/uploadImage', upload.single('image'), uploadItemImage);
router.get('/getAllSeizedItems/:userId', getAllSeizedItems);
router.get('/getASeizedItemsFromCase/:case_id', getASeizedItemsFromCase);
router.get('/getSeizedItem/:item_id', getSeizedItem);

export default router;