const errorMiddleware = (err, req, res, next) => {
    // Log the error for debugging (but not in production response)
    console.error('Error:', err);
    
    // Default error status and message
    const status = err.statusCode || 500;
    
    // Customize error messages based on environment
    const isProd = process.env.NODE_ENV === 'production';
    
    // In production, don't send stack traces and internal error details
    const message = isProd && status === 500 
        ? 'Internal server error' 
        : err.message || 'Something went wrong';
    
    // Return sanitized error response
    res.status(status).json({
        success: false,
        message,
        // Only include error details in development
        ...(isProd ? {} : { stack: err.stack })
    });
};

export default errorMiddleware;