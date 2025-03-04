import express from 'express';
import userRoutes from './routes/user.routes';
import policeStation from './routes/policeStation.routes';
import caseRoutes from './routes/caseRoute.routes';
import seizedItem from './routes/seizedItem.routes';
import login from './routes/auth.routes';
import court from './routes/court.routes';
import cors from 'cors';
import path from 'path';
// import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');  // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'templates')); 
// app.use(authMiddleware);
app.use('/api/test', (req, res) => {
    res.send('Hello World');
});
app.use('/api', userRoutes);
app.use('/api', policeStation);
app.use('/api', caseRoutes);
app.use('/api', seizedItem);
app.use('/api', login);
app.use('/api', court);

export default app;