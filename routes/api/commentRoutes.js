// Import the necessary modules
const router = require('express').Router();
const { ensureAuthenticated } = require('../../config/auth'); // Import ensureAuthenticated middleware

// Import your Comment model here (Adjust the path as necessary)
let Comment;
try {
  Comment = require('../../models/comment');
} catch (err) {
  console.error("Error importing Comment model:", err);
}

// Test GET route to ensure that the routing works
router.get('/test', (req, res) => {
  res.json({ message: 'Comment route test is working' });
});

// GET route to fetch all comments
router.get('/', async (req, res) => {
  // Log for debugging purposes
  console.log("Inside GET /comments route");

  if (!Comment) {
    return res.status(500).json({ error: "Comment model is not defined" });
  }

  try {
    // Fetch all comments from the database
    const allComments = await Comment.findAll();
    
    // Send back all comments' information
    res.status(200).json(allComments);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in GET /comments route:", err);
    res.status(500).json({ error: 'Could not fetch comments' });
  }
});

// POST route for adding a new comment
router.post('/new', ensureAuthenticated, async (req, res) => {
  // Log for debugging purposes
  console.log("Inside /new comment route");

  if (!Comment) {
    return res.status(500).json({ error: "Comment model is not defined" });
  }

  try {
    // Create a new comment in the database
    const newComment = await Comment.create({
      commentText: req.body.commentText,
      userId: req.body.userId,
      postId: req.body.postId
    });
    
    // Send back the new comment's information
    res.status(201).json(newComment);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in /new comment route:", err);
    res.status(500).json({ error: 'Could not add new comment' });
  }
});

// Export the router
module.exports = router;



