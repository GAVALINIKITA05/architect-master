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
  const [activeConsultTab, setActiveConsultTab] = useState("process");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      500: '#5d0bf5',
     
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
      fontFamily: "Open Sans",
      scrollBehavior: "smooth",
      color: "#1e293b",
      overflowX: "hidden",
      backgroundColor: "#ffffff",
    },

    /* ---------- NAVBAR (White Header) ---------- */
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
        ? "rgba(255, 255, 255, 0.98)" 
        : "#ffffff",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "0 2px 10px rgba(0,0,0,0.03)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    },

    logo: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "700",
      color: "#0f172a",
      letterSpacing: "-0.5px",
      cursor: "pointer",
      background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "0.3s",
      zIndex: 1001,
    },

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
      background: "#12086F",
      margin: "5px 0",
      transition: "0.3s",
      transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
    },

    menuIcon2: {
      width: "24px",
      height: "2px",
      background: "#0f172a",
      margin: "5px 0",
      transition: "0.3s",
      opacity: mobileMenuOpen ? 0 : 1,
    },

    menuIcon3: {
      width: "24px",
      height: "2px",
      background: "#0f172a",
      margin: "5px 0",
      transition: "0.3s",
      transform: mobileMenuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none",
    },

    navMenu: {
      display: isMobile ? (mobileMenuOpen ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      position: isMobile ? "fixed" : "static",
      top: isMobile ? 0 : "auto",
      left: isMobile ? 0 : "auto",
      width: isMobile ? "100%" : "auto",
      height: isMobile ? "100vh" : "auto",
      background: isMobile ? "#ffffff" : "transparent",
      backdropFilter: isMobile ? "none" : "none",
      padding: isMobile ? "100px 20px 40px" : "0",
      alignItems: isMobile ? "center" : "center",
      justifyContent: isMobile ? "flex-start" : "flex-start",
      gap: isMobile ? "20px" : isTablet ? "20px" : "32px",
      zIndex: 1000,
      transition: "0.3s",
      overflowY: isMobile ? "auto" : "visible",
    },

    tabItem: {
      padding: isMobile ? "12px 30px" : "8px 4px",
      color: "#101318",
      fontSize: isMobile ? "18px" : "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderRadius: "40px",
      letterSpacing: "0.3px",
      textDecoration: "none",
      width: isMobile ? "100%" : "auto",
      textAlign: isMobile ? "center" : "left",
      borderBottom: isMobile ? "none" : "2px solid transparent",
    },

    activeTabItem: {
      color: "#12086F",
      borderBottom: !isMobile ? "2px solid #4f46e5" : "none",
      background: isMobile ? "#12086F" : "transparent",
    },

    /* ---------- HERO (Responsive) ---------- */
    hero: {
      minHeight: "100vh",
      height: "auto",
      backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
      position: "relative",
      padding: isMobile ? "120px 20px 80px" : "0",
      marginTop: 0,
    },

    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "900px",
      padding: isMobile ? "20px 16px" : "0 20px",
      animation: "fadeInUp 1s ease",
    },

    heroBadge: {
      display: "inline-block",
      padding: isMobile ? "6px 16px" : "8px 24px",
      background: "rgba(56, 189, 248, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "28px",
      color: "#fff",
    },

    heroTitle: {
      fontSize: isMobile ? "36px" : isTablet ? "58px" : "clamp(44px, 8vw, 78px)",
      fontWeight: "600",
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
      fontSize: isMobile ? "16px" : "clamp(16px, 4vw, 20px)",
      opacity: 0.95,
      marginBottom: "40px",
      lineHeight: "1.7",
      color: "rgba(255,255,255,0.92)",
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: isMobile ? "0 12px" : "0",
    },

    heroBtn: {
      padding: isMobile ? "14px 36px" : "16px 48px",
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "60px",
      cursor: "pointer",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 12px 28px rgba(56, 189, 248, 0.35)",
    },

    /* ---------- COMMON SECTION (Responsive) ---------- */
    section: {
      padding: isMobile ? "70px 5%" : isTablet ? "90px 6%" : "110px 8%",
      position: "relative",
    },

    sectionLight: {
      backgroundColor: "#ffffff",
    },

    sectionDark: {
      backgroundColor: "#fafcff",
    },

    sectionTitle: {
      fontSize: isMobile ? "30px" : isTablet ? "40px" : "clamp(34px, 5vw, 48px)",
      textAlign: "center",
      marginBottom: "18px",
      color: "#0f172a",
      fontWeight: "600",
      letterSpacing: "-0.02em",
    },

    sectionSubtitle: {
      textAlign: "center",
      color: "#64748b",
      fontSize: isMobile ? "16px" : "18px",
      maxWidth: "680px",
      margin: "0 auto 50px",
      lineHeight: "1.6",
      padding: isMobile ? "0 20px" : "0",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(3, 1fr)",
      gap: isMobile ? "28px" : "36px",
      marginTop: "30px",
    },

    /* ---------- SERVICE CARDS (Responsive) ---------- */
    card: {
      color: "#12086F",
      backgroundColor: "#ffffff",
      padding: isMobile ? "36px 24px" : "44px 32px",
      borderRadius: "32px",
      boxShadow: "0 20px 35px -12px rgba(0,0,0,0.05)",
      textAlign: "center",
      transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
      cursor: "pointer",
      border: "1px solid #f0f2f5",
      position: "relative",
    },

    cardIcon: {
      fontSize: isMobile ? "44px" : "52px",
      marginBottom: "24px",
      display: "inline-block",
      padding: isMobile ? "16px" : "20px",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 100%)",
      borderRadius: "28px",
      color: "#0284c7",
    },

    cardTitle: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: "600",
      marginBottom: "14px",
      color: "#12086F",
    },

    cardDesc: {
      color: "#121922",
      lineHeight: "1.65",
      fontSize: isMobile ? "15px" : "16px",
    },

    /* ---------- FEATURES SECTION ---------- */
    featuresSection: {
      padding: isMobile ? "70px 5%" : "90px 8%",
      backgroundColor: colors.gray[50],
    },
    featuresContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '28px' : '32px',
      marginTop: '48px',
    },
    featureCard: {
      padding: isMobile ? '28px 20px' : '36px 28px',
      backgroundColor: 'white',
      borderRadius: '28px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: `1px solid ${colors.gray[200]}`,
      cursor: 'pointer',
    },
    featureIcon: {
      width: isMobile ? '72px' : '84px',
      height: isMobile ? '72px' : '84px',
      margin: '0 auto 20px',
      backgroundColor: colors.primary[50],
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '36px' : '40px',
      color: colors.primary[600],
    },
    featureTitle: {
      fontSize: isMobile ? '19px' : '21px',
      fontWeight: '600',
      color: "#12086F",
      marginBottom: '12px',
    },
    featureDesc: {
      fontSize: isMobile ? '14px' : '15px',
      color: "#111117",
      lineHeight: '1.6',
    },

    /* ---------- CONSULTATION TABS ---------- */
    consultationTabsSection: {
      padding: isMobile ? "70px 5%" : "90px 8%",
    },

    consultationTabsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "12px" : "24px",
      marginBottom: "56px",
      flexWrap: "wrap",
    },

    consultationTab: {
      padding: isMobile ? "12px 28px" : "14px 42px",
      background: "transparent",
      border: "none",
      borderRadius: "60px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      color: "#4b5563",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
      border: "1px solid #e2e8f0",
    },

    activeConsultationTab: {
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      color: "#fff",
      border: "none",
      boxShadow: "0 12px 24px rgba(56, 189, 248, 0.25)",
    },

    consultationTabContent: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: isMobile ? "36px 24px" : "52px 48px",
      backgroundColor: "#ffffff",
      borderRadius: "48px",
      boxShadow: "0 24px 48px -16px rgba(0,0,0,0.08)",
      animation: "fadeIn 0.5s ease",
    },

    consultationTabTitle: {
      fontSize: isMobile ? "26px" : "32px",
      fontWeight: "600",
      marginBottom: "32px",
      color: "#12086F",
      textAlign: "center",
    },

    consultationTabGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: isMobile ? "24px" : "36px",
      marginTop: "24px",
    },

    consultationTabCard: {
      padding: isMobile ? "28px 20px" : "36px 28px",
      backgroundColor: "#fef9f5",
      borderRadius: "32px",
      textAlign: "center",
      transition: "0.3s",
      border: "1px solid #f1f5f9",
    },

    consultationTabIcon: {
      fontSize: isMobile ? "40px" : "48px",
      marginBottom: "20px",
    },

    consultationTabCardTitle: {
      fontSize: isMobile ? "20px" : "22px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#12086F",
    },

    consultationTabCardDesc: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#475569",
      lineHeight: "1.6",
    },

    /* ---------- CONSULTATION CTA ---------- */
    consultationSection: {
      padding: isMobile ? '70px 5%' : '90px 8%',
      color: 'Black',
      textAlign: 'center',
    },
    consultationTitle: {
      fontSize: isMobile ? '30px' : '42px',
      fontWeight: '600',
      marginBottom: '20px',
      letterSpacing: '-0.02em',
      color: "#12086F",

    },
    consultationHighlight: {
      color: colors.secondary[500],
    },
    consultationSubtitle: {
      fontSize: isMobile ? '16px' : '18px',
      opacity: 0.9,
      maxWidth: '720px',
      margin: '0 auto 36px',
      lineHeight: '1.6',
    },
    consultationBtn: {
      padding: isMobile ? '14px 32px' : '16px 40px',
      backgroundColor: 'white',
      color: colors.primary[700],
      border: 'none',
      borderRadius: '60px',
      fontSize: isMobile ? '15px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
    },

    /* ---------- ACHIEVEMENTS ---------- */
    achievementSection: {
      padding: isMobile ? "80px 5%" : isTablet ? "100px 6%" : "120px 8%",
      background: "linear-gradient(135deg, #223e78 0%, #223e78 100%)",
      color: "#fff",
      textAlign: "center",
    },

    achievementGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(4, 1fr)",
      gap: isMobile ? "32px" : "44px",
      marginTop: isMobile ? "28px" : "44px",
    },

    achievementCard: {
      background: "rgba(230,230,230,0.03)",
      backdropFilter: "blur(10px)",
      padding: isMobile ? "36px 20px" : "48px 28px",
      borderRadius: "36px",
      border: "1px solid rgba(255,255,255,0.08)",
      transition: "0.4s",
    },

    achievementNumber: {
      fontSize: isMobile ? "44px" : "56px",
      background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "600",
      marginBottom: "12px",
      lineHeight: "1",
    },

    achievementLabel: {
      fontSize: isMobile ? "16px" : "18px",
      color: "rgba(255,255,255,0.8)",
      fontWeight: "600",
    },

    /* ---------- PROJECTS ---------- */
    projectGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(3, 1fr)",
      gap: isMobile ? "24px" : "32px",
      marginTop: "48px",
    },

    projectCard: {
      position: "relative",
      borderRadius: "32px",
      overflow: "hidden",
      boxShadow: "0 20px 35px -12px rgba(0,0,0,0.1)",
      cursor: "pointer",
      aspectRatio: "1/1",
    },

    projectImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },

    projectOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: isMobile ? "28px" : "36px",
      opacity: isMobile ? 1 : 0,
      transition: "opacity 0.4s ease",
    },

    projectTitle: {
      color: "#fff",
      fontSize: isMobile ? "22px" : "26px",
      fontWeight: "600",
      marginBottom: "8px",
      transform: isMobile ? "translateY(0)" : "translateY(20px)",
      transition: "transform 0.4s ease",
    },

    projectCategory: {
      color: "rgba(255,255,255,0.8)",
      fontSize: isMobile ? "12px" : "14px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      transform: isMobile ? "translateY(0)" : "translateY(20px)",
      transition: "transform 0.4s ease 0.05s",
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: isMobile ? "70px 5%" : "100px 8%",
      background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
      textAlign: "center",
      color: "#0f172a",
    },

    ctaTitle: {
      fontSize: isMobile ? "30px" : isTablet ? "44px" : "clamp(36px, 5vw, 52px)",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#12086F",
    },

    ctaBtn: {
      padding: isMobile ? "16px 36px" : "18px 52px",
      background: "#0f172a",
      color: "#fff",
      border: "none",
      borderRadius: "60px",
      fontSize: isMobile ? "16px" : "17px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
      boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
      marginTop: "32px",
    },

    /* ---------- FOOTER (Light Gray with Black Text) ---------- */
    footer: {
      background: "#e9ebec",
      color: "#161212",
      padding: isMobile ? "48px 5% 32px" : "70px 8% 40px",
      borderTop: "1px solid rgba(0,0,0,0.05)",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(4, 1fr)",
      gap: isMobile ? "40px" : "48px",
      marginBottom: "48px",
      maxWidth: "1280px",
      margin: "0 auto 48px",
      textAlign: isMobile ? "center" : "left",
    },

    footerLogo: {
      fontSize: isMobile ? "26px" : "32px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#0f172a",
      letterSpacing: "-0.5px",
      background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    },

    footerHeading: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      marginBottom: "24px",
      color: "#111315",
      letterSpacing: "-0.3px",
      position: "relative",
    },

    footerLink: {
      color: "#111315",
      textDecoration: "none",
      display: "block",
      marginBottom: "12px",
      transition: "all 0.3s ease",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "500",
      cursor: "pointer",
    },

    footerText: {
      color: "#111315",
      lineHeight: "1.7",
      fontSize: isMobile ? "15px" : "16px",
      marginBottom: "20px",
    },

    footerContactItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
      color: "#111315",
      fontSize: isMobile ? "14px" : "15px",
      justifyContent: isMobile ? "center" : "flex-start",
    },

    footerContactIcon: {
      fontSize: "18px",
      color: "#161212",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "32px",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      color: "#111315",
      maxWidth: "1280px",
      margin: "0 auto",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "500",
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
      desc: 'Professional advice from experienced architects who understand your vision.'
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
      {/* NAVBAR WITH WHITE BACKGROUND */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          ARCTITECH
        </div>

        <button 
          style={styles.menuButton}
          className="menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div style={styles.menuIcon}></div>
          <div style={styles.menuIcon2}></div>
          <div style={styles.menuIcon3}></div>
        </button>

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
          >
            Explore Projects
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{...styles.section, ...styles.sectionLight}}>
        <h2 style={{ ...styles.sectionTitle, color: "#12086F" }}>Our Services</h2>
        <p style={styles.sectionSubtitle}>
          Comprehensive architectural solutions tailored to your vision
        </p>
        <div style={styles.grid}>
          {[
            { icon: "🏛️", title: "Residential Design", desc: "Modern homes crafted with luxury, comfort, and sustainable design principles." },
            { icon: "🏢", title: "Commercial Spaces", desc: "Innovative office and retail architecture that inspires productivity." },
            { icon: "🪑", title: "Interior Design", desc: "Elegant interiors with perfect space planning and premium finishes." },
            { icon: "🌿", title: "Sustainable Design", desc: "Eco-friendly solutions that reduce environmental impact." },
            { icon: "🏗️", title: "Urban Planning", desc: "Comprehensive master planning for communities and cities." },
            { icon: "🏛️", title: "Heritage Conservation", desc: "Expert restoration and preservation of historical buildings." },
          ].map((service, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => navigate("/services")}
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
          <h2 style={{...styles.sectionTitle ,color:"#12086F"}}>Why Choose Our Consultation</h2>
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
                    transform: 'translateY(-6px)',
                    boxShadow: '0 24px 40px rgba(99,102,241,0.12)'
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

      {/* CONSULTATION TABS SECTION */}
      <section style={styles.consultationTabsSection}>
        <h2 style={{...styles.sectionTitle,color: "#12086F"}}>Consultation Experience</h2>
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
        >
          Schedule Consultation
        </button>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={styles.achievementSection}>
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
            <div key={index} style={styles.achievementCard}>
              <h3 style={styles.achievementNumber}>
                <Counter target={item.target} duration={2000} />
                {item.suffix}
              </h3>
              <p style={styles.achievementLabel}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{...styles.section, ...styles.sectionDark}}>
        <h2 style={{...styles.sectionTitle,color: "#12086F"}}>Recent Projects</h2>
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
        <p style={{ fontSize: isMobile ? "16px" : "18px", opacity: 0.85, maxWidth: "600px", margin: "0 auto", padding: isMobile ? "0 20px" : "0" }}>
          Let's bring your vision to life. Schedule a consultation with our team.
        </p>
        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/appointment")}
        >
          Book a Consultation
        </button>
      </section>

      {/* FOOTER - Light Gray with Black Text */}
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
}