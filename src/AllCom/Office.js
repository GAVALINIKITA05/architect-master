import React, { useState, useEffect } from "react";
import img4 from "../bg2.jpg";
import img1 from "../bg1.jpg";
import img2 from "../bg2.jpg";
import img3 from "../bg4.jpg";

const Office = () => {
  const images = [img1, img2, img3, img4];
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
      fontFamily: "Open Sans",
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

    // Footer Styles
    footer: {
      backgroundColor: "#e9ebec",
      color: "#1e1c1c",
      padding: "60px 10% 30px",
      marginTop: "60px",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "40px",
      marginBottom: "40px",
    },

    footerLogo: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#151414",
    },

    footerLink: {
      display: "block",
      color: "rgba(19, 18, 18, 0.7)",
      textDecoration: "none",
      marginBottom: "12px",
      transition: "color 0.3s ease",
      cursor: "pointer",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(26, 25, 25, 0.6)",
      fontSize: "14px",
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
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(17, 16, 16, 0.7)", lineHeight: "1.7" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#100f0f", marginBottom: "24px" }}>Quick Links</h4>
            <a href="/" style={styles.footerLink}>Home</a>
            <a href="/project" style={styles.footerLink}>Projects</a>
            <a href="/services" style={styles.footerLink}>Services</a>
            <a href="/contact" style={styles.footerLink}>Contact</a>
          </div>
          <div>
            <h4 style={{ color: "#151414", marginBottom: "24px" }}>Project Info</h4>
            <a href="/1bhk" style={styles.footerLink}>1BHK Apartment</a>
            <a href="/luxury" style={styles.footerLink}>Luxury Apartment</a>
            <a href="/office" style={styles.footerLink}>Office Space</a>
            <a href="/beach" style={styles.footerLink}>Beach Apartment</a>
          </div>
          <div>
            <h4 style={{ color: "#1c1c1c", marginBottom: "24px" }}>Contact</h4>
            <p style={{ color: "rgba(22, 21, 21, 0.7)", marginBottom: "12px" }}>
              Pune, Maharashtra
            </p>
            <p style={{ color: "rgba(28, 26, 26, 0.7)", marginBottom: "12px" }}>
              +91 98765 43210
            </p>
            <p style={{ color: "rgba(24, 23, 23, 0.7)" }}>
              projects@arctitech.com
            </p>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} Office Apartment Project | Designed for Modern Businesses
        </div>
      </footer>
    </div>
  );
};

export default Office;