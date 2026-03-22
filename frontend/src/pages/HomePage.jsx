import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import LoadingSkeleton from "../components/LoadingSkeleton"; // Optional, since you have it

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // You have a protect middleware on GET /courses, so you must send the token
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses. Please make sure you are logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to Tamziy</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="homepage">
        {loading ? (
          // Render your skeleton or a simple loading text while fetching
          <LoadingSkeleton />
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>No courses available right now.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
