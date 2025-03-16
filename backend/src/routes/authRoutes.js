import express from 'express';
import { register, login, changePassword } from '../controllers/authController.js';
import { getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile);
router.post('/change-password', authMiddleware, changePassword);

export default router;