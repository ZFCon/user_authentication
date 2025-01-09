import { userService } from '../services/user.service';
import {
  IsEmail,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'EmailExists', async: true })
export class EmailExists implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return userService.getUserByEmail(text).then((user) => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `User exists with this email ${args.value}`;
  }
}

export class RegisterDto {
  @IsString()
  name: string;

  @Validate(EmailExists)
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(6)
  password: string;
}

export class RefreshDto {
  @IsString()
  refreshToken: string;
}
