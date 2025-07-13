import { BookingService } from '../../services/booking.service.js';
import { Booking } from '../../models/booking.model.js';
import { StorageService } from '../../utils/services/storage.service.js';
import { ApiResponse } from '../../models/api-response.model.js';
import { ParsedQs } from 'qs';

export class BookingServiceImpl implements BookingService {
  constructor(private storageService: StorageService) { }

  async getAllBookings(): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await this.storageService.readBookings();
      return new ApiResponse<Booking[]>(200, 'OK', response);
    } catch (error: any) {
      const response = new ApiResponse(400, 'NOK', error);
      throw new Error(response.toString())
    }
  }

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    try {
      const bookings = await this.storageService.readBookings();
      const booking = bookings.find(b => b.id === id);
      if (!booking) {
        return new ApiResponse(404, `Reserva con id: [${id}] no encontrada`, null as any);
      }
      return new ApiResponse<Booking>(200, 'OK', booking);
    } catch (error: any) {
      const response = new ApiResponse(400, 'NOK', error);
      throw new Error(response.toString())
    }
  }

  async updateBookingById(id: string, newBooking: Booking): Promise<ApiResponse<Booking>> {
    try {
      const bookings = await this.storageService.readBookings();
      const index = bookings.findIndex(b => b.id === id);

      if (index === -1) {
        return new ApiResponse(404, `Reserva con id [${id}] no encontrada`, null as any);
      }

      const currentBooking = bookings[index];

      const updatedBooking = new Booking(
        newBooking.hotel ?? currentBooking.hotel,
        newBooking.fechaInicio ?? currentBooking.fechaInicio,
        newBooking.fechaFin ?? currentBooking.fechaFin,
        newBooking.tipoHabitacion ?? currentBooking.tipoHabitacion,
        newBooking.numHuespedes ?? currentBooking.numHuespedes,
        newBooking.estado ?? currentBooking.estado,
        id,
        newBooking.active ?? currentBooking.active
      );

      bookings[index] = updatedBooking;

      await this.storageService.writeAllBookings(bookings);

      return new ApiResponse<Booking>(200, 'Reserva actualizada con éxito', updatedBooking);
    } catch (error: any) {
      const response = new ApiResponse(400, 'Error al actualizar la reserva', null as any);
      throw new Error(response.toString());
    }
  }

  async deleteBookingById(id: string): Promise<ApiResponse<Booking>> {
    try {
      const bookings = await this.storageService.readBookings();
      const index = bookings.findIndex(b => b.id === id);

      if (index === -1) {
        return new ApiResponse(404, `Reserva con id [${id}] no encontrada`, null as any);
      }

      const currentBooking = bookings[index];

      currentBooking.active = false;

      bookings[index] = currentBooking;

      await this.storageService.writeAllBookings(bookings);

      return new ApiResponse<Booking>(200, 'Reserva eliminada con éxito', currentBooking);
    } catch (error: any) {
      const response = new ApiResponse(400, 'Error al actualizar la reserva', null as any);
      throw new Error(response.toString());
    }
  }

  async filterBookings(query: ParsedQs): Promise<ApiResponse<Booking[]>> {
    try {
      if (this.validateFilters(query)) {
        return new ApiResponse(400, 'Debe proporcionar al menos un parámetro de filtro.', []);
      }

      const hotel = this.getQueryParam(query.hotel);
      const tipo_habitacion = this.getQueryParam(query.tipo_habitacion);
      const estado = this.getQueryParam(query.estado);
      const num_huespedes = this.getQueryParam(query.num_huespedes);
      const fecha_inicio = this.getQueryParam(query.fecha_inicio);
      const fecha_fin = this.getQueryParam(query.fecha_fin);

      let bookings = await this.storageService.readBookings();

      if (hotel) {
        bookings = bookings.filter(b => b.hotel === hotel);
      }

      if (tipo_habitacion) {
        bookings = bookings.filter(b => b.tipoHabitacion === tipo_habitacion);
      }

      if (estado) {
        bookings = bookings.filter(b => b.estado === estado);
      }

      if (num_huespedes) {
        bookings = bookings.filter(b => b.numHuespedes === parseInt(num_huespedes));
      }

      if (fecha_inicio && fecha_fin) {
        const inicio = new Date(fecha_inicio).getTime();
        const fin = new Date(fecha_fin).getTime();

        bookings = bookings.filter(b => {
          const fecha = new Date(b.fechaInicio).getTime();
          return fecha >= inicio && fecha <= fin;
        });
      }

      return new ApiResponse(200, 'OK', bookings);
    } catch (error: any) {
      return new ApiResponse(500, 'Error al filtrar reservas', []);
    }
  }

  validateFilters(query: ParsedQs): boolean {
    const { hotel, tipo_habitacion, estado, num_huespedes, fecha_inicio, fecha_fin } = query;
    return !hotel && !tipo_habitacion && !estado && !num_huespedes && !fecha_inicio && !fecha_fin;
  }

  getQueryParam(value: string | ParsedQs | (string | ParsedQs)[] | undefined): string | undefined {
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
    return undefined;
  }

  async createBooking(newBooking: Booking): Promise<ApiResponse<Booking>> {
    try {
      const id = await this.storageService.generateUniqueId();
      const booking = new Booking(
        newBooking.hotel,
        newBooking.fechaInicio,
        newBooking.fechaFin,
        newBooking.tipoHabitacion,
        newBooking.numHuespedes,
        newBooking.estado,
        id
      );
      await this.storageService.saveBooking(booking);
      return new ApiResponse<Booking>(200, 'OK', booking);
    } catch (error: any) {
      const response = new ApiResponse(400, 'NOK', error);
      throw new Error(response.toString())
    }
  }
}
