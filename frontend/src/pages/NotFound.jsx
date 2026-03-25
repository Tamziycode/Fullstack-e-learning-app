import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--purple-dim) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: "120px",
          fontWeight: "800",
          background: "var(--gradient-text)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: "1",
          marginBottom: "0.5rem",
          position: "relative",
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "0.75rem",
          position: "relative",
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          maxWidth: "360px",
          lineHeight: "1.7",
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div style={{ display: "flex", gap: "1rem", position: "relative" }}>
        <button
          className="btn btn-gradient"
          style={{ padding: "11px 24px" }}
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
        <button
          className="btn btn-outline"
          style={{ padding: "11px 24px" }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
