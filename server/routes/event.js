const router = require('express').Router();
const controller = require('../controllers/eventCtrl');

router.get('/getEvents', controller.getEvents);
router.post('/postEvent', controller.postEvent);

module.exports = router;