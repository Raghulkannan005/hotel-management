import express from 'express';
import { listRooms, searchRooms } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', listRooms);
router.get('/search', searchRooms);

export default router;