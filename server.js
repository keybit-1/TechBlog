const express = require('express');
const sequelize = require('./config/config');  // Make sure the path is correct
const { User, BlogPost, Comment } = require('./models/relationships');  // Import models and relationships
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Optional: Test the DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error connecting to the database: ', err));

// Sync database and then start the server
sequelize.sync({ force: false })  // Change force to 'true' only if you want to reset your database
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });




