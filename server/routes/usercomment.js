const router = require('express').Router();
const controller = require('../controllers/userCommentCtrl');

router.get('/getAllCommentForPost', controller.getAllCommentForPost);
router.post('/postComment', controller.postComment);
router.delete('/deleteComment', controller.deleteComment);
router.get('/getAllSubComments', controller.getAllSubComments)
router.post('/postSubComment', controller.postSubComment)

module.exports = router;