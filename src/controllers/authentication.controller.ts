import { RegisterDto } from '../dto/register.dto';
import { dtoToValidator } from '../utils/validator';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

class AuthenticationController {
  register(req: Request, res: Response) {
    const validator = dtoToValidator(RegisterDto);
    validator(req.body)
      .then(() => {
        res.status(httpStatus.CREATED).json(req.body);
      })
      .catch((errors) => {
        res.status(httpStatus.BAD_REQUEST).json(errors);
      });
  }
}

export default new AuthenticationController();
