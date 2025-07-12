import { Router } from 'express';
import { UserController } from '@controllers/user.controller.js';

const router = Router();
const controller = new UserController();

router.get('/getAllUsers', controller.getAllUsers.bind(controller));

export default router;
