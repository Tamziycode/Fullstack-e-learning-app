import React from "react";

// Accept the course prop passed from HomePage
const CourseCard = ({ course }) => {
  return (
    <div className="coursecard">
      {/* Fallback image if previewVideoUrl/image is missing */}
      <img
        className="cardImage"
        src={course?.previewVideoUrl || "https://via.placeholder.com/150"}
        alt="Course Preview"
      />

      <p>Title: {course?.title}</p>
      <p>Description: {course?.description}</p>
      <p>Category: {course?.category}</p>
      <p>Difficulty: {course?.difficulty}</p>
      <p>Price: ${course?.price}</p>
      <p>
        {/* Placeholder for actual video tag implementation */}
        Preview vid: {course?.previewVideoUrl}
      </p>
      <button>Enroll</button>
      <button>Details</button>
    </div>
  );
};

export default CourseCard;
