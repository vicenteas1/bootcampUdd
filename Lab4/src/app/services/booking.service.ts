import { ApiResponse } from '../models/api-response.model.js';
import { Booking } from '../models/booking.model.js';
import { ParsedQs } from 'qs';

export interface BookingService {
  getAllBookings(): Promise<ApiResponse<Booking[]>>;
  getBookingById(id: string): Promise<ApiResponse<Booking>>;
  filterBookings(query: ParsedQs): Promise<ApiResponse<Booking[]>>;
  createBooking(newBooking: Booking): Promise<ApiResponse<Booking>>;
  updateBookingById(id: string, newBooking: Booking): Promise<ApiResponse<Booking>>;
  deleteBookingById(id: string): Promise<ApiResponse<Booking>>;
}