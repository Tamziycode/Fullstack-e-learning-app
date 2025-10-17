//getAllCourses, getCourseById, createCourse
const express = require("express");

const{ getAllCourses, getCourseById, createCourse } = require("../controllers/Coursecontroller");

const router = express.Router();

const {authorizeRole} = require("../middleware/role");
const { protect } = require("../middleware/auth");

router.post("/", protect, authorizeRole("instructor"), createCourse);
router.get("/", protect, getAllCourses);
router.get("/:id", protect, getCourseById);

module.exports = router;