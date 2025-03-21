import express from 'express';
import { getCaseIdCrimeNoCaseNo, getLogs, getLogsByCaseId } from '../controllers/logs.controller';

const router = express.Router();

router.get('/getLogs', getLogs);
router.get('/getCaseIdCrimeNoCaseNo', getCaseIdCrimeNoCaseNo);
router.get('/getLogsByCaseId/:caseId', getLogsByCaseId);


export default router;