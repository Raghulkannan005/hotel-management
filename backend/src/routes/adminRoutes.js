import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { createRoom, updateRoom, deleteRoom, listRooms } from '../controllers/roomController.js';
import { getAllBookings, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Admin routes for user management
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Admin routes for room management
router.get('/rooms', authMiddleware, adminMiddleware, listRooms);
router.post('/rooms', authMiddleware, adminMiddleware, createRoom);
router.put('/rooms/:id', authMiddleware, adminMiddleware, updateRoom);
router.delete('/rooms/:id', authMiddleware, adminMiddleware, deleteRoom);

// Admin routes for booking management
router.get('/bookings', authMiddleware, adminMiddleware, getAllBookings);
router.put('/bookings/:id', authMiddleware, adminMiddleware, updateBooking);
router.delete('/bookings/:id', authMiddleware, adminMiddleware, deleteBooking);

export default router;