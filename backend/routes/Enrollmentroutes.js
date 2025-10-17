const express = require("express");
const { enrollCourse, getMyCourses } = require("../controllers/Enrollmentcontroller");
const { get } = require("./Authroutes");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, enrollCourse);
router.get("/", protect, getMyCourses);

module.exports = router;
