import express from 'express';
import { createPoliceStation } from '../controllers/policeStation.controller';


const router = express.Router();

router.post('/createPoliceStation', createPoliceStation);

export default router;  