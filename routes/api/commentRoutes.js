const router = require('express').Router();
const { Comment } = require('../../models');  // Make sure the path is correct

// Route for adding a new comment
router.post('/new', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      userId: req.body.userId,  // Assume you have the user's ID
      postId: req.body.postId  // Assume you have the post's ID
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
