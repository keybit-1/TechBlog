const apiRoutes = require('./api');
const { isAuthenticated } = require('../authMiddleware');  // Import your middleware

const router = require('express').Router();

console.log("Inside main router file");

// Use your isAuthenticated middleware for all routes under /api
router.use('/api', isAuthenticated);

// Use API routes
router.use('/api', apiRoutes);

module.exports = router;


