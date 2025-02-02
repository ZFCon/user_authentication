import AuthenticationController from '../controllers/authentication.controller';
import { RegisterDto } from '../dto/auth.dto';
import { dtoToValidator } from '../utils/validator.utils';
import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response): void => {
    res.json({ message: "it's okay bruduh", user: req.user });
  },
);

router.post('/auth/register', AuthenticationController.register);
router.post('/auth/login', AuthenticationController.login);
router.post('/auth/refresh', AuthenticationController.refresh);

export default router;
