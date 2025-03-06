import express from 'express';
import { getUserProfile, login, signUp } from '../services/auth.service';
import { authenticateUser } from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/login',login );
router.post('/signup',signUp );
router.get("/me", authenticateUser, getUserProfile);

export default router;