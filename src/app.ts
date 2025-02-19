import express from 'express';
import userRoutes from './routes/user.routes';
import policeStation from './routes/policeStation.routes';
import caseRoutes from './routes/caseRoute.routes';
import seizedItem from './routes/seizedItem.routes';
import login from './routes/auth.routes';

// import { authMiddleware } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
// app.use(authMiddleware);



app.use('/api', userRoutes);
app.use('/api', policeStation);
app.use('/api', caseRoutes);
app.use('/api', seizedItem);
app.use('/api', login);

export default app;