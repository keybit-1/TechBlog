// Import API routes from routes/api/index.js
const apiRoutes = require('./api');

const router = require('express').Router();

// Log for debugging
console.log("Inside main router file");

// Use API routes
router.use('/api', apiRoutes);

module.exports = router;

