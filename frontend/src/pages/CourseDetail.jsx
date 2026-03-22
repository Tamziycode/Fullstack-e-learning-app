import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams(); // Grabs the course ID from the URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollMsg, setEnrollMsg] = useState("");

  // 1. Fetch the single course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // Sending GET request to /courses/:id
        const response = await axios.get(
          `http://localhost:5000/courses/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourse(response.data);
      } catch (err) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // 2. Handle Enrollment
  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      // Hitting the enrollment route from your backend
      await axios.post(
        "http://localhost:5000/enroll",
        { courseId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEnrollMsg("Successfully enrolled in the course!");
    } catch (err) {
      setEnrollMsg(
        err.response?.data?.message ||
          "Enrollment failed. You might already be enrolled."
      );
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading course details...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!course) return <p style={{ textAlign: "center" }}>Course not found.</p>;

  return (
    <div
      className="course-details-container"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>{course.title}</h1>
      <img
        src={course.previewVideoUrl || "https://via.placeholder.com/600"}
        alt="Course"
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Category:</strong> {course.category}
        </p>
        <p>
          <strong>Difficulty:</strong> {course.difficulty}
        </p>
      </div>

      {enrollMsg && (
        <p
          style={{
            color: enrollMsg.includes("failed") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {enrollMsg}
        </p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={handleEnroll}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Enroll Now
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
