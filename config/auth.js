// config/auth.js

// Middleware function to check if a user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, continue to the next middleware
    }
    // User is not authenticated, redirect or respond with an error message
    res.status(401).json({ error: 'Not authenticated' });
  }
  
  module.exports = {
    ensureAuthenticated,
  };
  