const User = require('./user');
const BlogPost = require('./blogpost');
const Comment = require('./comment');

// A User can have many BlogPosts
User.hasMany(BlogPost, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// A BlogPost belongs to a User
BlogPost.belongsTo(User, {
  foreignKey: 'userId'
});

// A Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: 'userId'
});

// A Comment belongs to a BlogPost
Comment.belongsTo(BlogPost, {
  foreignKey: 'postId'
});

// A BlogPost can have many Comments
BlogPost.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, Comment };
