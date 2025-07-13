import { HelpersService } from "../helpers.service.js";

export class HelpersServiceImpl implements HelpersService {
    queryParamsExist(query: Record<string, unknown>): boolean {
      const allowedFilters = ['hotel', 'tipo_habitacion', 'estado', 'num_huespedes', 'fecha_inicio', 'fecha_fin'];
      return allowedFilters.some(param => query[param] !== undefined && query[param] !== '');
    }
}
