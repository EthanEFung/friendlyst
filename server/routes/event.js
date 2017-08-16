const router = require('express').Router();
const controller = require('../controllers/eventCtrl');

router.get('/getAllFriend', controller.getEvents);

module.exports = router;