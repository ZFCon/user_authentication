import AuthenticationController from '../controllers/authentication.controller';
import { RegisterDto } from '../dto/register.dto';
import { dtoToValidator } from '../utils/validator.util';
import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get('', passport.authenticate('jwt', {session: false}), (req: Request, res: Response): void => {
  res.json({ message: "it's okay bruduh", user: req.user });
});

router.post('/auth/register', AuthenticationController.register);
router.post('/auth/login', AuthenticationController.login);

export default router;
