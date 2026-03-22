import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/Courses?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        style={{
          padding: "6px 12px",
          fontSize: "13px",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-pill)",
          background: "var(--bg-hover)",
          color: "var(--text-primary)",
          outline: "none",
          width: "180px",
          fontFamily: "inherit",
          transition: "border-color 0.2s, width 0.3s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--purple)";
          e.target.style.width = "220px";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border)";
          e.target.style.width = "180px";
        }}
      />
    </form>
  );
};

export default SearchBar;
