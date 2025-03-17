import cors from 'cors';

// Configure CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173", 
    "https://zorp-hotel.vercel.app",
    "https://zorp-hotel-backend.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Main CORS middleware
export const corsMiddleware = cors(corsOptions);

// Preflight CORS handler
export const preflightHandler = (req, res, next) => {
  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    // Get the origin from the request headers
    const origin = req.headers.origin;
    
    // Check if the origin is in our allowed origins
    if (corsOptions.origin.includes(origin)) {
      // Set CORS headers
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      
      // Respond with 200 OK
      return res.status(200).send();
    }
  }
  
  // Pass to next middleware
  next();
};

export default { corsMiddleware, preflightHandler }; 