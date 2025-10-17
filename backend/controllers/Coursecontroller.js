//controls the courses ie adding courses for instructor and getting all courses

// Example: Course Controller
const pool = require ("../db.js");

// Create course (instructor only)
const createCourse = async (req, res) => {
  try {
    const { title, description, price, category, difficulty, videourl, previewvideourl } = req.body;
    const instructorId = req.user?.id; // safe check

    console.log("User:", req.user);

    const [result] = await pool.query(
      "INSERT INTO courses (title, description, category, previewVideoUrl, videourl, price, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, category, previewvideourl, videourl, price, difficulty]
    );

    res.status(201).json({ message: "Course created", id: result.insertId });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await pool.query (
      "SELECT * FROM courses"
    )
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single course
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const [course] = await pool.query (
      "SELECT * FROM courses WHERE id = ? ",
      [id]
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse };