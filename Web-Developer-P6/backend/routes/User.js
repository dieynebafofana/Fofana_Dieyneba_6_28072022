
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.config')

const userCtrl = require('../controllers/User');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/', authentification ,multer, userCtrl.createImage);    

module.exports = router;