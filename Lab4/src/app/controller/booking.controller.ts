import { Request, Response } from 'express';
import { ApiResponse } from '../models/api-response.model.js';
import { BookingService } from '../services/booking.service.js';
import { Logger } from '../config/logger.js';
import { HelpersService } from '../utils/services/helpers.service.js';

export class ApiBookingController {
  constructor(
    private bookingService: BookingService,
    private helpersService: HelpersService
  ) {}

  // Obtener todas las reservas
  async getAllBookings(req: Request, res: Response) {
    try {
      const response = await this.bookingService.getAllBookings();
      Logger.info(`Metodo [getAllBookings] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'NOK', error);
      Logger.info(`Metodo [getAllBookings] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }

  // Obtener reserva por id
  async getBookingById(req: Request, res: Response) {
    try {
      const response = await this.bookingService.getBookingById(req.params.id);
      Logger.info(`Metodo [getBookingById] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'Error al filtrar', []);
      Logger.info(`Metodo [getBookingById] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }

  // Obtener reservas por hotel, fecha, habitacion, estado, cantidad de huespedes
  async filterBookings(req: Request, res: Response) {
    try {
      if (!this.helpersService.queryParamsExist(req.query)) {
        return await this.getAllBookings(req, res);
      }
      const response = await this.bookingService.filterBookings(req.query);
      Logger.info(`Metodo [filterBookings] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'Error al filtrar', []);
      Logger.info(`Metodo [filterBookings] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }
  
  // Crear nueva reserva
  async createBooking(req: Request, res: Response) {
    try {
      const response = await this.bookingService.createBooking(req.body);
      Logger.info(`Metodo [createBooking] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'NOK', error);
      Logger.info(`Metodo [createBooking] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }

  // Actualizar reserva por id
  async updateBookingById(req: Request, res: Response) {
    try {
      const response = await this.bookingService.updateBookingById(req.params.id, req.body);
      Logger.info(`Metodo [updateBookingById] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'Error al filtrar', []);
      Logger.info(`Metodo [updateBookingById] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }

  // Eliminar reserva por id
  async deleteBookingById(req: Request, res: Response) {
    try {
      const response = await this.bookingService.deleteBookingById(req.params.id);
      Logger.info(`Metodo [deleteBookingById] ejecutado con exito. Data: ${JSON.stringify(response.data)}`);
      res.status(response.code).json(response);
    } catch (error) {
      const response = new ApiResponse(400, 'Error al filtrar', []);
      Logger.info(`Metodo [deleteBookingById] ha fallado. Error: ${JSON.stringify(error)}`);
      res.status(response.code).json(response);
    }
  }
}
