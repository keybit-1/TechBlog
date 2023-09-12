// Import the necessary modules
const router = require('express').Router();

// Import your BlogPost model here (Adjust the path as necessary)
let BlogPost;
try {
  BlogPost = require('../../models/blogpost');
} catch (err) {
  console.error("Error importing BlogPost model:", err);
}

// Test GET route to ensure that the routing works
router.get('/test', (req, res) => {
  res.json({ message: 'BlogPost route test is working' });
});

// GET route to fetch all blog posts
router.get('/', async (req, res) => {
  // Log for debugging purposes
  console.log("Inside GET /posts route");

  if (!BlogPost) {
    return res.status(500).json({ error: "BlogPost model is not defined" });
  }

  try {
    // Fetch all blog posts from the database
    const allPosts = await BlogPost.findAll();
    
    // Send back all blog posts' information
    res.status(200).json(allPosts);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in GET /posts route:", err);
    res.status(500).json({ error: 'Could not fetch blog posts' });
  }
});

// POST route for creating a new blog post
router.post('/new', async (req, res) => {
  // Log for debugging purposes
  console.log("Inside /new route");

  if (!BlogPost) {
    return res.status(500).json({ error: "BlogPost model is not defined" });
  }

  try {
    // Create a new blog post in the database
    const newPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId // Assume you have user's ID
    });
    
    // Send back the new blog post's information
    res.status(201).json(newPost);
  } catch (err) {
    // Log the error and send a 500 status code
    console.error("Error in /new route:", err);
    res.status(500).json({ error: 'Could not create new blog post' });
  }
});

// Export the router
module.exports = router;

