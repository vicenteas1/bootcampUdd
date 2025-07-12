import { User } from '@models/user.model.js';
import { UserService } from '@interfaces/user.service.interface.js';

export class UserServiceImpl implements UserService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }
}
