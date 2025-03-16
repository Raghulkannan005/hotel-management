import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { sanitizeRequestBody } from './middlewares/sanitizationMiddleware.js';

const app = express();
dotenv.config();

// Configure CORS for both development and production
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://zorp-hotel.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sanitizeRequestBody);

// Set up routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
})

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware);

export default app;
