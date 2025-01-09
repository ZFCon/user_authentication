import AuthenticationController from '../controllers/authentication.controller';
import { RegisterDto } from '../dto/register.dto';
import { dtoToValidator } from '../utils/validator.util';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('', (req: Request, res: Response): void => {
  const validator = dtoToValidator(RegisterDto);
  validator({ name: 'potato' })
    .then(() => {
      res.json({ message: "it's okay bruduh" });
    })
    .catch((errors) => {
      res.json(errors);
    });
});

router.post('/auth/register', AuthenticationController.register);
router.post('/auth/login', AuthenticationController.login);

export default router;
