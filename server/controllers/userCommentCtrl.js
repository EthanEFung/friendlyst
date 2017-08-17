const User = require('../db/index').User;
const UserComment = require('../db/index').UserComment;
const Post = require('../db/index').Post;

module.exports = {

  getAllCommentForPost: ((req, res) => {
    UserComment.findAll({
      where: {postId: req.query.postId}
    })
      .then(comments => res.status(200).send(comments))
      .catch(err => res.status(500).send(`Error finding comments! ${err}`))
  }),

  deleteComment: ((req, res) => {
    UserComment.destroy({
      where: {
        id: req.body.id,
        userId: req.body.userId
      }
    })
      .then((num) => {
        return num ? res.status(200).send(`User comment deleted!`) : res.status(500).send(`User comment doesn't exist!`)
      })
      .catch(err => res.status(500).send(`Can't delete user comment! ${err}`))
  }),

  // postComment: ((req, res) => {
  //   UserComment.create({
  //       userComment: req.body.comment,
  //       userId: req.body.id,
  //       postId: req.body.postId
  //     })
  //     .then(comment => res.status(201).send(comment))
  //     .catch(err => res.status(500).send(`Error creating comment! ${err}`))
  // })
  postComment: ((req, res) => {
    User.find({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      UserComment.create({
        userComment: req.body.message,
        postId: req.body.postId,
        userId: user.id,
      })
      .then(comment => res.status(201).send(comment))
      .catch(err => res.status(500).send(`Can't comment! ${err}`))
    })
    .catch(err => res.status(500).send(`Can't find user! ${err}`))
  }),
  getAllSubComments: (req, res) => {
    UserComment.findAll({
      where: {parentId: req.query.parentId}
    })
      .then(comments => res.status(200).send(comments))
      .catch(err => res.status(500).send(`Error finding comments! ${err}`))
  },
  postSubComment: (req,res) => {
    User.find({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      UserComment.create({
        userComment: req.body.message,
        parentId: req.body.parentId,
        userId: user.id,
      })
      .then(comment => res.status(201).send(comment))
      .catch(err => res.status(500).send(`Can't comment! ${err}`))
    })
    .catch(err => res.status(500).send(`Can't find user! ${err}`))
  }

};