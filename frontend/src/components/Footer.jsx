import React from "react";
import twitter from "../assets/socialmedia/twitter.png";
import facebook from "../assets/socialmedia/facebook.png";
import instagram from "../assets/socialmedia/instagram.png";
import whatsapp from "../assets/socialmedia/whatsapp.png";
import youtube from "../assets/socialmedia/youtube.png";

const Footer = () => {
  const socials = [
    { src: twitter, alt: "Twitter" },
    { src: facebook, alt: "Facebook" },
    { src: instagram, alt: "Instagram" },
    { src: whatsapp, alt: "WhatsApp" },
    { src: youtube, alt: "YouTube" },
  ];

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        © 2025{" "}
        <span style={{ color: "var(--purple)", fontWeight: "700" }}>
          Learnova
        </span>
        . All rights reserved.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {socials.map(({ src, alt }) => (
          <img
            key={alt}
            src={src}
            alt={alt}
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
              opacity: 0.6,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
