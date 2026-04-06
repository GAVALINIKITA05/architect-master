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
      if (menuOpen && !event.target.closest(".mobile-menu") && !event.target.closest(".menu-btn")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Color palette matching Home page
  const colors = {
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    secondary: {
      500: '#5d0bf5',
    },
    success: "#10b981",
    error: "#ef4444",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    background: "#ffffff",
    card: "#ffffff",
    text: {
      primary: "#1f2937",
      secondary: "#4b5563",
      light: "#6b7280",
    },
  };

  // Navigation items
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
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sarah Designer",
      role: "Head of Interior Design",
      bio: "Award-winning interior designer specializing in modern minimalist spaces.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Michael Engineer",
      role: "Sustainable Design Lead",
      bio: "LEED certified professional focused on eco-friendly architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const values = [
    { icon: "💡", title: "Innovation", desc: "Pushing boundaries with creative design solutions." },
    { icon: "🌱", title: "Sustainability", desc: "Committed to environmentally responsible architecture." },
    { icon: "✨", title: "Excellence", desc: "Delivering the highest quality in every project." },
    { icon: "🤝", title: "Integrity", desc: "Building trust through transparency and honesty." },
  ];

  // Function to check if a link is active
  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  const styles = {
    page: {
      fontFamily: "Open Sans",
      color: colors.text.primary,
      scrollBehavior: "smooth",
      overflowX: "hidden",
      width: "100%",
      backgroundColor: colors.background,
    },

    /* ---------- HEADER (Fixed with proper background) ---------- */
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled 
        ? (isMobile ? "12px 5%" : "12px 8%")
        : (isMobile ? "15px 5%" : "18px 8%"),
      background: scrolled 
        ? "rgba(255, 255, 255, 0.95)" 
        : "#ffffff",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled 
        ? "0 4px 20px rgba(0, 0, 0, 0.08)" 
        : "0 2px 10px rgba(0, 0, 0, 0.03)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logo: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "600",
      color: "#12086F",
      letterSpacing: "-0.5px",
      cursor: "pointer",
      background: "linear-gradient(135deg, #12086F 0%, #12086F 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "0.3s",
      zIndex: 1001,
      fontFamily: "Open Sans",
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
      background: "#12086F",
      transition: "all 0.3s ease",
    },

    menuBar1: {
      width: "24px",
      height: "2px",
      background: "#12086F",
      transition: "all 0.3s ease",
      transform: menuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
    },

    menuBar2: {
      width: "24px",
      height: "2px",
      background: "#12086F",
      transition: "all 0.3s ease",
      opacity: menuOpen ? 0 : 1,
    },

    menuBar3: {
      width: "24px",
      height: "2px",
      background: "#12086F",
      transition: "all 0.3s ease",
      transform: menuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
    },

    /* ---------- DESKTOP NAVIGATION ---------- */
    desktopNav: {
      display: isMobile ? "none" : "flex",
      gap: isTablet ? "15px" : "30px",
      alignItems: "center",
    },

    desktopNavLink: {
      color: colors.gray[600],
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "600",
      padding: "8px 20px",
      borderRadius: "40px",
      transition: "all 0.3s ease",
      letterSpacing: "0.5px",
      cursor: "pointer",
      fontFamily: "Open Sans",
    },

    activeDesktopNavLink: {
      background: "linear-gradient(135deg, #12086F 0%, #4338ca 100%)",
      color: "#fff !important",
      boxShadow: "0 10px 25px rgba(18, 8, 111, 0.3)",
    },

    /* ---------- MOBILE MENU ---------- */
    mobileMenu: {
      position: "fixed",
      top: isMobile ? "70px" : "80px",
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(10px)",
      padding: "30px 20px",
      transform: menuOpen ? "translateY(0)" : "translateY(-150%)",
      transition: "transform 0.3s ease",
      zIndex: 999,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },

    mobileNavLink: {
      display: "block",
      color: colors.gray[800],
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "600",
      padding: "15px 0",
      borderBottom: `1px solid ${colors.gray[200]}`,
      transition: "color 0.3s ease",
      textAlign: "center",
      fontFamily: "Open Sans",
    },

    /* ---------- HERO SECTION ---------- */
    heroSection: {
      position: "relative",
      height: isMobile ? "100vh" : "80vh",
      minHeight: isMobile ? "600px" : "700px",
      backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 100%), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: colors.text.primary,
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
      background: "rgba(18, 8, 111, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(18, 8, 111, 0.3)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: isMobile ? "20px" : "24px",
      color: "#12086F",
      fontFamily: "Open Sans",
    },

    heroTitle: {
      fontSize: isMobile ? "clamp(36px, 10vw, 48px)" : "clamp(48px, 8vw, 72px)",
      fontWeight: "600",
      marginBottom: isMobile ? "20px" : "24px",
      lineHeight: "1.2",
      fontFamily: "Open Sans",
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #12086F 0%, #12086F 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    heroSubtitle: {
      fontSize: isMobile ? "16px" : "clamp(18px, 4vw, 20px)",
      opacity: 0.8,
      lineHeight: isMobile ? "1.6" : "1.8",
      color: colors.text.secondary,
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Open Sans",
    },

    scrollHint: {
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      color: colors.text.light,
      fontSize: "14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      opacity: showScrollHint ? 1 : 0,
      transition: "opacity 0.3s ease",
      fontFamily: "Open Sans",
    },

    scrollArrow: {
      width: "30px",
      height: "50px",
      border: `2px solid ${colors.gray[300]}`,
      borderRadius: "25px",
      position: "relative",
    },

    scrollDot: {
      width: "6px",
      height: "10px",
      background: "#12086F",
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
      backgroundColor: colors.background,
    },

    aboutContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "30px" : "60px",
      alignItems: "center",
      maxWidth: "1400px",
      margin: "0 auto",
    },

    aboutImageBox: {
      position: "relative",
      borderRadius: isMobile ? "20px" : "30px",
      overflow: "hidden",
      boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
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
      background: "linear-gradient(135deg, rgba(18,8,111,0.05) 0%, rgba(67,56,202,0.05) 100%)",
    },

    experienceBadge: {
      position: "absolute",
      bottom: isMobile ? "15px" : "30px",
      right: isMobile ? "15px" : "30px",
      background: "white",
      padding: isMobile ? "12px" : "24px",
      borderRadius: isMobile ? "15px" : "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      textAlign: "center",
    },

    experienceNumber: {
      fontSize: isMobile ? "24px" : "36px",
      fontWeight: "600",
      color: "#12086F",
      lineHeight: "1",
      fontFamily: "Open Sans",
    },

    experienceText: {
      fontSize: isMobile ? "10px" : "14px",
      color: colors.text.light,
      marginTop: "3px",
      fontFamily: "Open Sans",
    },

    aboutContent: {
      padding: isMobile ? "0" : "20px",
    },

    sectionBadge: {
      display: "inline-block",
      padding: isMobile ? "4px 12px" : "6px 16px",
      background: "#eef2ff",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: "600",
      color: "#12086F",
      marginBottom: isMobile ? "15px" : "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontFamily: "Open Sans",
    },

    heading: {
      fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(32px, 5vw, 42px)",
      fontWeight: "600",
      marginBottom: isMobile ? "15px" : "24px",
      lineHeight: "1.3",
      color: colors.text.primary,
      fontFamily: "Open Sans",
    },

    headingHighlight: {
      color: "#12086F",
      borderBottom: isMobile ? "3px solid #12086F" : "4px solid #12086F",
      paddingBottom: "4px",
    },

    text: {
      fontSize: isMobile ? "15px" : "17px",
      lineHeight: "1.8",
      color: colors.text.secondary,
      marginBottom: "20px",
      fontFamily: "Open Sans",
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
      fontWeight: "600",
      color: "#12086F",
      marginBottom: "4px",
      fontFamily: "Open Sans",
    },

    statLabel: {
      fontSize: isMobile ? "11px" : "14px",
      color: colors.text.light,
      fontWeight: "600",
      fontFamily: "Open Sans",
    },

    /* ---------- TABS SECTION ---------- */
    tabsSection: {
      padding: isMobile ? "50px 20px" : "80px 10%",
      backgroundColor: colors.gray[50],
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
      color: colors.text.light,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: `2px solid transparent`,
      whiteSpace: "nowrap",
      fontFamily: "Open Sans",
    },

    activeTab: {
      background: "linear-gradient(135deg, #12086F 0%, #4338ca 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(18, 8, 111, 0.3)",
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
      fontWeight: "600",
      marginBottom: isMobile ? "15px" : "20px",
      color: colors.text.primary,
      fontFamily: "Open Sans",
    },

    tabText: {
      fontSize: isMobile ? "15px" : "17px",
      lineHeight: "1.8",
      color: colors.text.secondary,
      fontFamily: "Open Sans",
    },

    /* ---------- MISSION VISION SECTION ---------- */
    missionVisionSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      // backgroundColor: colors.background,
    },

    missionVisionGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: isMobile ? "20px" : "40px",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    missionCard: {
      background: colors.background,
      padding: isMobile ? "30px 20px" : "48px 32px",
      borderRadius: isMobile ? "20px" : "30px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      textAlign: "center",
      border: `1px solid ${colors.gray[200]}`,
    },

    missionIcon: {
      fontSize: isMobile ? "40px" : "48px",
      marginBottom: "20px",
      display: "inline-block",
      padding: isMobile ? "12px" : "16px",
      background: colors.gray[50],
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
    },

    missionHeading: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "600",
      marginBottom: "15px",
      color:"#12086F",
      fontFamily: "Open Sans",
    },

    missionText: {
      fontSize: isMobile ? "14px" : "16px",
      lineHeight: "1.8",
      color: colors.text.secondary,
      fontFamily: "Open Sans",
    },

    /* ---------- TEAM SECTION ---------- */
    teamSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      backgroundColor: colors.gray[50],
    },

    teamGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
      gap: isMobile ? "25px" : "40px",
      marginTop: "40px",
      maxWidth: "1200px",
      margin: "40px auto 0",
    },

    teamCard: {
      // background: colors.background,
      borderRadius: isMobile ? "20px" : "30px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      transition: "all 0.4s ease",
      border: `1px solid ${colors.gray[200]}`,
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
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: "5px",
      fontFamily: "Open Sans",
    },

    teamRole: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#12086F",
      fontWeight: "600",
      marginBottom: "12px",
      fontFamily: "Open Sans",
    },

    teamBio: {
      fontSize: isMobile ? "13px" : "14px",
      color: colors.text.light,
      lineHeight: "1.7",
      fontFamily: "Open Sans",
    },

    /* ---------- VALUES SECTION ---------- */
    valuesSection: {
      padding: isMobile ? "50px 20px" : "100px 10%",
      background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
      color: colors.text.secondary,
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "20px" : "40px",
      marginTop: "40px",
      maxWidth: "1200px",
      margin: "40px auto 0",
    },

    valueCard: {
      textAlign: "center",
      padding: isMobile ? "30px 20px" : "40px 24px",
      background: colors.background,
      borderRadius: isMobile ? "20px" : "30px",
      border: `1px solid ${colors.gray[200]}`,
      transition: "0.4s",
      boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
    },

    valueIcon: {
      fontSize: isMobile ? "36px" : "40px",
      marginBottom: "20px",
    },

    valueTitle: {
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#12086F",
      fontFamily: "Open Sans",
    },

    valueDesc: {
      fontSize: isMobile ? "13px" : "15px",
      color: colors.text.secondary,
      lineHeight: "1.7",
      fontFamily: "Open Sans",
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: isMobile ? "50px 20px" : "80px 10%",
      // background: "linear-gradient(135deg, #12086F 0%,  #12086F 100%)",
      textAlign: "center",
      color: "#12086F",
    },

    ctaTitle: {
      fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(28px, 5vw, 40px)",
      fontWeight: "600",
      marginBottom: "15px",
      lineHeight: "1.3",
      fontFamily: "Open Sans",
    },

    ctaBtn: {
      padding: isMobile ? "14px 32px" : "16px 48px",
      background: "#767474",
      color: "#12086F",
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
      fontFamily: "Open Sans",
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#e9ebec",
      color: colors.text.secondary,
      padding: isMobile ? "40px 20px 20px" : "60px 10% 30px",
      borderTop: `1px solid ${colors.gray[200]}`,
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "30px" : "60px",
      marginBottom: "30px",
      maxWidth: "1200px",
      margin: "0 auto 30px",
      textAlign: isMobile ? "center" : "left",
    },

    footerLogo: {
      fontSize: isMobile ? "26px" : "28px",
      fontWeight: "600",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #362b57 0%, #393658 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
      fontFamily: "Open Sans",
    },

    footerHeading: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      marginBottom: isMobile ? "15px" : "20px",
      color: colors.text.primary,
      fontFamily: "Open Sans",
    },

    footerLink: {
      color: colors.text.light,
      textDecoration: "none",
      display: "block",
      marginBottom: "10px",
      transition: "0.3s",
      fontSize: isMobile ? "14px" : "16px",
      fontFamily: "Open Sans",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "20px",
      borderTop: `1px solid ${colors.gray[200]}`,
      color: colors.text.light,
      fontSize: isMobile ? "12px" : "14px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "Open Sans",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
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
                ...(isActiveLink(item.path) ? styles.activeDesktopNavLink : {}),
              }}
              onMouseEnter={(e) => {
                if (!isMobile && !isActiveLink(item.path)) {
                  e.target.style.background = colors.gray[100];
                  e.target.style.color = "#12086F";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !isActiveLink(item.path)) {
                  e.target.style.background = "transparent";
                  e.target.style.color = colors.gray[600];
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="menu-btn" style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
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
            style={{
              ...styles.mobileNavLink,
              ...(isActiveLink(item.path) ? { color: "#12086F", fontWeight: "700" } : {})
            }} 
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
            A team of passionate architects dedicated to creating timeless, sustainable, and innovative designs.
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
            <img src={aboutImage} alt="Architecture Building" style={styles.image} />
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
              Arctitech is a modern architectural design company focused on innovation, sustainability, and timeless
              aesthetics. We create residential, commercial, and urban spaces that combine functionality with beauty.
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

      {/* TABS SECTION */}
      <section style={styles.tabsSection} ref={tabsRef}>
        <div style={styles.tabsContainer}>
          {[
            { id: "story", label: "Story" },
            { id: "approach", label: "Approach" },
            { id: "philosophy", label: "Philosophy" },
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={(e) => {
                if (!isMobile && activeTab !== tab.id) {
                  e.target.style.background = colors.gray[100];
                  e.target.style.color = "#12086F";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && activeTab !== tab.id) {
                  e.target.style.background = "transparent";
                  e.target.style.color = colors.text.light;
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
                Founded in 2010, Arctitech began with a vision to transform the architectural landscape. What started as
                a small studio has grown into an internationally recognized practice with projects spanning residential,
                commercial, and urban development.
              </p>
            </>
          )}
          {activeTab === "approach" && (
            <>
              <h3 style={styles.tabTitle}>Our Approach</h3>
              <p style={styles.tabText}>
                We believe in collaborative design process, working closely with clients to understand their vision and
                needs. Every project combines technical innovation with artistic expression, ensuring spaces that are
                both functional and beautiful.
              </p>
            </>
          )}
          {activeTab === "philosophy" && (
            <>
              <h3 style={styles.tabTitle}>Our Philosophy</h3>
              <p style={styles.tabText}>
                Architecture should enhance human experience. We create spaces that inspire and elevate the human spirit
                while respecting our environment. Good design balances aesthetics, functionality, and sustainability.
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
              To design inspiring spaces that enhance lives through sustainable, elegant, and future-ready architecture.
            </p>
          </div>

          <div style={styles.missionCard}>
            <div style={styles.missionIcon}>👁️</div>
            <h3 style={styles.missionHeading}>Our Vision</h3>
            <p style={styles.missionText}>
              To be recognized globally as pioneers of sustainable and innovative architecture, creating landmarks that
              stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={styles.valuesSection}>
        <h2 style={{...styles.heading,color:"#12086F"}}>
          Our Core Values
        </h2>
        <p style={styles.text}>
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
        <h2 style={{...styles.heading,color:"#12086F"}}>
          Meet Our Team
        </h2>
        <p style={styles.text}>
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
        <p style={{ fontSize: isMobile ? "16px" : "18px", opacity: 0.95, marginBottom: "20px", fontFamily: "Open Sans" }}>
          Let's discuss your next project.
        </p>
        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/appointment")}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(0) scale(1)";
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
                  <p style={styles.footerText}>
                    Creating timeless architecture that inspires and transforms spaces into extraordinary experiences.
                  </p>
                </div>
                
                <div>
                  <h4 style={styles.footerHeading}>Quick Links</h4>
                  <Link to="/about" style={styles.footerLink}>About Us</Link>
                  <Link to="/services" style={styles.footerLink}>Services</Link>
                  <Link to="/project" style={styles.footerLink}>Projects</Link>
                  <Link to="/contact" style={styles.footerLink}>Contact</Link>
                  <Link to="/appointment" style={styles.footerLink}>Appointment</Link>
                </div>
                
                <div>
                  <h4 style={styles.footerHeading}>Legal</h4>
                  <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
                  <Link to="/TearmsCondition" style={styles.footerLink}>Terms of Service</Link>
                </div>
                
                <div>
                  <h4 style={styles.footerHeading}>Contact Us</h4>
                  <div style={styles.footerContactItem}>
                    <span style={styles.footerContactIcon}>📍</span>
                    <span>123 Architecture Ave, Design District, NY 10001</span>
                  </div>
                  <div style={styles.footerContactItem}>
                    <span style={styles.footerContactIcon}>📧</span>
                    <a href="mailto:contact@arctitech.com" style={{ color: "#4a5568", textDecoration: "none" }}>contact@arctitech.com</a>
                  </div>
                  <div style={styles.footerContactItem}>
                    <span style={styles.footerContactIcon}>📞</span>
                    <a href="tel:+15551234567" style={{ color: "#4a5568", textDecoration: "none" }}>+1 (555) 123-4567</a>
                  </div>
                  <div style={styles.footerContactItem}>
                    <span style={styles.footerContactIcon}>🕒</span>
                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div style={styles.copyright}>
                © {new Date().getFullYear()} ARCTITECH. All rights reserved. | Crafted with for architecture
              </div>
            </footer>
      
    </div>
  );
};

export default About;