import express from 'express';
import { login, signUp } from '../services/auth.service';


const router = express.Router();

router.post('/login',login );
router.post('/signup',signUp );

export default router;