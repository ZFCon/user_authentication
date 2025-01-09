import { RegisterDto } from '../dto/register.dto';
import { User } from '../models/user';
import {createAccessToken, AccessTokenPayload} from '../utils/auth.util';

class UserSerivce {
  async createUser(data: RegisterDto) {
    const user = await User.create(data);
    await user.setPassword(data.password);

    return user;
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    if (user) {
      if (await user.checkPassword(password)) {
        const payload: AccessTokenPayload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        return createAccessToken(payload);
      }
    }

    throw new Error("email or password isn't correct.");
  }
}

export const userService = new UserSerivce();
