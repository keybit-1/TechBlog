console.log("Server.js is starting...");

// Import modules and routes
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./config/config');  // Make sure the path is correct
const { User, BlogPost, Comment } = require('./models/relationships');  // Import models and relationships
const mainRoutes = require('./routes');  // Import main routes from ./routes/index.js

console.log("Required modules imported.");

// Environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

console.log("Middleware set up.");

// Use the main routes
app.use(mainRoutes);  // No need to add '/api' prefix as it's already in routes/index.js

console.log("API routes set up.");

// Optional: Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error connecting to the database: ', err));

// Sync database and start the server
sequelize.sync({ force: false })  // Change force to 'true' only if you want to reset your database
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });













