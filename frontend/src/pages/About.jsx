import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "🎯",
    title: "Goal-Oriented Learning",
    description:
      "Every course is structured around real outcomes. You'll know exactly what you can build when you're done.",
    color: "var(--purple)",
    dim: "var(--purple-dim)",
  },
  {
    icon: "⚡",
    title: "Learn at Your Pace",
    description:
      "No deadlines, no pressure. Access your courses anytime and pick up exactly where you left off.",
    color: "var(--teal)",
    dim: "var(--teal-dim)",
  },
  {
    icon: "🧑‍🏫",
    title: "Expert Instructors",
    description:
      "Courses are created by industry professionals who have built real products and know what matters.",
    color: "var(--pink)",
    dim: "var(--pink-dim)",
  },
  {
    icon: "💡",
    title: "Practical Projects",
    description:
      "Every course includes hands-on projects so you're building a portfolio while you learn.",
    color: "var(--amber)",
    dim: "var(--amber-dim)",
  },
  {
    icon: "🌍",
    title: "Learn Anything",
    description:
      "From web development to data science, design to finance — we cover every in-demand skill.",
    color: "var(--green)",
    dim: "var(--green-dim)",
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    description:
      "Your progress and data are always safe. We take privacy seriously so you can focus on learning.",
    color: "var(--teal)",
    dim: "var(--teal-dim)",
  },
];

const stats = [
  { value: "50+", label: "Courses" },
  { value: "200+", label: "Students" },
  { value: "15+", label: "Instructors" },
  { value: "98%", label: "Satisfaction" },
];

const About = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div>
      {/* Hero section */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "5rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,106,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--purple)",
            marginBottom: "1rem",
            position: "relative",
          }}
        >
          About Learnova
        </p>
        <h1
          style={{
            fontSize: "44px",
            fontWeight: "800",
            letterSpacing: "-1px",
            lineHeight: "1.2",
            marginBottom: "1.25rem",
            position: "relative",
            background: "var(--gradient-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Learning that actually
          <br />
          gets you somewhere
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "520px",
            margin: "0 auto 2rem",
            lineHeight: "1.7",
            position: "relative",
          }}
        >
          Learnova was built to make quality education accessible to everyone.
          No fluff, no filler — just focused courses that teach you skills you
          can use immediately.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <button
            className="btn btn-gradient"
            style={{ padding: "12px 28px", fontSize: "15px" }}
            onClick={() => navigate("/Courses")}
          >
            Browse Courses
          </button>
          {!token && (
            <button
              className="btn btn-outline"
              style={{ padding: "12px 28px", fontSize: "15px" }}
              onClick={() => navigate("/Signup")}
            >
              Join for Free
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  background: "var(--gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginTop: "4px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
              marginBottom: "0.75rem",
            }}
          >
            Why choose Learnova?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            Everything you need to go from beginner to confident.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {features.map(({ icon, title, description, color, dim }) => (
            <div
              key={title}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                boxShadow: "var(--glow)",
                transition:
                  "box-shadow 0.25s, border-color 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--glow-hover)";
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--glow)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: dim,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "1rem",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
            marginBottom: "0.75rem",
          }}
        >
          Ready to start learning?
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            marginBottom: "1.75rem",
          }}
        >
          Join hundreds of students already building their future on Learnova.
        </p>
        <button
          className="btn btn-gradient"
          style={{ padding: "13px 32px", fontSize: "15px" }}
          onClick={() => navigate(token ? "/Courses" : "/Signup")}
        >
          {token ? "Browse Courses" : "Get Started Free"}
        </button>
      </div>
    </div>
  );
};

export default About;
