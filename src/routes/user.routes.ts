import express from 'express';
import {  createUser, getUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/createUser', createUser);
router.get('/users/:id', getUser);

export default router;  