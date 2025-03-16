export const sanitizeRequestBody = (req, res, next) => {
  if (req.body) {
    const sanitized = {};
    
    // Recursively sanitize all string values
    const sanitizeObject = (obj) => {
      const result = {};
      
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        
        if (typeof value === 'string') {
          // Basic sanitization - remove HTML tags
          result[key] = value.replace(/<[^>]*>?/gm, '');
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Recursively sanitize nested objects
          result[key] = sanitizeObject(value);
        } else if (Array.isArray(value)) {
          // Sanitize arrays
          result[key] = value.map(item => 
            typeof item === 'string' ? item.replace(/<[^>]*>?/gm, '') : 
            (item && typeof item === 'object') ? sanitizeObject(item) : item
          );
        } else {
          // Keep other values as is
          result[key] = value;
        }
      });
      
      return result;
    };
    
    req.body = sanitizeObject(req.body);
  }
  
  next();
}; 