// authMiddleware.js

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {  // Assuming you're using Passport.js
      return next();
    }
    
    // If the user is not authenticated, redirect to login or send an error
    return res.status(401).json({ message: 'You are not authenticated' });
  }
  
  module.exports = {
    isAuthenticated
  };
  