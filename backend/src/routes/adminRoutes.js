import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import { getAllBookings, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes for user management
router.get('/users', authMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

// Admin routes for room management
router.post('/rooms', authMiddleware, createRoom);
router.put('/rooms/:id', authMiddleware, updateRoom);
router.delete('/rooms/:id', authMiddleware, deleteRoom);

// Admin routes for booking management
router.get('/bookings', authMiddleware, getAllBookings);
router.put('/bookings/:id', authMiddleware, updateBooking);
router.delete('/bookings/:id', authMiddleware, deleteBooking);

export default router;