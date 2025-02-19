import express from 'express';
import { addCourtDeatils, getCourtDetails } from '../controllers/court.controller';





const router = express.Router();

router.post('/addCourtDeatils', addCourtDeatils);
router.post('/getCourtDeatils', getCourtDetails);

export default router;  