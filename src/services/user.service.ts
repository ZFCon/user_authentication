import { RegisterDto } from '../dto/register.dto';
import { User } from '../models/user';
import {createAccessToken} from '../utils/auth.util';

class UserSerivce {
  async createUser(data: RegisterDto) {
    const user = await User.create(data);
    await user.setPassword(data.password);

    return user;
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    if (user) {
      if (await user.checkPassword(password)) {
        return createAccessToken(user);
      }
    }

    throw new Error("email or password isn't correct.");
  }
}

export const userService = new UserSerivce();
