import { User } from '@models/user.model.js';

export interface UserService {
  getAllUsers(): User[];
}
