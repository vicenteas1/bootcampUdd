
import { Request } from 'express';
import { body, query } from 'express-validator';
import validateRequest from './validateRequest.js';

export const validateBookingFilters = [
  query('hotel')
    .optional()
    .notEmpty().withMessage('hotel no debe estar vacío')
    .isString().withMessage('hotel debe ser un string'),

  query('tipo_habitacion')
    .optional()
    .notEmpty().withMessage('tipo_habitacion no debe estar vacío')
    .isString().withMessage('tipo_habitacion debe ser un string'),

  query('estado')
    .optional()
    .notEmpty().withMessage('estado no debe estar vacío')
    .isString().withMessage('estado debe ser un string'),

  query('num_huespedes')
    .optional()
    .notEmpty().withMessage('num_huespedes no debe estar vacío')
    .isInt({ min: 1 }).withMessage('num_huespedes debe ser un número entero mayor a 0'),

  query('fecha_inicio')
    .optional()
    .notEmpty().withMessage('fecha_inicio no debe estar vacía')
    .isISO8601().withMessage('fecha_inicio debe ser una fecha válida (YYYY-MM-DD)'),

  query('fecha_fin')
    .optional()
    .notEmpty().withMessage('fecha_fin no debe estar vacía')
    .isISO8601().withMessage('fecha_fin debe ser una fecha válida (YYYY-MM-DD)'),

  query('fecha_inicio').custom((value, { req }) => {
    const r = req as Request;
    if (value && !r.query.fecha_fin) {
      throw new Error('Si se proporciona fecha_inicio, también se debe proporcionar fecha_fin');
    }
    return true;
  }),

  query('fecha_fin').custom((value, { req }) => {
    const r = req as Request;
    if (value && !r.query.fecha_inicio) {
      throw new Error('Si se proporciona fecha_fin, también se debe proporcionar fecha_inicio');
    }
    return true;
  })
];


export const validateCreateParams = [
    body('hotel').isString().notEmpty().withMessage('Hotel es obligatorio'),
    body('fechaInicio').isString().notEmpty().withMessage('Fecha inicio es obligatoria'),
    body('fechaFin').isString().notEmpty().withMessage('Fecha fin es obligatoria'),
    body('tipoHabitacion').isString().notEmpty().withMessage('Tipo de habitación es obligatoria'),
    body('numHuespedes').isInt({ min: 1 }).notEmpty().withMessage('Número de huéspedes es obligatorio mayor a 0'),
    body('estado').isString().notEmpty().withMessage('Estado debe ser booleano'),
    validateRequest
];

export const validateUpdateParams = [
    body('hotel').isString(),
    body('fechaInicio').isString(),
    body('fechaFin').isString(),
    body('tipoHabitacion').isString(),
    body('numHuespedes').isInt({ min: 1 }),
    body('estado').isString(),
    validateRequest
];
