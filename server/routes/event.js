const router = require('express').Router();
const controller = require('../controllers/eventCtrl');

router.get('/getEvents', controller.getEvents);

module.exports = router;