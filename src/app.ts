import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import connectDB from './config/db.config';
import cors from 'cors';

dotenv.config();

const PORT: number = +(process.env.PORT || '5000');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

export default app;
