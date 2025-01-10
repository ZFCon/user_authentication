import { RegisterDto, LoginDto, RefreshDto } from '../dto/auth.dto';
import { userService } from '../services/user.service';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../utils/auth.utils';
import { dtoToValidator } from '../utils/validator.utils';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

class AuthenticationController {
  async register(req: Request, res: Response) {
    const validator = dtoToValidator(RegisterDto);
    const validatorChecks = await validator(req.body);

    if (!validatorChecks.length) {
      const user = await userService.createUser(req.body);

      res.status(httpStatus.CREATED).json({
        user,
        accessToken: createAccessToken(user),
        refreshToken: createRefreshToken(user),
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  }

  async login(req: Request, res: Response) {
    const validator = dtoToValidator(LoginDto);
    const validatorChecks = await validator(req.body);

    if (!validatorChecks.length) {
      userService
        .login(req.body.email, req.body.password)
        .then((tokens) => {
          res.status(httpStatus.OK).json(tokens);
        })
        .catch((err) => {
          res.status(httpStatus.UNAUTHORIZED).json({ message: err.message });
        });
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  }

  async refresh(req: Request, res: Response) {
    const validator = dtoToValidator(RefreshDto);
    const validatorChecks = await validator(req.body);

    if (!validatorChecks.length) {
      try {
        const user = await verifyRefreshToken(req.body.refreshToken);
        const accessToken = createAccessToken(user);
        res.status(httpStatus.OK).json({ accessToken });
      } catch (err) {
        console.error(err);
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'something went wrong!' });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json(validatorChecks);
    }
  }
}

export default new AuthenticationController();
