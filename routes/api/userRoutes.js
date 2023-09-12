// Import the necessary modules
const router = require('express').Router();

// Import your User model here (Adjust the path as necessary)
let User;
try {
  User = require('../../models/user');
} catch (err) {
  console.error("Error importing User model:", err);
}

// Test GET route to ensure that the routing works
router.get('/test', (req, res) => {
  res.json({ message: 'User route test is working' });
});

// GET route to fetch all users
router.get('/', async (req, res) => {
  // Log for debugging purposes
  console.log("Inside GET / route");

  if (!User) {
    return res.status(500).json({ error: "User model is not defined" });
  }

  try {
    // Fetch all users from the database
    const allUsers = await User.findAll();
    
    // Send back all users' information
    res.status(200).json(allUsers);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in GET / route:", err);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

// POST route for registering a new user
router.post('/register', async (req, res) => {
  // Log for debugging purposes
  console.log("Inside /register route");

  if (!User) {
    return res.status(500).json({ error: "User model is not defined" });
  }

  try {
    // Create a new user in the database
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    
    // Send back the new user's information
    res.status(201).json(newUser);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in /register route:", err);
    res.status(500).json({ error: 'Could not register user' });
  }
});

// Export the router
module.exports = router;






