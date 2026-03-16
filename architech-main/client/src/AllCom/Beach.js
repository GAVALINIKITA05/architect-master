import React, { useState, useEffect } from "react";
import img1 from "../bg1.jpg";
import img2 from "../bg2.jpg";
import img3 from "../bg4.jpg";

const Beach = () => {
  const images = [img1, img2, img3];
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
      backgroundColor: "#f0f9ff",
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
      backgroundColor: "#e0f2fe",
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
        <h1 style={styles.title}>Beach Apartment Design</h1>
        <p style={styles.subtitle}>
          Coastal Living with Serenity & Style
        </p>
      </div>

      <div style={styles.container}>
        {/* Image Slider */}
        <div style={styles.slider}>
          <img src={images[current]} alt="Beach Apartment" style={styles.image} />
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
            This beach apartment is designed to embrace coastal beauty and
            relaxation. Featuring large glass windows, open balconies,
            breathable interiors, and soft natural tones, this apartment
            creates a peaceful seaside retreat with modern comfort.
          </p>
        </div>

        {/* Key Features */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Key Features</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h4>Total Area</h4>
              <p>2000 sq.ft</p>
            </div>
            <div style={styles.card}>
              <h4>Bedrooms</h4>
              <p>2 Sea-View Bedrooms</p>
            </div>
            <div style={styles.card}>
              <h4>Bathrooms</h4>
              <p>2 Modern Bathrooms</p>
            </div>
            <div style={styles.card}>
              <h4>Terrace</h4>
              <p>Private Ocean Terrace</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Amenities</h2>
          <div style={styles.grid}>
            <div style={styles.card}>Infinity View Balcony</div>
            <div style={styles.card}>Modular Kitchen</div>
            <div style={styles.card}>Swimming Pool Access</div>
            <div style={styles.card}>24/7 Security</div>
            <div style={styles.card}>Private Parking</div>
            <div style={styles.card}>Power Backup</div>
          </div>
        </div>

        {/* Why Choose */}
        <div style={styles.sectionBox}>
          <h2 style={styles.sectionTitle}>Why Choose This Beach Apartment?</h2>
          <p>
            ✔ Stunning ocean views<br />
            ✔ Calm & relaxing environment<br />
            ✔ Perfect vacation home<br />
            ✔ Luxury coastal interiors<br />
            ✔ High rental & investment value
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © 2026 Beach Apartment Project | Coastal Luxury Living
      </div>
    </div>
  );
};

export default Beach;
