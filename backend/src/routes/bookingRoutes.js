import express from 'express';
import { bookRoom, getBookingHistory, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', [
    body('room').isMongoId().withMessage('Valid room ID is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required')
        .custom((endDate, { req }) => new Date(endDate) > new Date(req.body.startDate))
        .withMessage('End date must be after start date'),
    validateRequest
], authMiddleware, bookRoom);

router.get('/history', authMiddleware, getBookingHistory);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;