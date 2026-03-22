import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ─── Student Dashboard ───────────────────────────────────────
const StudentDashboard = ({ user, token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/enroll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  return (
    <div className="dashboard-grid">
      {/* Profile Card */}
      <div>
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.username?.[0]?.toUpperCase() || "S"}
          </div>
          <h2>{user?.username}</h2>
          <p className="profile-email">{user?.email}</p>
          <span className="profile-role">Student</span>
          <div className="profile-stats">
            <div className="profile-stat">
              <span>Enrolled courses</span>
              <span>{courses.length}</span>
            </div>
            <div className="profile-stat">
              <span>Gender</span>
              <span style={{ textTransform: "capitalize" }}>
                {user?.gender || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div>
        <div className="dashboard-section">
          <h2>My Courses</h2>
          {loading ? (
            <p style={{ color: "var(--text-muted)" }}>Loading...</p>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>You haven't enrolled in any courses yet.</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate("/Courses")}
              >
                Browse Courses
              </button>
            </div>
          ) : (
            courses.map((course) => (
              <div className="enrolled-course-row" key={course.courseId}>
                <div className="course-thumb">📚</div>
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>
                    {course.category} • {course.difficulty}
                  </p>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${Math.floor(Math.random() * 80) + 10}%`,
                      }}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate(`/course/${course.courseId}`)}
                >
                  Continue
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Instructor Dashboard ─────────────────────────────────────
const InstructorDashboard = ({ user, token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    difficulty: "Beginner",
    videourl: "",
    previewvideourl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");
    try {
      await axios.post("http://localhost:5000/courses", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Course created successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        difficulty: "Beginner",
        videourl: "",
        previewvideourl: "",
      });
      const res = await axios.get("http://localhost:5000/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-grid">
      {/* Profile card */}
      <div>
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.username?.[0]?.toUpperCase() || "I"}
          </div>
          <h2>{user?.username}</h2>
          <p className="profile-email">{user?.email}</p>
          <span
            className="profile-role"
            style={{
              background: "var(--teal-light)",
              color: "var(--teal-dark)",
            }}
          >
            Instructor
          </span>
          <div className="profile-stats">
            <div className="profile-stat">
              <span>Total courses</span>
              <span>{courses.length}</span>
            </div>
            <div className="profile-stat">
              <span>Gender</span>
              <span style={{ textTransform: "capitalize" }}>
                {user?.gender || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div>
        {/* Create course form */}
        <div className="dashboard-section">
          <h2>Create a New Course</h2>
          {msg && (
            <p
              className={
                msg.includes("success") ? "success-text" : "error-text"
              }
              style={{ marginBottom: "1rem" }}
            >
              {msg}
            </p>
          )}
          <form className="create-course-form" onSubmit={handleCreate}>
            <div className="form-row">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. React for Beginners"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Web Development"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="What will students learn?"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="0 for free"
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Video URL</label>
              <input
                name="videourl"
                value={formData.videourl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label>Preview Video / Thumbnail URL</label>
              <input
                name="previewvideourl"
                value={formData.previewvideourl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <button
              className="btn btn-teal"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>

        {/* Course list */}
        <div className="dashboard-section">
          <h2>Your Courses</h2>
          {loading ? (
            <p style={{ color: "var(--text-muted)" }}>Loading...</p>
          ) : courses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>You haven't created any courses yet.</p>
            </div>
          ) : (
            courses.map((course) => (
              <div className="instructor-course-row" key={course.id}>
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>
                    {course.category} • {course.difficulty} • ${course.price}
                  </p>
                </div>
                <div className="course-actions">
                  <span className="badge badge-teal">
                    {course.enrollments || 0} students
                  </span>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard (role switcher) ──────────────────────────
const Dashboard = () => {
  const { user, token } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          Welcome back, <span>{user?.username}</span> 👋
        </h1>
        <p>
          {user?.role === "instructor"
            ? "Manage your courses and track your students."
            : "Pick up where you left off."}
        </p>
      </div>

      {user?.role === "instructor" ? (
        <InstructorDashboard user={user} token={token} />
      ) : (
        <StudentDashboard user={user} token={token} />
      )}
    </div>
  );
};

export default Dashboard;
