const express = require('express');
const sequelize = require('./config/config');  // Make sure the path is correct
const { User, BlogPost, Comment } = require('./models/relationships');  // Import models and relationships
const userRoutes = require('./routes/api/userRoutes');  // Import user routes
const postRoutes = require('./routes/api/postRoutes');  // Import post routes
const commentRoutes = require('./routes/api/commentRoutes');  // Import comment routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the user, post, and comment routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);  // New line for comment routes

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







