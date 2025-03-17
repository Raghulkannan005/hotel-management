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
const allowedOrigins = [
  "http://localhost:5173", 
  "https://zorp-hotel.vercel.app",
  "https://zorp-hotel-backend.vercel.app"
];

// Apply CORS middleware with simple configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle OPTIONS requests directly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

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

// Test endpoint for CORS
app.get('/test-cors', (req, res) => {
    res.status(200).json({ 
        message: 'CORS is working!',
        origin: req.headers.origin || 'No origin header'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Fix for direct routes without /api prefix
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);

app.use(errorMiddleware);

export default app;
