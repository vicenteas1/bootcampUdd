import { v4 as uuidv4 } from 'uuid';

export class Booking {
  id: string;
  hotel: string;
  fechaInicio: string;
  fechaFin: string;
  tipoHabitacion: string;
  numHuespedes: number;
  estado: string;
  active: boolean;

  constructor(
    hotel: string,
    fechaInicio: string,
    fechaFin: string,
    tipoHabitacion: string,
    numHuespedes: number,
    estado: string,
    id?: string,
    active: boolean = true
  ) {
    this.id = id ?? uuidv4();
    this.hotel = hotel;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.tipoHabitacion = tipoHabitacion;
    this.numHuespedes = numHuespedes;
    this.estado = estado;
    this.active = active;
  }

  toJSON() {
    return {
      id: this.id,
      hotel: this.hotel,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      tipoHabitacion: this.tipoHabitacion,
      numHuespedes: this.numHuespedes,
      estado: this.estado,
      active: this.active
    };
  }
}
