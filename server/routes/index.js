const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/friend', require('./friend'));
router.use('/post', require('./post'));
router.use('/usercomment', require('./usercomment'));
router.use('/like', require('./like'));
router.use('/message', require('./message'));
router.use('./event', require('./event'))

module.exports = router;