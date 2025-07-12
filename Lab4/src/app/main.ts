import express from 'express';
import { Logger } from './config/logger.js';
import userRouter from './routes/user.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(port, () => {
  Logger.info(`Servidor corriendo en http://localhost:${port}`);
});