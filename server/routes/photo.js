const router = require('express').Router();
const controller = require('../controllers/photoCtrl');

router.get('/getAllAlbums', controller.getAllAlbums);

module.exports = router;