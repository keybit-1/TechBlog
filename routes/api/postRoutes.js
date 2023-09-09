const router = require('express').Router();
const { BlogPost } = require('../../models/blogpost');  // Make sure the path is correct

// Route for creating a new blog post
router.post('/new', async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId // Assume you have user's ID
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
