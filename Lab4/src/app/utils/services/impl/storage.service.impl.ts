import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../../../utils/services/storage.service.js';
import { Booking } from '../../../models/booking.model.js';
import { Logger } from '../../../config/logger.js';

const DATA_PATH = path.resolve('src/app/data');
const BOOKING_DATA = 'bookings.json';
const FULL_PATH = path.join(DATA_PATH, BOOKING_DATA);

export class StorageServiceImpl implements StorageService {
  async readBookings(): Promise<Booking[]> {
    await this.ensureFolderExists();
    await this.ensureFileExists();

    try {
      Logger.info('Leyendo archivo de reservas...');
      const data = await fs.readFile(FULL_PATH, 'utf-8');
      Logger.info('Archivo leído con éxito.');
      return JSON.parse(data);
    } catch (error: any) {
      Logger.error(`Error leyendo archivo: ${error.message}`);
      throw new Error(`No se pudo leer el archivo en ${FULL_PATH}`);
    }
  }

  async saveBooking(data: Booking): Promise<void> {
    Logger.info('Guardando nueva reserva...');
    await this.ensureFolderExists();
    await this.ensureFileExists();

    const bookings = await this.readBookings();
    const updated = [...bookings, data];
    await this.writeFile(updated);
    Logger.info(`Reserva con ID ${data.id} guardada con éxito.`);
  }

  async writeAllBookings(bookings: Booking[]): Promise<void> {
    const jsonData = JSON.stringify(bookings, null, 4);
    await fs.writeFile(FULL_PATH, jsonData, 'utf-8');
  }

  async generateUniqueId(): Promise<string> {
    const bookings = await this.readBookings();
    let id: string;
    do {
      id = uuidv4();
    } while (bookings.some(b => b.id === id));
    return id;
  }

  private async ensureFolderExists(): Promise<void> {
    Logger.info('Verificando directorio de datos...');
    await fs.mkdir(DATA_PATH, { recursive: true });
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(FULL_PATH);
    } catch (error) {
      Logger.warn('Archivo no existe. Creando archivo vacío...');
      await this.writeFile([]);
    }
  }

  private async writeFile(data: Booking[]): Promise<void> {
    Logger.info('Escribiendo archivo...');
    const jsonData = JSON.stringify(data, null, 4);
    await fs.writeFile(FULL_PATH, jsonData, 'utf-8');
  }
}
