const router = require('express').Router();
const controller = require('../controllers/eventCtrl');

router.get('/getEvents', controller.getEvents);
router.post('/postEvent', controller.postEvent);
router.delete('/deleteEvent', controller.deleteEvent);

module.exports = router;