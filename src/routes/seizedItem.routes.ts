import e from 'express';
import express from 'express';
import { createSeizedItem } from '../controllers/seizedItems.controller';



const router = express.Router();

router.post('/createSeizedItem', createSeizedItem);

export default router;