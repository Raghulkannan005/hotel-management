import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
    // Skip admin check for OPTIONS requests (CORS preflight)
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }
    next();
};

export default adminMiddleware; 