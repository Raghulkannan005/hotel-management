import express from 'express';
import { bookRoom, getBookingHistory, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, bookRoom);
router.get('/history', authMiddleware, getBookingHistory);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;