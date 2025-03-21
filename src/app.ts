import express from 'express';
import userRoutes from './routes/user.routes';
import policeStation from './routes/policeStation.routes';
import caseRoutes from './routes/caseRoute.routes';
import seizedItem from './routes/seizedItem.routes';
import login from './routes/auth.routes';
import court from './routes/court.routes';
import logs from './routes/logs.routes';
import cors from 'cors';
import path from 'path';
import prisma from './config/prisma';
// import { authMiddleware } from './middlewares/auth.middleware';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');  // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'templates')); 

// app.use(authMiddleware);
app.use('/api/test', (req, res) => {
    res.send('Hello World');
});

app.use(async (req, res, next) => {
  // const userIdHeader = req.headers['Authorization']; // Change to lowercase
  // console.log('userIdHeader', userIdHeader);
  // console.log('req.headers', req.headers);
  
  // req.userId = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader;
  // console.log('req.userId');
  
  // console.log('req', req.body);
  
  // if (req.userId) {
  //   try {
  //     // store request data in logs table
  //    let tt = await prisma.logs.create({
  //       data: {
  //         entityType: 'CaseReg',
  //         entityId: 'case_id',
  //         actionType: 'Created',
  //         changedData: req.body,
  //         userId: req.userId,
  //       },
  //     });
  //     console.log('tt', tt);
      
  //   } catch (error) {
  //     console.error('Error logging request:', error);
  //   }
  // }
  
  next();
});


app.use('/api', userRoutes);
app.use('/api', policeStation);
app.use('/api', caseRoutes);
app.use('/api', seizedItem);
app.use('/api', login);
app.use('/api', court);
app.use('/api', logs);

export default app;