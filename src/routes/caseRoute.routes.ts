import express from 'express';
import { createCase, getAllCases, getCase, getCaseStatusCount } from '../controllers/case.controller';

const router = express.Router();

router.post('/createCase', createCase);
router.get('/getCaseStatusCount',getCaseStatusCount)
router.get('/getACase/:id',getCase)
router.get('/getCases',getAllCases)

export default router;