import e from 'express';
import express from 'express';
import { getLogs } from '../services/logs.service';

const router = express.Router();

router.post('/getLogs', getLogs);

    
export default router;