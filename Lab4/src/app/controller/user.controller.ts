import { Request, Response } from 'express';
import { ApiResponse } from '@models/api-response.model.js';
import { userService } from '@services/user.service.js';
import { Logger } from 'config/logger';

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    const response = new ApiResponse(200, 'OK', users);
    Logger.info(response.toString());
    res.status(200).json(response);
  }
}