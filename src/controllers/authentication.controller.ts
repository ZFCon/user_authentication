import { RegisterDto } from '../dto/register.dto';
import { userService } from '../services/user.service';
import { dtoToValidator } from '../utils/validator';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

class AuthenticationController {
  async register(req: Request, res: Response) {
    const validator = dtoToValidator(RegisterDto);
    const validatorChecks = await validator(req.body);
    if (!validatorChecks.length) {
      const user = await userService.createUser(req.body);
      await user.setPassword(req.body.password);
      res.status(httpStatus.CREATED).json(user);
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  }
}

export default new AuthenticationController();
