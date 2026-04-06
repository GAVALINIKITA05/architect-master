import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Background image URL for header
  const headerBgImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

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

  // Navigation items
  const tabItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "services", label: "Services", path: "/services" },
    { id: "projects", label: "Projects", path: "/project" },
    { id: "appointment", label: "Appointment", path: "/appointment" },
  ];

  const services = [
    {
      id: 1,
      title: "Architectural Design",
      desc: "Innovative building designs tailored to client needs with modern aesthetics and sustainable principles.",
      icon: "🏛️",
      category: "design",
      features: ["Concept Development", "Schematic Design", "Construction Documents", "Permitting"],
      color: "#12086F"
    },
    {
      id: 2,
      title: "Interior Design",
      desc: "Creative and functional interior solutions for residential and commercial spaces with premium finishes.",
      icon: "🪑",
      category: "design",
      features: ["Space Planning", "Material Selection", "Furniture Design", "Lighting Design"],
      color: "#12086F"
    },
    {
      id: 3,
      title: "Urban Planning",
      desc: "Sustainable and strategic planning for urban development projects that enhance community living.",
      icon: "🏙️",
      category: "planning",
      features: ["Master Planning", "Zoning Analysis", "Public Spaces", "Infrastructure"],
      color: "#12086F"
    },
    {
      id: 4,
      title: "3D Visualization",
      desc: "High-quality 3D models and walkthroughs to visualize projects before construction begins.",
      icon: "🎨",
      category: "visualization",
      features: ["3D Modeling", "Virtual Tours", "Photorealistic Rendering", "Animation"],
      color: "#12086F"
    },
    {
      id: 5,
      title: "Project Management",
      desc: "Complete supervision and execution of projects with quality assurance and timeline adherence.",
      icon: "📋",
      category: "management",
      features: ["Budget Control", "Timeline Management", "Quality Assurance", "Vendor Coordination"],
      color: "#12086F"
    },
    {
      id: 6,
      title: "Renovation & Remodeling",
      desc: "Transforming old spaces into modern and functional environments with innovative solutions.",
      icon: "🔨",
      category: "renovation",
      features: ["Structural Changes", "Modern Upgrades", "Historical Restoration", "Space Optimization"],
      color: "#12086F"
    },
    {
      id: 7,
      title: "Sustainable Design",
      desc: "Eco-friendly architectural solutions that reduce environmental impact and energy consumption.",
      icon: "🌿",
      category: "design",
      features: ["Green Building", "Energy Efficiency", "LEED Certification", "Renewable Materials"],
      color: "#12086F"
    },
    {
      id: 8,
      title: "Landscape Architecture",
      desc: "Harmonious outdoor spaces that blend nature with architectural elements.",
      icon: "🌳",
      category: "planning",
      features: ["Garden Design", "Hardscaping", "Outdoor Living", "Native Planting"],
      color: "#12086F"
    },
    {
      id: 9,
      title: "Consultation Services",
      desc: "Expert architectural advice and feasibility studies for your project vision.",
      icon: "💡",
      category: "consulting",
      features: ["Feasibility Studies", "Code Compliance", "Cost Estimation", "Site Analysis"],
      color: "#12086F"
    }
  ];

  const categories = [
    { id: "all", label: "All Services", icon: "🔍" },
    { id: "design", label: "Design", icon: "🎯" },
    { id: "planning", label: "Planning", icon: "📐" },
    { id: "visualization", label: "Visualization", icon: "🎨" },
    { id: "management", label: "Management", icon: "⚙️" },
    { id: "renovation", label: "Renovation", icon: "🏠" },
    { id: "consulting", label: "Consulting", icon: "💬" }
  ];

  const filteredServices = activeFilter === "all" 
    ? services 
    : services.filter(service => service.category === activeFilter);

  const styles = {
    page: {
      fontFamily: "Open Sans",
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      scrollBehavior: "smooth",
      overflowX: "hidden"
    },

    /* ---------- NAVBAR (Fixed Header - WHITE BACKGROUND) ---------- */
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
        ? "rgba(255, 255, 255, 0.98)" // White background with high opacity
        : "rgba(255, 255, 255, 0.95)", // White background
      backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
      boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.1)" : "0 4px 15px rgba(0,0,0,0.05)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(0,0,0,0.08)",
    },

    logo: {
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: "600",
      color: "#141517", // Dark color for white background
      letterSpacing: "1px",
      cursor: "pointer",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "0.3s",
      zIndex: 1001,
    },

    /* ---------- MOBILE MENU BUTTON (Three Lines) ---------- */
    menuButton: {
      display: isMobile ? "flex" : "none",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 1001,
      padding: "10px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "44px",
      height: "44px",
    },

    menuBar: {
      width: "24px",
      height: "2px",
      background: "#12086F", // Dark color for white background
      margin: "3px 0",
      transition: "all 0.3s ease",
    },

    menuBar1: {
      width: "24px",
      height: "2px",
      background: "#0f172a",
      margin: "3px 0",
      transition: "all 0.3s ease",
      transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
    },

    menuBar2: {
      width: "24px",
      height: "2px",
      background: "#0f172a",
      margin: "3px 0",
      transition: "all 0.3s ease",
      opacity: mobileMenuOpen ? 0 : 1,
    },

    menuBar3: {
      width: "24px",
      height: "2px",
      background: "#0f172a",
      margin: "3px 0",
      transition: "all 0.3s ease",
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
      background: isMobile ? "rgba(255, 255, 255, 0.98)" : "transparent", // White background for mobile menu
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
      color: "rgba(15, 23, 42, 0.7)", // Dark color for white background
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
      background: "#12086F",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
    },

    /* ---------- HERO SECTION (with background image) ---------- */
    heroSection: {
      position: "relative",
      minHeight: isMobile ? "70vh" : "80vh",
      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 100%), url(${headerBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: isMobile ? "scroll" : "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: isMobile ? "100px 5% 60px" : "120px 8% 80px",
    },

    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
      animation: "fadeInUp 1s ease"
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
      color: "#fff"
    },

    heroTitle: {
      fontSize: isMobile ? "32px" : isTablet ? "48px" : "clamp(36px, 8vw, 56px)",
      fontWeight: "600",
      marginBottom: isMobile ? "15px" : "20px",
      lineHeight: "1.2"
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    heroSubtitle: {
      fontSize: isMobile ? "15px" : "clamp(16px, 4vw, 18px)",
      opacity: 0.95,
      lineHeight: "1.8",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "700px",
      margin: "0 auto",
      padding: isMobile ? "0 15px" : "0"
    },

    /* ---------- FILTER BAR ---------- */
    filterSection: {
      padding: isMobile ? "40px 5% 20px" : "60px 8% 20px",
      backgroundColor: "#ffffff",
      position: "sticky",
      top: scrolled ? (isMobile ? "60px" : "80px") : (isMobile ? "70px" : "100px"),
      zIndex: 100,
      transition: "all 0.3s ease"
    },

    filterContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: isMobile ? "8px" : "12px",
      maxWidth: "1200px",
      margin: "0 auto"
    },

    filterButton: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "4px" : "8px",
      padding: isMobile ? "8px 16px" : "12px 24px",
      border: "1px solid #e2e8f0",
      borderRadius: "50px",
      background: "#ffffff",
      color: "#475569",
      fontSize: isMobile ? "13px" : "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      whiteSpace: "nowrap"
    },

    activeFilterButton: {
      background: "#12086F",
      color: "#ffffff",
      border: "none",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)"
    },

    /* ---------- SERVICES GRID ---------- */
    servicesSection: {
      padding: isMobile ? "40px 5% 60px" : "40px 8% 100px",
      backgroundColor: "#ffffff"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(380px, 1fr))",
      gap: isMobile ? "30px" : "40px",
      maxWidth: "1400px",
      margin: "0 auto"
    },

    card: {
      backgroundColor: "#ffffff",
      borderRadius: isMobile ? "24px" : "30px",
      padding: isMobile ? "32px 24px" : "40px 32px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      cursor: "pointer",
      border: "1px solid rgba(0,0,0,0.02)",
      position: "relative",
      overflow: "hidden"
    },

    cardAccent: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "6px",
      background: `linear-gradient(90deg, ${services[0].color}, ${services[1].color})`,
      transition: "height 0.3s ease"
    },

    cardIcon: {
      fontSize: isMobile ? "40px" : "48px",
      marginBottom: isMobile ? "20px" : "24px",
      display: "inline-block",
      padding: isMobile ? "12px" : "16px",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      borderRadius: "20px",
      transition: "all 0.4s ease"
    },

    cardTitle: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#12086F",
      lineHeight: "1.3"
    },

    cardDesc: {
      fontSize: isMobile ? "15px" : "16px",
      color: "#64748b",
      lineHeight: "1.7",
      marginBottom: "20px"
    },

    featuresList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "20px"
    },

    featureTag: {
      padding: isMobile ? "4px 12px" : "6px 16px",
      background: "#f8fafc",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: "500",
      color: "#475569",
      border: "1px solid #e2e8f0",
      transition: "all 0.3s ease"
    },

    cardFooter: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: isMobile ? "24px" : "32px",
      paddingTop: isMobile ? "20px" : "24px",
      borderTop: "1px solid #e2e8f0"
    },

    /* ---------- PROCESS SECTION ---------- */
    processSection: {
      padding: isMobile ? "60px 5%" : isTablet ? "80px 6%" : "100px 8%",
      backgroundColor: "#f8fafc"
    },

    processTitle: {
      fontSize: isMobile ? "28px" : isTablet ? "36px" : "clamp(32px, 5vw, 40px)",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "16px",
      color: "#12086F"
    },

    processSubtitle: {
      fontSize: isMobile ? "16px" : "18px",
      color: "#171719",
      textAlign: "center",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.7",
      padding: isMobile ? "0 15px" : "0"
    },

    processGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(220px, 1fr))",
      gap: isMobile ? "20px" : "30px",
      maxWidth: "1200px",
      margin: "0 auto"
    },

    processCard: {
      textAlign: "center",
      padding: isMobile ? "30px 20px" : "40px 24px",
      background: "#ffffff",
      borderRadius: isMobile ? "24px" : "30px",
      boxShadow: "0 15px 30px rgba(0,0,0,0.02)",
      transition: "0.4s",
      position: "relative"
    },

    processNumber: {
      fontSize: isMobile ? "40px" : "48px",
      fontWeight: "800",
      color: "#e2e8f0",
      position: "absolute",
      top: isMobile ? "10px" : "20px",
      right: isMobile ? "20px" : "30px",
      lineHeight: "1"
    },

    processIcon: {
      fontSize: isMobile ? "36px" : "40px",
      marginBottom: "20px",
      position: "relative",
      zIndex: 2
    },

    processStepTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#12087F"
    },

    processStepDesc: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#64748b",
      lineHeight: "1.6"
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: isMobile ? "60px 5%" : isTablet ? "80px 6%" : "100px 8%",
      // background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "#12086F",
      textAlign: "center"
    },

    ctaTitle: {
      fontSize: isMobile ? "28px" : isTablet ? "36px" : "clamp(32px, 5vw, 44px)",
      fontWeight: "600",
      marginBottom: "16px",
      lineHeight: "1.3"
    },

    ctaBtn: {
      padding: isMobile ? "14px 32px" : "18px 48px",
      background: "#bcbbbb",
      color: "#262424",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 15px 30px rgba(56, 189, 248, 0.3)",
      marginTop: isMobile ? "20px" : "30px"
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#e9ebec",
      color: "#0f0f0f",
      padding: isMobile ? "40px 5% 20px" : "60px 8% 30px"
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
      maxWidth: "1200px",
      margin: "0 auto 40px",
      textAlign: isMobile ? "center" : "left"
    },

    footerLogo: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "800",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #424040 0%, #49494b 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    footerLink: {
      color: "rgba(12, 11, 11, 0.7)",
      textDecoration: "none",
      display: "block",
      marginBottom: isMobile ? "8px" : "12px",
      transition: "0.3s",
      fontSize: isMobile ? "14px" : "16px"
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(10, 9, 9, 0.6)",
      maxWidth: "1200px",
      margin: "0 auto",
      fontSize: isMobile ? "13px" : "15px"
    }
  };

  const processSteps = [
    {
      step: "01",
      icon: "💬",
      title: "Consultation",
      desc: "We discuss your vision, requirements, and project goals."
    },
    {
      step: "02",
      icon: "📐",
      title: "Concept Design",
      desc: "Creating initial designs and 3D visualizations."
    },
    {
      step: "03",
      icon: "📋",
      title: "Planning",
      desc: "Detailed planning, permits, and material selection."
    },
    {
      step: "04",
      icon: "🏗️",
      title: "Execution",
      desc: "Construction and project management with quality control."
    },
    {
      step: "05",
      icon: "✨",
      title: "Handover",
      desc: "Final delivery and post-completion support."
    }
  ];

  return (
    <div style={styles.page}>
      {/* FIXED HEADER WITH NAVIGATION - WHITE BACKGROUND */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          ARCTITECH
        </div>

        {/* Mobile Menu Button (Three Lines) */}
        <button 
          style={styles.menuButton}
          className="menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div style={mobileMenuOpen ? styles.menuBar1 : styles.menuBar}></div>
          <div style={mobileMenuOpen ? styles.menuBar2 : styles.menuBar}></div>
          <div style={mobileMenuOpen ? styles.menuBar3 : styles.menuBar}></div>
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
                  e.target.style.background = "rgba(15, 23, 42, 0.05)";
                  e.target.style.color = "#0f172a";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && window.location.pathname !== item.path) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "rgba(15, 23, 42, 0.7)";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* HERO SECTION (with background image) */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>What We Offer</span>
          <h1 style={styles.heroTitle}>
            Comprehensive <span style={styles.heroTitleHighlight}>Architectural</span>
            <br />
            Services
          </h1>
          <p style={styles.heroSubtitle}>
            From concept to completion, we provide end-to-end architectural solutions
            tailored to your unique vision and requirements.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={styles.filterSection}>
        <div style={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              style={{
                ...styles.filterButton,
                ...(activeFilter === category.id ? styles.activeFilterButton : {})
              }}
              onClick={() => setActiveFilter(category.id)}
              onMouseEnter={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#94a3b8";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== category.id) {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }
              }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={styles.servicesSection}>
        <div style={styles.grid}>
          {filteredServices.map((service) => (
            <div
              key={service.id}
              style={styles.card}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.08)";
                  const icon = e.currentTarget.querySelector('.service-icon');
                  if (icon) icon.style.transform = "scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.03)";
                  const icon = e.currentTarget.querySelector('.service-icon');
                  if (icon) icon.style.transform = "scale(1)";
                }
              }}
            >
              <div style={{ ...styles.cardAccent, background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}></div>
              <div className="service-icon" style={styles.cardIcon}>
                {service.icon}
              </div>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardDesc}>{service.desc}</p>
              
              <div style={styles.featuresList}>
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} style={styles.featureTag}>
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span style={styles.featureTag}>+{service.features.length - 3} more</span>
                )}
              </div>

              <div style={styles.cardFooter}>
                <span style={{ color: service.color, fontWeight: "600", fontSize: isMobile ? "13px" : "14px" }}>
                  {service.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section style={styles.processSection}>
        <h2 style={styles.processTitle}>Our Process</h2>
        <p style={styles.processSubtitle}>
          A systematic approach to bring your architectural vision to life
        </p>
        <div style={styles.processGrid}>
          {processSteps.map((step, index) => (
            <div
              key={index}
              style={styles.processCard}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.02)";
                }
              }}
            >
              <div style={styles.processNumber}>{step.step}</div>
              <div style={styles.processIcon}>{step.icon}</div>
              <h3 style={styles.processStepTitle}>{step.title}</h3>
              <p style={styles.processStepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
        <p style={{ fontSize: isMobile ? "16px" : "18px", opacity: 0.95, marginBottom: isMobile ? "15px" : "20px" }}>
          Let's discuss how our services can bring your vision to life.
        </p>
        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/appointment")}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = "0 20px 40px rgba(56, 189, 248, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 15px 30px rgba(56, 189, 248, 0.3)";
            }
          }}
        >
          Schedule Consultation
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(11, 11, 11, 0.7)", lineHeight: "1.7", fontSize: isMobile ? "20px" : "18px" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
         
          <div>
            <h4 style={{ color: "#151515", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Quick Links</h4>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/project" style={styles.footerLink}>Projects</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
            <Link to="/appointment" style={styles.footerLink}>Appointment</Link>
          </div>
          <div>
            <h4 style={{ color: "#0c0b0b", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Legal</h4>
            <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/TearmsCondition" style={styles.footerLink}>Terms of Service</Link>
          </div>
          <div>
            <h4 style={{ color: "#101010", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Contact</h4>
            <p style={{ color: "rgba(28, 26, 26, 0.7)", marginBottom: "10px", fontSize: isMobile ? "14px" : "16px" }}>
              contact@arctitech.com
            </p>
            <p style={{ color: "rgba(22, 21, 21, 0.7)", fontSize: isMobile ? "14px" : "16px" }}>+91 98765 43210</p>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} ARCTITECH. All rights reserved.
        </div>
      </footer>

      
    </div>
  );
};

export default Service;