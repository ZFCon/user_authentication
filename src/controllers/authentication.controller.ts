import { RegisterDto, LoginDto } from '../dto/register.dto';
import { userService } from '../services/user.service';
import { createAccessToken } from '../utils/auth.util';
import { dtoToValidator } from '../utils/validator.util';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

class AuthenticationController {
  async register(req: Request, res: Response) {
    const validator = dtoToValidator(RegisterDto);
    const validatorChecks = await validator(req.body);

    if (!validatorChecks.length) {
      const user = await userService.createUser(req.body);

      res
        .status(httpStatus.CREATED)
        .json({
          user,
          accessToken: createAccessToken(user),
        });
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  };

  async login(req: Request, res: Response) {
    const validator = dtoToValidator(LoginDto);
    const validatorChecks = await validator(req.body);

    if (!validatorChecks.length) {
      userService.login(req.body.email, req.body.password).then(
        accessToken => {
          res.status(httpStatus.OK).json({accessToken})
        }
      ).catch(
        err => {
          res.status(httpStatus.UNAUTHORIZED).json({message: err.message});
        }
      )
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  }
}

export default new AuthenticationController();
