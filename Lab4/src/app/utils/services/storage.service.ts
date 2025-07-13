import { Booking } from '../../models/booking.model.js';

export interface StorageService {
  readBookings(): Promise<Booking[]>;
  saveBooking(data: Booking): Promise<void>;
  generateUniqueId(): Promise<string>;
  writeAllBookings(bookings: Booking[]): Promise<void>;
}
