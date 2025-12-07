// src/screens/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>The page you're looking for doesn't exist.</p>
      <Link to="/cta-editor" style={styles.link}>
        Go to CTA Editor
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px",
  },
  heading: {
    fontSize: "3rem",
    color: "#ff4d4f",
  },
  text: {
    fontSize: "1.25rem",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  link: {
    fontSize: "1rem",
    color: "#1890ff",
    textDecoration: "underline",
  },
};

export default NotFoundPage;
