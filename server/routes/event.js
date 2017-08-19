const router = require('express').Router();
const controller = require('../controllers/eventCtrl');

router.get('/getEvents', controller.getEvents);
router.get('/getEvent', controller.getEvent)
router.post('/postEvent', controller.postEvent);
router.delete('/deleteEvent', controller.deleteEvent);
router.put('/updateEvent', controller.updateEvent);

module.exports = router;