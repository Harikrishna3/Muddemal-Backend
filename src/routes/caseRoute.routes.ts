import express from 'express';
import { createCase } from '../controllers/case.controller';

const router = express.Router();

router.post('/createCase', createCase);
export default router;