const router = require('express').Router();
const { User } = require('../../models/user');  // Make sure the path is correct

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
