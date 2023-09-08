const express = require('express');
const sequelize = require('./config/config');  // Make sure the path is correct
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Optional: Test the DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error connecting to the database: ', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



