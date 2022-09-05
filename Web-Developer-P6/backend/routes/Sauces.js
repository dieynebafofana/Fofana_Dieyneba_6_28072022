const express = require('express');
const router = express.Router();

const SauceCtrl = require('../controllers/Sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.get('/', auth,SauceCtrl.AllSauces);
router.get('/:id', auth, SauceCtrl.SauceId);
router.post('/',auth, multer, SauceCtrl.AddSauce);
router.post('/:id/like',auth, SauceCtrl.likeSauce);
router.put('/:id', auth, multer,SauceCtrl.ModifySauce );
router.delete('/:id', auth, SauceCtrl.deleteSauce);

module.exports = router;