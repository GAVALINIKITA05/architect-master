import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import aboutImage from "../bg3.jpeg";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const tabsRef = useRef(null);

  // Handle scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // AUTO CLOSE MOBILE MENU WHEN SCROLLING
      if (menuOpen) {
        setMenuOpen(false);
      }
      
      // Hide scroll hint after scrolling
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-btn')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Color palette matching Home page
  const colors = {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    secondary: {
      500: '#f59e0b',
      600: '#d97706',
    },
    success: '#10b981',
    error: '#ef4444',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  };

  // Navigation items - same as Home page
  const tabItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "services", label: "Services", path: "/services" },
    { id: "projects", label: "Projects", path: "/project" },
    { id: "appointment", label: "Appointment", path: "/appointment" },
  ];

  const teamMembers = [
    {
      name: "John Architect",
      role: "Founder & Principal Architect",
      bio: "15+ years of experience in luxury residential and commercial projects.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sarah Designer",
      role: "Head of Interior Design",
      bio: "Award-winning interior designer specializing in modern minimalist spaces.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Michael Engineer",
      role: "Sustainable Design Lead",
      bio: "LEED certified professional focused on eco-friendly architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const values = [
    { icon: "💡", title: "Innovation", desc: "Pushing boundaries with creative design solutions." },
    { icon: "🌱", title: "Sustainability", desc: "Committed to environmentally responsible architecture." },
    { icon: "✨", title: "Excellence", desc: "Delivering the highest quality in every project." },
    { icon: "🤝", title: "Integrity", desc: "Building trust through transparency and honesty." }
  ];

  const styles = {
    page: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#1e293b",
      scrollBehavior: "smooth",
      overflowX: "hidden",
      width: "100%",
    },

    /* ---------- HEADER (Same as Home page) ---------- */
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled 
        ? isMobile ? "12px 5%" : "12px 8%"
        : isMobile ? "15px 5%" : "18px 8%",
      background: scrolled 
        ? "rgba(15, 23, 42, 0.95)" 
        : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
      backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
      boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logo: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "800",
      color: "#fff",
      letterSpacing: "1px",
      cursor: "pointer",
      background: "linear-gradient(135deg, #fff 0%, #e2e8f0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "0.3s",
      zIndex: 1001,
    },

    /* ---------- MOBILE MENU BUTTON ---------- */
    menuBtn: {
      display: isMobile ? "flex" : "none",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 1001,
      padding: "10px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px",
    },

    menuBar: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
    },

    menuBar1: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
      transform: menuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
    },

    menuBar2: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
      opacity: menuOpen ? 0 : 1,
    },

    menuBar3: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
      transform: menuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
    },

    /* ---------- NAVIGATION MENU (Same as Home page) ---------- */
    desktopNav: {
      display: isMobile ? "none" : "flex",
      gap: isTablet ? "15px" : "30px",
      alignItems: "center",
    },

    desktopNavLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "600",
      padding: "8px 20px",
      borderRadius: "40px",
      transition: "all 0.3s ease",
      letterSpacing: "0.5px",
    },

    activeDesktopNavLink: {
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
    },

    mobileMenu: {
      position: "fixed",
      top: isMobile ? "70px" : "80px",
      left: 0,
      right: 0,
      background: "rgba(15, 23, 42, 0.98)",
      backdropFilter: "blur(10px)",
      padding: "30px 20px",
      transform: menuOpen ? "translateY(0)" : "translateY(-150%)",
      transition: "transform 0.3s ease",
      zIndex: 999,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },

    mobileNavLink: {
      display: "block",
      color: "#fff",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "500",
      padding: "15px 0",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      transition: "color 0.3s ease",
      textAlign: "center",
    },

    /* ---------- HERO SECTION ---------- */
    heroSection: {
      position: "relative",
      height: isMobile ? "100vh" : "80vh",
      minHeight: isMobile ? "600px" : "700px",
      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.7) 100%), url(${aboutImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
    },

    heroContent: {
      maxWidth: "800px",
      padding: isMobile ? "0 30px" : "0 20px",
      animation: "fadeInUp 1s ease",
      marginTop: isMobile ? "-50px" : "0",
    },

    heroBadge: {
      display: "inline-block",
      padding: isMobile ? "6px 16px" : "8px 20px",
      background: "rgba(56, 189, 248, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: isMobile ? "20px" : "24px",
      color: "#fff",
    },

    heroTitle: {
      fontSize: isMobile ? "clamp(36px, 10vw, 48px)" : "clamp(48px, 8vw, 72px)",
      fontWeight: "800",
      marginBottom: isMobile ? "20px" : "24px",
      lineHeight: "1.2",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    heroSubtitle: {
      fontSize: isMobile ? "16px" : "clamp(18px, 4vw, 20px)",
      opacity: 0.95,
      lineHeight: isMobile ? "1.6" : "1.8",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "600px",
      margin: "0 auto",
    },

    scrollHint: {
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#fff",
      fontSize: "14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      opacity: showScrollHint ? 1 : 0,
      transition: "opacity 0.3s ease",
    },

    scrollArrow: {
      width: "30px",
      height: "50px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderRadius: "25px",
      position: "relative",
    },

    scrollDot: {
      width: "6px",
      height: "10px",
      background: "#fff",
      borderRadius: "3px",
      position: "absolute",
      top: "8px",
      left: "50%",
      transform: "translateX(-50%)",
      animation: "scrollDown 2s infinite",
    },

    /* ---------- ABOUT SECTION ---------- */
    aboutSection: {
      padding: isMobile ? "60px 20px" : "120px 10%",
      backgroundColor: "#ffffff",
    },

    aboutContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "30px" : "60px",
      alignItems: "center",
    },

    aboutImageBox: {
      position: "relative",
      borderRadius: isMobile ? "20px" : "30px",
      overflow: "hidden",
      boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
      maxHeight: isMobile ? "400px" : "none",
    },

    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)",
    },

    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(129,140,248,0.2) 100%)",
    },

    experienceBadge: {
      position: "absolute",
      bottom: isMobile ? "15px" : "30px",
      right: isMobile ? "15px" : "30px",
      background: "white",
      padding: isMobile ? "12px" : "24px",
      borderRadius: isMobile ? "15px" : "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      textAlign: "center",
    },

    experienceNumber: {
      fontSize: isMobile ? "24px" : "36px",
      fontWeight: "800",
      color: "#0284c7",
      lineHeight: "1",
    },

    experienceText: {
      fontSize: isMobile ? "10px" : "14px",
      color: "#475569",
      marginTop: "3px",
    },

    aboutContent: {
      padding: isMobile ? "0" : "20px",
    },

    sectionBadge: {
      display: "inline-block",
      padding: isMobile ? "4px 12px" : "6px 16px",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: "600",
      color: "#0369a1",
      marginBottom: isMobile ? "15px" : "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },

    heading: {
      fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(32px, 5vw, 42px)",
      fontWeight: "700",
      marginBottom: isMobile ? "15px" : "24px",
      lineHeight: "1.3",
      color: "#0f172a",
    },

    headingHighlight: {
      color: "#0284c7",
      borderBottom: isMobile ? "3px solid #38bdf8" : "4px solid #38bdf8",
      paddingBottom: "4px",
    },

    text: {
      fontSize: isMobile ? "15px" : "17px",
      lineHeight: "1.8",
      color: "#475569",
      marginBottom: "20px",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: isMobile ? "10px" : "30px",
      marginTop: "25px",
    },

    statItem: {
      textAlign: "center",
    },

    statNumber: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: "800",
      color: "#0284c7",
      marginBottom: "4px",
    },

    statLabel: {
      fontSize: isMobile ? "11px" : "14px",
      color: "#64748b",
      fontWeight: "500",
    },

    /* ---------- TABS SECTION (Fixed with skyblue background) ---------- */
    tabsSection: {
      padding: isMobile ? "50px 20px" : "80px 10%",
      backgroundColor: "#f8fafc",
    },

    tabsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "8px" : "20px",
      marginBottom: "40px",
      flexWrap: "wrap",
    },

    tab: {
      padding: isMobile ? "12px 24px" : "16px 40px",
      background: "transparent",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      color: "#64748b",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
      whiteSpace: "nowrap",
    },

    activeTab: {
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
    },

    tabContent: {
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center",
      animation: "fadeIn 0.5s ease",
      padding: isMobile ? "0 10px" : "0",
      minHeight: isMobile ? "180px" : "auto",
    },

    tabTitle: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "700",
      marginBottom: isMobile ? "15px" : "20px",
      color: "#0f172a",
    },

    tabText: {
      fontSize: isMobile ? "15px" : "17px",
      lineHeight: "1.8",
      color: "#475569",
    },

    /* ---------- MISSION VISION SECTION ---------- */
    missionVisionSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      backgroundColor: "#ffffff",
    },

    missionVisionGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: isMobile ? "20px" : "40px",
    },

    missionCard: {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      padding: isMobile ? "30px 20px" : "48px 32px",
      borderRadius: isMobile ? "20px" : "30px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.02)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      textAlign: "center",
    },

    missionIcon: {
      fontSize: isMobile ? "40px" : "48px",
      marginBottom: "20px",
      display: "inline-block",
      padding: isMobile ? "12px" : "16px",
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    },

    missionHeading: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#0f172a",
    },

    missionText: {
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: "1.8",
      color: "#475569",
    },

    /* ---------- TEAM SECTION ---------- */
    teamSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      backgroundColor: "#f8fafc",
    },

    teamGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
      gap: isMobile ? "25px" : "40px",
      marginTop: "40px",
    },

    teamCard: {
      background: "white",
      borderRadius: isMobile ? "20px" : "30px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
      transition: "all 0.4s ease",
    },

    teamImage: {
      width: "100%",
      height: isMobile ? "300px" : "320px",
      objectFit: "cover",
      transition: "transform 0.6s ease",
    },

    teamInfo: {
      padding: isMobile ? "20px" : "28px",
      textAlign: "center",
    },

    teamName: {
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "5px",
    },

    teamRole: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#0284c7",
      fontWeight: "600",
      marginBottom: "12px",
    },

    teamBio: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#64748b",
      lineHeight: "1.7",
    },

    /* ---------- VALUES SECTION ---------- */
    valuesSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      background: "linear-gradient(135deg, #a6a7a7 0%, #adaeaf 100%)",
      color: "#fff",
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "20px" : "40px",
      marginTop: "40px",
    },

    valueCard: {
      textAlign: "center",
      padding: isMobile ? "30px 20px" : "40px 24px",
      background: "rgba(174, 98, 98, 0.77)",
      backdropFilter: "blur(10px)",
      borderRadius: isMobile ? "20px" : "30px",
      border: "1px solid rgba(255,255,255,0.05)",
      transition: "0.4s",
    },

    valueIcon: {
      fontSize: isMobile ? "36px" : "40px",
      marginBottom: "20px",
    },

    valueTitle: {
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#fff",
    },

    valueDesc: {
      fontSize: isMobile ? "13px" : "15px",
      color: "rgba(255,255,255,0.8)",
      lineHeight: "1.7",
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: isMobile ? "50px 20px" : "80px 10%",
      background: "linear-gradient(135deg, #5b5f61 0%, #717272 100%)",
      textAlign: "center",
      color: "#fff",
    },

    ctaTitle: {
      fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 5vw, 40px)",
      fontWeight: "700",
      marginBottom: "15px",
      lineHeight: "1.3",
    },

    ctaBtn: {
      padding: isMobile ? "14px 32px" : "16px 48px",
      background: "#fff",
      color: "#0284c7",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      marginTop: "20px",
      width: isMobile ? "100%" : "auto",
      maxWidth: isMobile ? "280px" : "none",
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#0f172a",
      color: "#fff",
      padding: isMobile ? "40px 20px 20px" : "60px 10% 30px",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "30px" : "60px",
      marginBottom: "30px",
      textAlign: isMobile ? "center" : "left",
    },

    footerLogo: {
      fontSize: isMobile ? "26px" : "28px",
      fontWeight: "800",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    footerLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      display: "block",
      marginBottom: "10px",
      transition: "0.3s",
      fontSize: isMobile ? "14px" : "16px",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "20px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      fontSize: isMobile ? "12px" : "14px",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER - Same as Home page */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          ARCTITECH
        </div>
        
        {/* Desktop Navigation */}
        <nav style={styles.desktopNav}>
          {tabItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                ...styles.desktopNavLink,
                ...(location.pathname === item.path ? styles.activeDesktopNavLink : {})
              }}
              onMouseEnter={(e) => {
                if (!isMobile && location.pathname !== item.path) {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                  e.target.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && location.pathname !== item.path) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "rgba(255,255,255,0.7)";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="menu-btn"
          style={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={menuOpen ? styles.menuBar1 : styles.menuBar}></div>
          <div style={menuOpen ? styles.menuBar2 : styles.menuBar}></div>
          <div style={menuOpen ? styles.menuBar3 : styles.menuBar}></div>
        </button>
      </header>

      {/* Mobile Menu */}
      <div className="mobile-menu" style={styles.mobileMenu}>
        {tabItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            style={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>About Us</span>
          <h1 style={styles.heroTitle}>
            Crafting <span style={styles.heroTitleHighlight}>Spaces</span>
            <br />
            That Inspire
          </h1>
          <p style={styles.heroSubtitle}>
            A team of passionate architects dedicated to creating timeless,
            sustainable, and innovative designs.
          </p>
        </div>
        
        {/* Scroll Hint */}
        {showScrollHint && (
          <div style={styles.scrollHint}>
            <div style={styles.scrollArrow}>
              <div style={styles.scrollDot}></div>
            </div>
            <span>Scroll</span>
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutImageBox}>
            <img
              src={aboutImage}
              alt="Architecture Building"
              style={styles.image}
            />
            <div style={styles.imageOverlay}></div>
            <div style={styles.experienceBadge}>
              <div style={styles.experienceNumber}>15+</div>
              <div style={styles.experienceText}>Years</div>
            </div>
          </div>

          <div style={styles.aboutContent}>
            <span style={styles.sectionBadge}>Who We Are</span>
            <h2 style={styles.heading}>
              We Design <span style={styles.headingHighlight}>Future-Ready</span> Architecture
            </h2>
            <p style={styles.text}>
              Arctitech is a modern architectural design company focused on
              innovation, sustainability, and timeless aesthetics. We create 
              residential, commercial, and urban spaces that combine functionality 
              with beauty.
            </p>
            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>150+</div>
                <div style={styles.statLabel}>Projects</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>15+</div>
                <div style={styles.statLabel}>Years</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>25+</div>
                <div style={styles.statLabel}>Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS SECTION - Fixed with skyblue background on active tab */}
      <section style={styles.tabsSection} ref={tabsRef}>
        <div style={styles.tabsContainer}>
          {[
            { id: "story", label: "Story" },
            { id: "approach", label: "Approach" },
            { id: "philosophy", label: "Philosophy" }
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={(e) => {
                if (!isMobile && activeTab !== tab.id) {
                  e.target.style.background = "rgba(56, 189, 248, 0.1)";
                  e.target.style.color = "#0284c7";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && activeTab !== tab.id) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#64748b";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.tabContent}>
          {activeTab === "story" && (
            <>
              <h3 style={styles.tabTitle}>Our Story</h3>
              <p style={styles.tabText}>
                Founded in 2010, Arctitech began with a vision to transform 
                the architectural landscape. What started as a small studio 
                has grown into an internationally recognized practice with 
                projects spanning residential, commercial, and urban development.
              </p>
            </>
          )}
          {activeTab === "approach" && (
            <>
              <h3 style={styles.tabTitle}>Our Approach</h3>
              <p style={styles.tabText}>
                We believe in collaborative design process, working closely 
                with clients to understand their vision and needs. Every 
                project combines technical innovation with artistic expression, 
                ensuring spaces that are both functional and beautiful.
              </p>
            </>
          )}
          {activeTab === "philosophy" && (
            <>
              <h3 style={styles.tabTitle}>Our Philosophy</h3>
              <p style={styles.tabText}>
                Architecture should enhance human experience. We create spaces 
                that inspire and elevate the human spirit while respecting 
                our environment. Good design balances aesthetics, functionality, 
                and sustainability.
              </p>
            </>
          )}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={styles.missionVisionSection}>
        <div style={styles.missionVisionGrid}>
          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>🎯</div>
            <h3 style={styles.missionHeading}>Our Mission</h3>
            <p style={styles.missionText}>
              To design inspiring spaces that enhance lives through sustainable,
              elegant, and future-ready architecture.
            </p>
          </div>

          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>👁️</div>
            <h3 style={styles.missionHeading}>Our Vision</h3>
            <p style={styles.missionText}>
              To be recognized globally as pioneers of sustainable and innovative
              architecture, creating landmarks that stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={styles.valuesSection}>
        <h2 style={{ textAlign: "center", fontSize: isMobile ? "28px" : "36px", marginBottom: "15px", color: "#fff" }}>
          Our Core Values
        </h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto 30px", fontSize: isMobile ? "15px" : "16px" }}>
          The principles that guide every project
        </p>
        <div style={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} style={styles.valueCard}>
              <div style={styles.valueIcon}>{value.icon}</div>
              <h3 style={styles.valueTitle}>{value.title}</h3>
              <p style={styles.valueDesc}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section style={styles.teamSection}>
        <h2 style={{ textAlign: "center", fontSize: isMobile ? "28px" : "36px", marginBottom: "15px" }}>
          Meet Our Team
        </h2>
        <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 30px", fontSize: isMobile ? "15px" : "16px" }}>
          Passionate architects dedicated to excellence
        </p>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.teamCard}>
              <img src={member.image} alt={member.name} style={styles.teamImage} />
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>{member.name}</h3>
                <p style={styles.teamRole}>{member.role}</p>
                <p style={styles.teamBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Bring Your Vision to Life?</h2>
        <p style={{ fontSize: isMobile ? "16px" : "18px", opacity: 0.95, marginBottom: "20px" }}>
          Let's discuss your next project.
        </p>
        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/appointment")}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.background = "#f8fafc";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.background = "#fff";
            }
          }}
        >
          Schedule a Consultation
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.7", fontSize: isMobile ? "14px" : "16px" }}>
              Creating timeless architecture that inspires.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "18px" : "20px" }}>Quick Links</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/services" style={styles.footerLink}>Services</Link>
            <Link to="/project" style={styles.footerLink}>Projects</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
            <Link to="/appointment" style={styles.footerLink}>Appointment</Link>
          </div>
           <div>
                      <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Legal</h4>
                      <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
                      <Link to="/TearmsCondition" style={styles.footerLink}>Terms of Service</Link>
                    </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "20px", fontSize: isMobile ? "18px" : "20px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "8px", fontSize: isMobile ? "14px" : "16px" }}>
              contact@arctitech.com
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "14px" : "16px" }}>+1 (555) 123-4567</p>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} ARCTITECH. All rights reserved.
        </div>
      </footer>

      {/* Global Styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scrollDown {
            0% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            75% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            overflow-x: hidden;
            width: 100%;
          }

          a {
            text-decoration: none;
          }

          button {
            outline: none;
            cursor: pointer;
            border: none;
          }

          img {
            max-width: 100%;
            height: auto;
            display: block;
          }

          a:hover {
            color: #38bdf8 !important;
          }

          .menu-btn {
            display: ${isMobile ? 'flex' : 'none'};
          }

          div[style*="missionCard"]:hover div[style*="missionIcon"] {
            animation: float 3s ease infinite;
          }

          div[style*="teamCard"]:hover img {
            transform: scale(1.05);
          }

          div[style*="valueCard"]:hover {
            transform: translateY(-8px);
            background: rgba(255,255,255,0.08);
          }
        `}
      </style>
    </div>
  );
};

export default About;