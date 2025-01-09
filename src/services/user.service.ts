import { RegisterDto } from '../dto/register.dto';
import { User } from '../models/user';

class UserSerivce {
  async createUser(data: RegisterDto) {
    return await User.create(data);
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }
}

export const userService = new UserSerivce();
