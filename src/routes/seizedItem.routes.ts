import e from 'express';
import express from 'express';
// import { upload } from '../middlewares/googleDriveUpload';
import { createSeizedItem, getAllSeizedItems, addSeizedItems, updateSeizedItem, getASeizedItemsFromCase, getSeizedItem } from '../controllers/seizedItems.controller';
import multer from 'multer';


// const formData = new FormData();
// files.forEach((file) => formData.append("files", file));

const upload = multer({
    storage: multer.memoryStorage(),
  }).single("image");

const router = express.Router();

router.post('/createSeizedItem', createSeizedItem);
router.post('/addSeizedItems', addSeizedItems);
router.post('/updateSeizedItem', updateSeizedItem);
// router.post("/uploadImage", upload, uploadItemImage);

router.get('/getAllSeizedItems/:userId', getAllSeizedItems);
router.get('/getASeizedItemsFromCase/:case_id', getASeizedItemsFromCase);
router.get('/getSeizedItem/:item_id', getSeizedItem);

export default router;