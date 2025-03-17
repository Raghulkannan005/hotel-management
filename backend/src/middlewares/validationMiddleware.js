import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    // Skip validation for OPTIONS requests (CORS preflight)
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}; 