import express from 'express';
import { createPoliceStation, getPoliceStation } from '../controllers/policeStation.controller';


const router = express.Router();

router.post('/createPoliceStation', createPoliceStation);
router.get('/getPoliceStation/:id', getPoliceStation);

export default router;  