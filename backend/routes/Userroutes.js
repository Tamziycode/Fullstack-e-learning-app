const express = require("express");

const{ updateUserProfile, getUserProfile } = require("../controllers/Usercontroller");

const router = express.Router();
const {protect} = require("../middleware/auth")

router.post("/", protect, updateUserProfile);
router.get("/:id",protect, getUserProfile);

module.exports = router;