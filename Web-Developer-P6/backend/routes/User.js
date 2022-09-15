const express = require("express");
const auth = require("../middleware/auth");
const passWordValidator = require("../middleware/password-validator");

const multer = require("../middleware/multer.config");
const userCtrl = require("../controllers/User");

const router = express.Router();

router.post("/signup", passWordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

//router.post('/',auth ,multer, userCtrl.createImage);

module.exports = router;
