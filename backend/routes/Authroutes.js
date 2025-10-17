const express = require("express");
const { signup } = require("../controllers/Authcontroller");
const { signin } = require("../controllers/Authcontroller");
const { validateSignup, validateSignin} = require("../middleware/validate");

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);
module.exports = router;
