import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ---------------- COUNTER COMPONENT ---------------- */
const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

/* ---------------- HOME COMPONENT ---------------- */
export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeConsultTab, setActiveConsultTab] = useState("process"); // New state for consultation tabs

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu when scrolling
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Color palette matching Appointment page
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

  const styles = {
    page: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      scrollBehavior: "smooth",
      color: "#1e293b",
      overflowX: "hidden",
    },

    /* ---------- NAVBAR (Responsive) ---------- */
    navbar: {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
    menuButton: {
      display: isMobile ? "block" : "none",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 1001,
      padding: "10px",
    },

    menuIcon: {
      width: "24px",
      height: "2px",
      background: "#fff",
      margin: "5px 0",
      transition: "0.3s",
      transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
    },

    menuIcon2: {
      width: "24px",
      height: "2px",
      background: "#fff",
      margin: "5px 0",
      transition: "0.3s",
      opacity: mobileMenuOpen ? 0 : 1,
    },

    menuIcon3: {
      width: "24px",
      height: "2px",
      background: "#fff",
      margin: "5px 0",
      transition: "0.3s",
      transform: mobileMenuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none",
    },

    /* ---------- NAVIGATION MENU (Responsive) ---------- */
    navMenu: {
      display: isMobile ? (mobileMenuOpen ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      position: isMobile ? "fixed" : "static",
      top: isMobile ? 0 : "auto",
      left: isMobile ? 0 : "auto",
      width: isMobile ? "100%" : "auto",
      height: isMobile ? "100vh" : "auto",
      background: isMobile ? "rgba(15, 23, 42, 0.98)" : "transparent",
      backdropFilter: isMobile ? "blur(10px)" : "none",
      padding: isMobile ? "80px 20px 40px" : "0",
      alignItems: isMobile ? "center" : "center",
      justifyContent: isMobile ? "flex-start" : "flex-start",
      gap: isMobile ? "20px" : isTablet ? "15px" : "30px",
      zIndex: 1000,
      transition: "0.3s",
      overflowY: isMobile ? "auto" : "visible",
    },

    tabItem: {
      padding: isMobile ? "12px 30px" : "8px 20px",
      color: "rgba(255,255,255,0.7)",
      fontSize: isMobile ? "18px" : "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderRadius: "40px",
      letterSpacing: "0.5px",
      textDecoration: "none",
      width: isMobile ? "100%" : "auto",
      textAlign: isMobile ? "center" : "left",
    },

    activeTabItem: {
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
    },

    /* ---------- HERO (Responsive) ---------- */
    hero: {
      minHeight: "100vh",
      height: "auto",
      backgroundImage: 
        "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
      position: "relative",
      padding: isMobile ? "100px 20px" : "0",
    },

    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "900px",
      padding: isMobile ? "40px 0" : "0 20px",
      animation: "fadeInUp 1s ease",
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
      marginBottom: "30px",
      color: "#fff",
    },

    heroTitle: {
      fontSize: isMobile ? "32px" : isTablet ? "56px" : "clamp(40px, 8vw, 72px)",
      fontWeight: "800",
      marginBottom: isMobile ? "15px" : "20px",
      lineHeight: "1.2",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    heroSubtitle: {
      fontSize: isMobile ? "16px" : "clamp(16px, 4vw, 20px)",
      opacity: 0.95,
      marginBottom: "40px",
      lineHeight: "1.8",
      color: "rgba(255,255,255,0.9)",
      padding: isMobile ? "0 10px" : "0",
    },

    heroBtn: {
      padding: isMobile ? "14px 32px" : "16px 42px",
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
      position: "relative",
      overflow: "hidden",
    },

    /* ---------- COMMON SECTION (Responsive) ---------- */
    section: {
      padding: isMobile ? "80px 5%" : isTablet ? "100px 6%" : "120px 8%",
      position: "relative",
    },

    sectionLight: {
      backgroundColor: "#ffffff",
    },

    sectionDark: {
      backgroundColor: "#f8fafc",
    },

    sectionTitle: {
      fontSize: isMobile ? "28px" : isTablet ? "38px" : "clamp(32px, 5vw, 44px)",
      textAlign: "center",
      marginBottom: "15px",
      color: "#0f172a",
      fontWeight: "700",
      position: "relative",
    },

    sectionSubtitle: {
      textAlign: "center",
      color: "#64748b",
      fontSize: isMobile ? "16px" : "18px",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.7",
      padding: isMobile ? "0 15px" : "0",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(300px, 1fr))",
      gap: isMobile ? "30px" : "40px",
      marginTop: "20px",
    },

    /* ---------- SERVICE CARDS (Responsive) ---------- */
    card: {
      backgroundColor: "#b7b1b1",
      padding: isMobile ? "40px 24px" : "48px 32px",
      borderRadius: "30px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
      textAlign: "center",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      border: "1px solid rgba(0,0,0,0.02)",
      position: "relative",
      overflow: "hidden",
    },

    cardIcon: {
      fontSize: isMobile ? "40px" : "48px",
      marginBottom: "20px",
      display: "inline-block",
      padding: isMobile ? "16px" : "20px",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      borderRadius: "20px",
      color: "#0284c7",
    },

    cardTitle: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#0f172a",
    },

    cardDesc: {
      color: "#080808",
      lineHeight: "1.7",
      fontSize: isMobile ? "15px" : "16px",
    },

    /* ---------- FEATURES SECTION (From Appointment Page) ---------- */
    featuresSection: {
      padding: isMobile ? "60px 5%" : "80px 8%",
      backgroundColor: colors.gray[50],
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : '30px',
      marginTop: '40px',
    },
    featureCard: {
      padding: isMobile ? '24px' : '32px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: `1px solid ${colors.gray[200]}`,
    },
    featureIcon: {
      width: isMobile ? '64px' : '80px',
      height: isMobile ? '64px' : '80px',
      margin: '0 auto 16px',
      backgroundColor: colors.primary[50],
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '32px' : '36px',
      color: colors.primary[600],
    },
    featureTitle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '700',
      color: colors.gray[900],
      marginBottom: '12px',
    },
    featureDesc: {
      fontSize: isMobile ? '14px' : '15px',
      color: colors.gray[600],
      lineHeight: '1.6',
    },

    /* ---------- CONSULTATION TABS (New) ---------- */
    consultationTabsSection: {
      padding: isMobile ? "60px 5%" : "80px 8%",
      background: "linear-gradient(135deg, #e8e1ef 0%, #ffffff 100%)",
    },

    consultationTabsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "10px" : "20px",
      marginBottom: "50px",
      flexWrap: "wrap",
    },

    consultationTab: {
      padding: isMobile ? "12px 24px" : "16px 40px",
      background: "transparent",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      color: "#474a4a",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
      border: "2px solid transparent",
    },

    activeConsultationTab: {
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
    },

    consultationTabContent: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: isMobile ? "30px 20px" : "40px",
      backgroundColor: "#decfcf",
      borderRadius: "40px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
      animation: "fadeIn 0.5s ease",
    },

    consultationTabTitle: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#0f172a",
      textAlign: "center",
    },

    consultationTabGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: isMobile ? "20px" : "30px",
      marginTop: "30px",
    },

    consultationTabCard: {
      padding: isMobile ? "24px" : "32px",
      backgroundColor: "#ccc6c6",
      borderRadius: "24px",
      textAlign: "center",
      transition: "0.3s",
    },

    consultationTabIcon: {
      fontSize: isMobile ? "32px" : "36px",
      marginBottom: "16px",
    },

    consultationTabCardTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#0e1013",
    },

    consultationTabCardDesc: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#0d0e10",
      lineHeight: "1.6",
    },

    consultationTabList: {
      listStyle: "none",
      padding: "0",
      maxWidth: "600px",
      margin: "0 auto",
    },

    consultationTabListItem: {
      padding: "12px 0",
      fontSize: isMobile ? "16px" : "17px",
      color: "#475569",
      borderBottom: `1px solid ${colors.gray[200]}`,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    consultationTabListItemIcon: {
      color: "#0284c7",
      fontSize: "20px",
    },

    /* ---------- CONSULTATION CTA (From Appointment Page) ---------- */
    consultationSection: {
      padding: isMobile ? '60px 5%' : '80px 8%',
      background: "linear-gradient(135deg, #686869 0%, #8b8c8d 100%)",

      // background: `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 100%)`,
      color: 'white',
      textAlign: 'center',
    },
    consultationTitle: {
      fontSize: isMobile ? '28px' : '36px',
      fontWeight: '700',
      marginBottom: '16px',
    },
    consultationHighlight: {
      color: colors.secondary[500],
    },
    consultationSubtitle: {
      fontSize: isMobile ? '16px' : '18px',
      opacity: 0.95,
      maxWidth: '700px',
      margin: '0 auto 30px',
      lineHeight: '1.6',
      color: colors.gray[300],
    },
    consultationBtn: {
      padding: isMobile ? '14px 28px' : '16px 32px',
      backgroundColor: 'white',
      color: colors.primary[600],
      border: 'none',
      borderRadius: '50px',
      fontSize: isMobile ? '15px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    },

    /* ---------- ACHIEVEMENTS (Responsive) ---------- */
    achievementSection: {
      padding: isMobile ? "80px 5%" : isTablet ? "100px 6%" : "120px 8%",
      background: "linear-gradient(135deg, #b3b4b7 0%, #bfc2c5 100%)",
      color: "#fff",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },

    achievementGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(240px, 1fr))",
      gap: isMobile ? "30px" : "40px",
      marginTop: isMobile ? "40px" : "60px",
    },

    achievementCard: {
      background: "rgba(96, 96, 96, 0.03)",
      backdropFilter: "blur(10px)",
      padding: isMobile ? "40px 24px" : "48px 32px",
      borderRadius: "30px",
      border: "1px solid rgba(255,255,255,0.05)",
      transition: "0.4s",
    },

    achievementNumber: {
      fontSize: isMobile ? "42px" : "52px",
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "800",
      marginBottom: "8px",
      lineHeight: "1",
    },

    achievementLabel: {
      fontSize: isMobile ? "16px" : "18px",
      color: "rgba(255,255,255,0.8)",
      fontWeight: "500",
    },

    /* ---------- PROJECTS (Responsive) ---------- */
    projectGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(350px, 1fr))",
      gap: isMobile ? "20px" : "30px",
      marginTop: "40px",
    },

    projectCard: {
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      cursor: "pointer",
      aspectRatio: "1/1",
    },

    projectImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)",
    },

    projectOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.4) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: isMobile ? "24px" : "32px",
      opacity: isMobile ? 1 : 0,
      transition: "opacity 0.4s ease",
    },

    projectTitle: {
      color: "#fff",
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "700",
      marginBottom: "4px",
      transform: isMobile ? "translateY(0)" : "translateY(20px)",
      transition: "transform 0.4s ease",
    },

    projectCategory: {
      color: "rgba(10, 8, 8, 0.8)",
      fontSize: isMobile ? "12px" : "14px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      transform: isMobile ? "translateY(0)" : "translateY(20px)",
      transition: "transform 0.4s ease 0.1s",
    },

    /* ---------- CTA SECTION (Responsive) ---------- */
    ctaSection: {
      padding: isMobile ? "60px 5%" : "100px 8%",
      background: "linear-gradient(135deg, #c4c7c8 0%, #bcbfc0 100%)",
      textAlign: "center",
      color: "#fff",
    },

    ctaTitle: {
      fontSize: isMobile ? "28px" : isTablet ? "40px" : "clamp(32px, 5vw, 48px)",
      fontWeight: "700",
      marginBottom: "15px",
    },

    ctaBtn: {
      padding: isMobile ? "16px 32px" : "18px 48px",
      background: "#fff",
      color: "#0284c7",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      marginTop: "30px",
    },

    /* ---------- FOOTER (Responsive) ---------- */
    footer: {
      background: "#0f172a",
      color: "#fff",
      padding: isMobile ? "40px 5% 20px" : "60px 8% 30px",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "40px" : "60px",
      marginBottom: "40px",
      textAlign: isMobile ? "center" : "left",
    },

    footerLogo: {
      fontSize: isMobile ? "24px" : "28px",
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
      fontSize: isMobile ? "15px" : "16px",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      fontSize: isMobile ? "14px" : "16px",
    },
  };

  const tabItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
     { id: "contact", label: "Contact", path: "/contact" },
    { id: "services", label: "Services", path: "/services" },
    { id: "projects", label: "Projects", path: "/project" },
   
    { id: "appointment", label: "Appointment", path: "/appointment" },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Expert Consultation',
      desc: 'Get professional advice from experienced architects who understand your vision.'
    },
    {
      icon: '⏱️',
      title: '30-Minute Sessions',
      desc: 'Focused consultations designed to understand your needs efficiently.'
    },
    {
      icon: '💻',
      title: 'Flexible Meetings',
      desc: 'Choose between virtual video calls or in-person consultations.'
    },
    {
      icon: '📋',
      title: 'Detailed Planning',
      desc: 'Receive a comprehensive project roadmap and next steps.'
    }
  ];

  // Consultation tab content
  const consultationTabs = [
    {
      id: "process",
      label: "Process",
      content: {
        title: "Our Consultation Process",
        items: [
          { icon: "📞", title: "Initial Call", desc: "15-minute discovery call to understand your project scope" },
          { icon: "📋", title: "Needs Assessment", desc: "Detailed discussion of requirements, budget, and timeline" },
          { icon: "🎨", title: "Concept Review", desc: "Presentation of initial concepts and design directions" },
        ]
      }
    },
    {
      id: "benefits",
      label: "Benefits",
      content: {
        title: "Why Consult With Us",
        items: [
          { icon: "⭐", title: "Expert Guidance", desc: "Access to 15+ years of architectural expertise" },
          { icon: "💰", title: "Cost Clarity", desc: "Transparent pricing and budget optimization" },
          { icon: "⚡", title: "Time Savings", desc: "Efficient planning that saves months in project timeline" },
        ]
      }
    },
    {
      id: "preparation",
      label: "Preparation",
      content: {
        title: "How to Prepare",
        items: [
          { icon: "📝", title: "Project Ideas", desc: "Bring sketches, inspiration photos, or mood boards" },
          { icon: "📊", title: "Budget Range", desc: "Have a rough budget in mind for realistic planning" },
          { icon: "❓", title: "Questions List", desc: "Prepare questions about design, permits, and timeline" },
        ]
      }
    }
  ];

  return (
    <div style={styles.page}>
      {/* NAVBAR WITH RESPONSIVE MENU */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          ARCTITECH
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={styles.menuButton}
          className="menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon2}></div>
          <div style={styles.menuIcon3}></div>
        </button>

        {/* Navigation Menu */}
        <div style={styles.navMenu} className="mobile-menu">
          {tabItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                ...styles.tabItem,
                ...(window.location.pathname === item.path ? styles.activeTabItem : {}),
              }}
              onClick={() => isMobile && setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                if (!isMobile && window.location.pathname !== item.path) {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                  e.target.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && window.location.pathname !== item.path) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "rgba(255,255,255,0.7)";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Architecture Studio</span>
          <h1 style={styles.heroTitle}>
            Designing{" "}
            <span style={styles.heroTitleHighlight}>Modern</span>
            <br />
            & Luxury Spaces
          </h1>
          <p style={styles.heroSubtitle}>
            We create timeless architecture that blends innovation, 
            sustainability, and elegance. Transforming visions into 
            extraordinary spaces.
          </p>
          <button
            style={styles.heroBtn}
            onClick={() => navigate("/project")}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 35px rgba(56, 189, 248, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 25px rgba(56, 189, 248, 0.3)";
              }
            }}
          >
            Explore Projects
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{...styles.section, ...styles.sectionLight}}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <p style={styles.sectionSubtitle}>
          Comprehensive architectural solutions tailored to your vision
        </p>
        <div style={styles.grid}>
          {[
            { 
              icon: "🏛️", 
              title: "Residential Design", 
              desc: "Modern homes crafted with luxury, comfort, and sustainable design principles. Custom villas, apartments, and family homes." 
            },
            { 
              icon: "🏢", 
              title: "Commercial Spaces", 
              desc: "Innovative office and retail architecture that inspires productivity. Corporate headquarters, showrooms, and retail stores." 
            },
            { 
              icon: "🪑", 
              title: "Interior Design", 
              desc: "Elegant interiors with perfect space planning and premium finishes. Complete interior solutions for residential and commercial." 
            },
            { 
              icon: "🌿", 
              title: "Sustainable Design", 
              desc: "Eco-friendly solutions that reduce environmental impact. Green building, energy efficiency, and sustainable materials." 
            },
            { 
              icon: "🏗️", 
              title: "Urban Planning", 
              desc: "Comprehensive master planning for communities and cities. Mixed-use developments, public spaces, and urban revitalization." 
            },
            { 
              icon: "🏛️", 
              title: "Heritage Conservation", 
              desc: "Expert restoration and preservation of historical buildings. Maintaining architectural heritage with modern functionality." 
            },
          ].map((service, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => navigate("/services")}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.03)";
                }
              }}
            >
              <div style={styles.cardIcon}>{service.icon}</div>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardDesc}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle}>Why Choose Our Consultation</h2>
          <p style={styles.sectionSubtitle}>
            Experience a professional consultation tailored to your specific architectural needs
          </p>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  ...styles.featureCard,
                  ...(hoveredFeature === index && !isMobile ? {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${colors.primary[100]}`,
                    borderColor: colors.primary[300]
                  } : {})
                }}
                onMouseEnter={() => !isMobile && setHoveredFeature(index)}
                onMouseLeave={() => !isMobile && setHoveredFeature(null)}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION TABS SECTION (New with 3 tabs) */}
      <section style={styles.consultationTabsSection}>
        <h2 style={styles.sectionTitle}>Consultation Experience</h2>
        <p style={styles.sectionSubtitle}>
          Everything you need to know about our architectural consultation
        </p>
        
        <div style={styles.consultationTabsContainer}>
          {consultationTabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.consultationTab,
                ...(activeConsultTab === tab.id ? styles.activeConsultationTab : {})
              }}
              onClick={() => setActiveConsultTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={styles.consultationTabContent}>
          <h3 style={styles.consultationTabTitle}>
            {consultationTabs.find(t => t.id === activeConsultTab)?.content.title}
          </h3>
          <div style={styles.consultationTabGrid}>
            {consultationTabs.find(t => t.id === activeConsultTab)?.content.items.map((item, index) => (
              <div key={index} style={styles.consultationTabCard}>
                <div style={styles.consultationTabIcon}>{item.icon}</div>
                <h4 style={styles.consultationTabCardTitle}>{item.title}</h4>
                <p style={styles.consultationTabCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION CTA */}
      <section style={styles.consultationSection}>
        <h2 style={styles.consultationTitle}>
          Book Your <span style={styles.consultationHighlight}>Architectural</span> Consultation
        </h2>
        <p style={styles.consultationSubtitle}>
          Let's discuss your vision and bring your ideas to life. 
          Choose a time that works best for you.
        </p>
        <button
          style={styles.consultationBtn}
          onClick={() => navigate("/appointment")}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)";
              e.target.style.backgroundColor = colors.gray[50];
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              e.target.style.backgroundColor = "white";
            }
          }}
        >
          Schedule Consultation
        </button>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={styles.achievementSection}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>
            Our Achievements
          </h2>
          <p style={{ ...styles.sectionSubtitle, color: "rgba(255,255,255,0.8)" }}>
            Numbers that speak for themselves
          </p>
          <div style={styles.achievementGrid}>
            {[
              { target: 250, label: "Projects Completed", suffix: "+" },
              { target: 120, label: "Happy Clients", suffix: "+" },
              { target: 15, label: "Years Experience", suffix: "+" },
              { target: 35, label: "Awards Won", suffix: "+" },
            ].map((item, index) => (
              <div
                key={index}
                style={styles.achievementCard}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }
                }}
              >
                <h3 style={styles.achievementNumber}>
                  <Counter target={item.target} duration={2000} />
                  {item.suffix}
                </h3>
                <p style={styles.achievementLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{...styles.section, ...styles.sectionDark}}>
        <h2 style={styles.sectionTitle}>Recent Projects</h2>
        <p style={styles.sectionSubtitle}>
          Discover our latest architectural masterpieces
        </p>
        <div style={styles.projectGrid}>
          {[
            { image: "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Villa Serenity", category: "Residential" },
            { image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Modern Loft", category: "Residential" },
            { image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Corporate Tower", category: "Commercial" },
            { image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Eco Residence", category: "Sustainable" },
            { image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Urban Oasis", category: "Urban Planning" },
            { image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Heritage Manor", category: "Conservation" },
          ].map((project, index) => (
            <div
              key={index}
              style={styles.projectCard}
              onClick={() => navigate("/project")}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  const img = e.currentTarget.querySelector("img");
                  const overlay = e.currentTarget.querySelector(".overlay");
                  if (img) img.style.transform = "scale(1.1)";
                  if (overlay) overlay.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  const img = e.currentTarget.querySelector("img");
                  const overlay = e.currentTarget.querySelector(".overlay");
                  if (img) img.style.transform = "scale(1)";
                  if (overlay) overlay.style.opacity = "0";
                }
              }}
            >
              <img
                src={project.image}
                style={styles.projectImage}
                alt={project.title}
              />
              <div className="overlay" style={styles.projectOverlay}>
                <h4 style={styles.projectTitle}>{project.title}</h4>
                <p style={styles.projectCategory}>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
        <p style={{ fontSize: isMobile ? "16px" : "18px", opacity: 0.95, maxWidth: "600px", margin: "0 auto", padding: isMobile ? "0 20px" : "0" }}>
          Let's bring your vision to life. Schedule a consultation with our team.
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
          Book a Consultation
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.7", fontSize: isMobile ? "15px" : "16px" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Quick Links</h4>
            <Link to="/about" style={styles.footerLink}>About Us</Link>

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
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "10px", fontSize: isMobile ? "15px" : "16px" }}>
              contact@arctitech.com
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "15px" : "16px" }}>+1 (555) 123-4567</p>
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
          }

          .overlay {
            opacity: ${isMobile ? 1 : 0};
          }

          div[style*="projectCard"]:hover .overlay {
            opacity: 1 !important;
          }

          div[style*="projectCard"]:hover .overlay h4,
          div[style*="projectCard"]:hover .overlay p {
            transform: translateY(0) !important;
          }

          div[style*="card"]:hover div[style*="cardIcon"] {
            animation: float 3s ease infinite;
          }

          div[style*="featureCard"]:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px ${colors.primary[100]};
            border-color: ${colors.primary[300]};
          }

          @media (max-width: 768px) {
            div[style*="projectCard"] .overlay h4,
            div[style*="projectCard"] .overlay p {
              transform: translateY(0) !important;
            }
            
            div[style*="featureCard"]:hover {
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
}