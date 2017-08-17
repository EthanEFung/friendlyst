const Post = require('../db/index').Post;
const User = require('../db/index').User;
const Friend = require('../db/index').Friend;
const multer = require('multer')
const cloudinary = require('cloudinary')

module.exports = {

  postPost: ((req, res) => {
    User.find({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        Post.create({
            message: req.body.message,
            userId: user.id
          })
          .then(post => res.status(201).send(post))
          .catch(err => res.status(500).send(`Can't post! ${err}`))
      })
      .catch(err => res.status(500).send(`Can't find user! ${err}`))
  }),

  getAllUserPost: ((req, res) => {
    User.find({
        where: {
          email: req.query.email
        }
      })
      .then(user => {
        Post.findAll({
            where: {
              userId: user.dataValues.id
            },
            limit: 10,
            order: [
              ['createdAt', 'ASC']
            ]
          })
          .then(posts => res.status(200).send(posts))
          .catch(err => res.status(500).send(`Can't find user post! ${err}`))
      })
      .catch(err => res.status(500).send(`Can't find user! ${err}`))
  }),

  getAllFriendPost: ((req, res) => {
    User.find({
        where: {
          email: req.query.email
        }
      })
      .then(user => {
        Friend.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
          .then(friends => {
            friends = friends.map(friend => friend.dataValues.buddyId);
            Post.findAll({
                where: {
                  userId: friends
                },
                limit: 10,
                order: [
                  ['createdAt', 'ASC']
                ]
              })
              .then(posts => {
                posts = posts.map(post => post.dataValues);
                res.status(200).send(posts);
              })
              .catch(err => res.status(500).send(`Can't find friend posts! ${err}`))
          })
          .catch(err => res.status(500).send(`Can't find friends! ${err}`))
      })
      .catch(err => res.status(500).send(`Can't find user! ${err}`))
  }),

  deletePost: ((req, res) => {
    Post.destroy({
        where: {
          id: req.body.id
        }
      })
      .then((num) => {
        return num ? res.status(200).send(`Post deleted!`) : res.status(500).send(`Post doesn't exist!`)
      })
      .catch(err => res.status(500).send(`Can't delete post! ${err}`))
  })

};