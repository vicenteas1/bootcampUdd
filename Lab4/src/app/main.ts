import express from 'express';
import { Logger } from './config/logger.js';
import ApiRouter from './routes/api.routes.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, 'config', 'swagger.yaml'));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', ApiRouter);

app.listen(port, () => {
  Logger.info(`Servidor corriendo en http://localhost:${port}`);
  Logger.info(`Swagger disponible en http://localhost:${port}/api-docs`);
});
