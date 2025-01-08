import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { RegisterDto } from '../dto/register.dto';
import { dtoToValidator } from '../utils/validator';

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

export default router;
