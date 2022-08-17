
const express = require('express');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer.config');
const userCtrl = require('../controllers/User');

const router = express.Router();

router.post('/', auth, userCtrl.signup);
router.post('/', auth, userCtrl.login);
//router.post('/',auth, multer, userCtrl.createImage);    

module.exports = router;



