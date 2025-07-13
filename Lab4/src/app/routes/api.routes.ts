import { Router } from 'express';
import { ApiBookingController } from '../controller/booking.controller.js';
import { BookingServiceImpl } from '../services/impl/booking.service.impl.js';
import { StorageServiceImpl } from '../utils/services/impl/storage.service.impl.js';
import validateRequest from '../middleware/validateRequest.js';
import { validateBookingFilters, validateCreateParams, validateUpdateParams } from '../middleware/validateBooking.js';
import { HelpersServiceImpl } from '../utils/services/impl/helpers.service.impl.js';

const router = Router();

const storageService = new StorageServiceImpl();
const bookingService = new BookingServiceImpl(storageService);
const helpersService = new HelpersServiceImpl();
const controller = new ApiBookingController(bookingService, helpersService);

router.get('/reservas', validateBookingFilters, validateRequest, controller.filterBookings.bind(controller));
router.post('/reservas', validateCreateParams, controller.createBooking.bind(controller));
router.get('/reservas/:id', controller.getBookingById.bind(controller));
router.put('/reservas/:id', validateUpdateParams, controller.updateBookingById.bind(controller));
router.delete('/reservas/:id', controller.deleteBookingById.bind(controller));

export default router;
