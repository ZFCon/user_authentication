import router from './routes/index';
import { JWTStrategy } from './strategies/jwt.strategy';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

passport.use('jwt', JWTStrategy);

app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(httpStatus.BAD_REQUEST).json({ message: 'Server Error' });
});

export default app;
