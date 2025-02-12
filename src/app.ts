import express from 'express';
import userRoutes from './routes/user.routes';
// import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
// app.use(authMiddleware);

app.use('/api', userRoutes);

export default app;