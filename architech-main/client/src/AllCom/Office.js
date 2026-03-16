import React, { useState, useEffect } from "react";
import img4 from "../bg2.jpg";
import img1 from "../bg1.jpg";
import img2 from "../bg2.jpg";
import img3 from "../bg4.jpg";
const Office = () => {
  const images = [img1, img2, img3,img4];
  const [current, setCurrent] = useState(0);
  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const styles = {
    page: {
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
    },

    heading: {
      textAlign: "center",
      padding: "60px 20px 30px",
      backgroundColor: "#ffffff",
    },

    title: {
      fontSize: "36px",
      fontWeight: "600",
      marginBottom: "10px",
    },

    subtitle: {
      color: "#555",
      fontSize: "16px",
    },

    container: {
      padding: "50px 10%",
    },

    /* Slider */
    slider: {
      position: "relative",
      width: "100%",
      height: "400px",
      marginBottom: "60px",
    },

    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "15px",
    },

    button: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "#fff",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "20px",
      borderRadius: "6px",
    },

    prev: { left: "20px" },
    next: { right: "20px" },

    /* Section */
    sectionBox: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      marginBottom: "50px",
    },

    sectionTitle: {
      fontSize: "24px",
      marginBottom: "15px",
      fontWeight: "600",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },

    card: {
      backgroundColor: "#eff6ff",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    },

    footer: {
      backgroundColor: "#0f172a",
      color: "#fff",
      textAlign: "center",
      padding: "30px",
      marginTop: "60px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Heading */}
      <div style={styles.heading}>
        <h1 style={styles.title}>Office Apartment Design</h1>
        <p style={styles.subtitle}>
          Modern Workspace with Comfort & Productivity
        </p>
      </div>

      <div style={styles.container}>
        {/* Image Slider */}
        <div style={styles.slider}>
          <img src={images[current]} alt="Office" style={styles.image} />
          <button
            style={{ ...styles.button, ...styles.prev }}
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            style={{ ...styles.button, ...styles.next }}
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>

        {/* Project Overview */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Project Overview</h2>
          <p>
            This Office Apartment is designed to create a professional yet
            comfortable work environment. The layout focuses on productivity,
            natural lighting, smart space planning, and modern interiors.
            Premium materials and elegant finishing provide a luxurious and
            motivating workspace for teams and executives.
          </p>
        </div>

        {/* Key Features */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Key Features</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h4>Total Area</h4>
              <p>2200 sq.ft</p>
            </div>
            <div style={styles.card}>
              <h4>Workstations</h4>
              <p>25 Seating Capacity</p>
            </div>
            <div style={styles.card}>
              <h4>Conference Rooms</h4>
              <p>2 Meeting Rooms</p>
            </div>
            <div style={styles.card}>
              <h4>Executive Cabins</h4>
              <p>3 Private Cabins</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Amenities</h2>
          <div style={styles.grid}>
            <div style={styles.card}>High-Speed Internet</div>
            <div style={styles.card}>Central Air Conditioning</div>
            <div style={styles.card}>Modern Pantry Area</div>
            <div style={styles.card}>Reception & Waiting Area</div>
            <div style={styles.card}>24/7 Security</div>
            <div style={styles.card}>Power Backup</div>
          </div>
        </div>

        {/* Why Choose */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Why Choose This Office?</h2>
          <p>
            ✔ Strategic business location<br />
            ✔ Elegant & modern interior design<br />
            ✔ Spacious and flexible layout<br />
            ✔ Comfortable working environment<br />
            ✔ Ideal for startups & corporate teams
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © 2026 Office Apartment Project | Designed for Modern Businesses
      </div>
    </div>
  );
};

export default Office;
