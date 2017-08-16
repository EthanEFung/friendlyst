const Sequelize = require('sequelize');
const db = require('./config');

const User = db.define('user', {
  nickname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profilePicture: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

const Friend = db.define('friend', {});

const Post = db.define('post', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const UserComment = db.define('userComment', {
  userComment: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Like = db.define('like', {
  postId: {type: Sequelize.INTEGER, allowNull: true},
  userId: {type: Sequelize.INTEGER, allowNull: false},
  userCommentId: {type: Sequelize.INTEGER, allowNull: true }
});

const Message = db.define('message', {
  message: {type: Sequelize.TEXT, allowNull: false},
  userId: {type: Sequelize.INTEGER, allowNull: false},
  partnerId: {type: Sequelize.INTEGER, allowNull: false},
  to: {type: Sequelize.STRING, allowNull: false},
  from: {type: Sequelize.STRING, allowNull: false},
});

User.belongsToMany(User, {
  as: 'buddy',
  through: Friend,
  unique: false,
  allowNull: true
});

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(UserComment);
UserComment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(UserComment);
UserComment.belongsTo(Post);

Post.hasMany(Like);
Like.belongsTo(Post);

User.sync();
Friend.sync();
Post.sync();
UserComment.sync();
Like.sync();
Message.sync();

module.exports = {
  User,
  Friend,
  Post,
  UserComment,
  Like,
  Message
};