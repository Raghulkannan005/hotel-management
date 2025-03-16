import express from 'express';
import { listRooms, searchRooms, getFeaturedRooms } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', listRooms);
router.get('/search', searchRooms);
router.get('/featured', getFeaturedRooms);

export default router;