import React from "react";
import { useNavigate } from "react-router-dom";

const difficultyColor = (level) => {
  if (!level) return "badge-purple";
  const l = level.toLowerCase();
  if (l === "beginner") return "badge-teal";
  if (l === "intermediate") return "badge-warning";
  return "badge-purple";
};

const CourseCard = ({ course, onEnroll, enrolling }) => {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      {course?.previewVideoUrl ? (
        <img
          className="card-image"
          src={course.previewVideoUrl}
          alt={course.title}
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div className="card-image-placeholder">📚</div>
      )}

      <div className="card-body">
        <p className="card-title">{course?.title}</p>
        <p className="card-description">{course?.description}</p>
        <div className="card-meta">
          {course?.category && (
            <span className="badge badge-purple">{course.category}</span>
          )}
          {course?.difficulty && (
            <span className={`badge ${difficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <span className={`card-price ${course?.price == 0 ? "free" : ""}`}>
          {course?.price == 0 ? "Free" : `$${course?.price}`}
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            Details
          </button>
          {onEnroll && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onEnroll(course.id)}
              disabled={enrolling}
            >
              {enrolling ? "..." : "Enroll"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
