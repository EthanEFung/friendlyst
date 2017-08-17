const router = require('express').Router();
const controller = require('../controllers/userCtrl');

router.post('/addUser', controller.addUser);
router.get('/getUser', controller.getUser);
router.get('/getUserFriend', controller.getUserFriend);
router.get('/getUserById', controller.getUserById);
router.get('/getUsersById', controller.getUsersById);
router.get('/getAllUser', controller.getAllUser);
router.put('/changePic', controller.changePic);
router.post('/addOrUpdateProfileImageLink', controller.addOrUpdateProfileImageLink);

module.exports = router;