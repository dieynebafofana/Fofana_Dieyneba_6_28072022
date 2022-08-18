const express = require('express');
const router = express.Router();

const SauceCtrl = require('../controllers/Sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.get('/', auth, SauceCtrl.AllSauces);
//router.get
router.post('/', auth, multer, SauceCtrl.AddSauce);
//router.post()
//router.put()
//router.delete()

module.exports = router;