import express from 'express';
import { createCase, getAllCases, getCase, getCaseStatusCount, updateCase } from '../controllers/case.controller';

const router = express.Router();

router.post('/createCase', createCase);
router.post('/updateCase',updateCase);
router.get('/getCaseStatusCount',getCaseStatusCount)
router.get('/getACase/:id',getCase)
router.get('/getCases',getAllCases)

export default router;