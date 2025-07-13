import { Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { ApiResponse } from '../models/api-response.model.js';
import { Logger } from '../config/logger.js';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const formatted = validationResult(req).formatWith((err) => ({
    mensaje: err.msg,
    campo: (err as any).param || (err as any).path || 'desconocido'
  }));

  if (!formatted.isEmpty()) {
    const errores = formatted.array();

    const response = new ApiResponse(400, 'Errores de parámetros', { errores });
    Logger.error(`Validación fallida: ${JSON.stringify(response.data)}`);
    return res.status(response.code).json(response);
  }

  next();
};
export default validateRequest;
