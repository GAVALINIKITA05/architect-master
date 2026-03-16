import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "../bg1.jpg";
import bg2 from "../bg2.jpg";
import bg4 from "../bg4.jpg";

const Project = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Background image URL for header
  const headerBgImage = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // AUTO CLOSE MOBILE MENU WHEN SCROLLING
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

  const projects = [
    {
      id: 1,
      title: "1BHK Apartment",
      desc: "Modern compact living space with elegant design. Perfect for urban professionals seeking comfort in minimal square footage.",
      image: bg1,
      path: "/1bhk",
      category: "residential",
      features: ["Smart Storage", "Energy Efficient", "Modern"],
    },
    {
      id: 2,
      title: "Luxury Apartment",
      desc: "Premium interiors with spacious layout. Experience unparalleled elegance with high-end finishes and panoramic views.",
      image: bg2,
      path: "/Luxury",
      category: "luxury",
      features: ["Smart Home", "Premium Finishes", "Panoramic Views"],
    },
    {
      id: 3,
      title: "Office Apartment",
      desc: "Modern Workspace with Comfort & Productivity. Designed for the future of work with flexible layouts and collaborative zones.",
      image: bg4,
      path: "/Office",
      category: "commercial",
      features: ["Open Plan", "Green Space", "Tech Ready"],
    },
    {
      id: 4,
      title: "Beach Apartment",
      desc: "Coastal Living with Serenity & Style. Wake up to ocean breezes in this thoughtfully designed seaside sanctuary.",
      image: bg2,
      path: "/Beach",
      category: "residential",
      features: ["Ocean View", "Outdoor Living", "Natural Light"],
    },
    {
      id: 5,
      title: "Penthouse Suite",
      desc: "Elevated living at its finest. This stunning penthouse offers unmatched luxury and breathtaking city skyline views.",
      image: bg4,
      path: "/Penthouse",
      category: "luxury",
      features: ["Private Terrace", "Sky Lounge", "Concierge"],
    },
    {
      id: 6,
      title: "Creative Studio",
      desc: "Innovative workspace designed for creative professionals. Flexible areas that inspire collaboration and imagination.",
      image: bg1,
      path: "/Studio",
      category: "commercial",
      features: ["Flexible Layout", "Natural Light", "Acoustic Design"],
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "luxury", label: "Luxury" },
    { id: "commercial", label: "Commercial" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const handleClick = (path) => {
    navigate(path);
  };

  const styles = {
    page: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      scrollBehavior: "smooth",
      color: "#1e293b",
      overflowX: "hidden",
      backgroundColor: "#ffffff", // Changed to white background
      minHeight: "100vh",
    },

    /* ---------- NAVBAR (Fixed Header) ---------- */
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
      background: "#fff",
      margin: "3px 0",
      transition: "all 0.3s ease",
    },

    menuBar1: {
      width: "24px",
      height: "2px",
      background: "#fff",
      margin: "3px 0",
      transition: "all 0.3s ease",
      transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
    },

    menuBar2: {
      width: "24px",
      height: "2px",
      background: "#fff",
      margin: "3px 0",
      transition: "all 0.3s ease",
      opacity: mobileMenuOpen ? 0 : 1,
    },

    menuBar3: {
      width: "24px",
      height: "2px",
      background: "#fff",
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

    /* ---------- HERO SECTION (with background image) ---------- */
    heroSection: {
      position: "relative",
      minHeight: isMobile ? "80vh" : "90vh",
      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(${headerBgImage})`,
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
      animation: "fadeInUp 1s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },

    heroBadge: {
      display: "inline-block",
      padding: isMobile ? "6px 16px" : "8px 20px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: isMobile ? "20px" : "24px",
      color: "#fff",
    },

    heroTitle: {
      fontSize: isMobile ? "32px" : isTablet ? "48px" : "clamp(36px, 8vw, 64px)",
      fontWeight: "800",
      marginBottom: isMobile ? "15px" : "20px",
      lineHeight: "1.2",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #fff 0%, #e0e7ff 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    heroSubtitle: {
      fontSize: isMobile ? "15px" : "clamp(16px, 4vw, 18px)",
      opacity: 0.95,
      lineHeight: "1.8",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "700px",
      margin: "0 auto",
      padding: isMobile ? "0 15px" : "0",
    },

    statsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "24px" : "48px",
      marginTop: isMobile ? "32px" : "48px",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },

    statItem: {
      textAlign: "center",
    },

    statNumber: {
      fontSize: isMobile ? "28px" : "32px",
      fontWeight: "700",
      color: "#fff",
    },

    statLabel: {
      fontSize: isMobile ? "12px" : "14px",
      opacity: 0.8,
      color: "#fff",
    },

    /* ---------- FILTER BAR ---------- */
    filterSection: {
      padding: isMobile ? "40px 5% 20px" : "48px 8% 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    filterContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "8px" : "12px",
      flexWrap: "wrap",
    },

    filterButton: (isActive) => ({
      padding: isMobile ? "10px 20px" : "12px 28px",
      border: isActive ? "none" : "1px solid #e2e8f0",
      background: isActive ? "#0284c7" : "#ffffff",
      color: isActive ? "#ffffff" : "#475569",
      borderRadius: "50px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: isActive ? "0 10px 25px rgba(2, 132, 199, 0.3)" : "0 2px 4px rgba(0,0,0,0.02)",
    }),

    /* ---------- PROJECT CARDS ---------- */
    projectGrid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "1fr" 
        : isTablet 
          ? "repeat(2, 1fr)" 
          : "repeat(auto-fit, minmax(350px, 1fr))",
      gap: isMobile ? "24px" : "32px",
      padding: isMobile ? "24px 5% 60px" : "24px 8% 80px",
      maxWidth: "1400px",
      margin: "0 auto",
    },

    projectCard: (isHovered) => ({
      background: "white",
      borderRadius: isMobile ? "20px" : "24px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transform: isHovered && !isMobile ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
      position: "relative",
    }),

    imageContainer: {
      position: "relative",
      height: isMobile ? "240px" : "280px",
      overflow: "hidden",
    },

    image: (isHovered) => ({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)",
      transform: isHovered && !isMobile ? "scale(1.15)" : "scale(1)",
    }),

    imageOverlay: (isHovered) => ({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isHovered && !isMobile
        ? "linear-gradient(to top, rgba(2,132,199,0.9), rgba(56,189,248,0.7))"
        : "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
      transition: "all 0.4s ease",
      opacity: isHovered && !isMobile ? 1 : 0.7,
    }),

    categoryTag: {
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "6px 14px",
      background: "rgba(255,255,255,0.95)",
      color: "#0284c7",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 2,
    },

    cardContent: {
      padding: isMobile ? "20px" : "28px",
      position: "relative",
    },

    cardTitle: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#1e293b",
    },

    cardDesc: (isHovered) => ({
      color: "#64748b",
      lineHeight: "1.6",
      marginBottom: "20px",
      fontSize: isMobile ? "14px" : "15px",
      transition: "all 0.4s ease",
      opacity: isHovered && !isMobile ? 1 : 0.8,
    }),

    featuresContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "20px",
    },

    featureTag: {
      padding: "4px 12px",
      background: "#f1f5f9",
      borderRadius: "50px",
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: "600",
      color: "#475569",
      transition: "all 0.3s ease",
    },

    projectLink: (isHovered) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: isHovered && !isMobile ? "#0284c7" : "#94a3b8",
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "15px",
      transition: "all 0.3s ease",
      borderTop: "1px solid #e2e8f0",
      paddingTop: isMobile ? "16px" : "20px",
      marginTop: "4px",
    }),

    arrowIcon: (isHovered) => ({
      width: "20px",
      height: "20px",
      transition: "transform 0.3s ease",
      transform: isHovered && !isMobile ? "translateX(5px)" : "translateX(0)",
    }),

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: isMobile ? "60px 5%" : "80px 8%",
      background: "linear-gradient(135deg, #77797d 0%, #767778 100%)",
      textAlign: "center",
      color: "#fff",
    },

    ctaContainer: {
      maxWidth: "600px",
      margin: "0 auto",
    },

    ctaTitle: {
      fontSize: isMobile ? "28px" : "36px",
      fontWeight: "700",
      marginBottom: "16px",
      color: "white",
      lineHeight: "1.3",
    },

    ctaSubtitle: {
      fontSize: isMobile ? "15px" : "18px",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "24px",
      lineHeight: "1.6",
      padding: isMobile ? "0 15px" : "0",
    },

    ctaButton: {
      padding: isMobile ? "14px 32px" : "16px 48px",
      background: "white",
      color: "#0284c7",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#0f172a",
      color: "#fff",
      padding: isMobile ? "40px 5% 20px" : "60px 8% 30px",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "40px" : "60px",
      marginBottom: "40px",
      maxWidth: "1200px",
      margin: "0 auto 40px",
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
      fontSize: isMobile ? "14px" : "16px",
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      maxWidth: "1200px",
      margin: "0 auto",
      fontSize: isMobile ? "13px" : "15px",
    },
  };

  return (
    <div style={styles.page}>
      {/* FIXED HEADER WITH NAVIGATION */}
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

      {/* HERO SECTION (with background image) */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Our Portfolio</span>
          <h1 style={styles.heroTitle}>
            Architecture That
            <br />
            <span style={styles.heroTitleHighlight}>Inspires Change</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Innovative designs crafted with creativity and precision, 
            transforming spaces into extraordinary experiences
          </p>
          
          {/* STATS */}
          <div style={styles.statsContainer}>
            {[
              { number: "50+", label: "Projects" },
              { number: "25+", label: "Awards" },
              { number: "100+", label: "Clients" },
            ].map((stat, index) => (
              <div key={index} style={styles.statItem}>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={styles.filterSection}>
        <div style={styles.filterContainer}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={styles.filterButton(filter === cat.id)}
              onMouseEnter={(e) => {
                if (filter !== cat.id && !isMobile) {
                  e.target.style.background = "#f8fafc";
                  e.target.style.borderColor = "#94a3b8";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== cat.id && !isMobile) {
                  e.target.style.background = "#ffffff";
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div style={styles.projectGrid}>
        {filteredProjects.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.path)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={styles.projectCard(hovered === item.id)}
          >
            {/* IMAGE CONTAINER */}
            <div style={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.title}
                style={styles.image(hovered === item.id)}
              />
              
              {/* OVERLAY */}
              <div style={styles.imageOverlay(hovered === item.id)} />
              
              {/* CATEGORY TAG */}
              <span style={styles.categoryTag}>
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              
              <p style={styles.cardDesc(hovered === item.id)}>
                {item.desc}
              </p>
              
              {/* FEATURES */}
              <div style={styles.featuresContainer}>
                {item.features.map((feature, idx) => (
                  <span key={idx} style={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* VIEW PROJECT LINK */}
              <div style={styles.projectLink(hovered === item.id)}>
                <span>View Project</span>
                <svg
                  style={styles.arrowIcon(hovered === item.id)}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA SECTION */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
          <p style={styles.ctaSubtitle}>
            Let's bring your vision to life. Contact our team to discuss your ideas.
          </p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 35px rgba(0,0,0,0.2)";
                e.target.style.background = "#f8fafc";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                e.target.style.background = "#fff";
              }
            }}
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.7", fontSize: isMobile ? "14px" : "16px" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Quick Links</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
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
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "10px", fontSize: isMobile ? "14px" : "16px" }}>
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

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            overflow-x: hidden;
            padding-top: ${isMobile ? '70px' : '80px'};
            background-color: #ffffff;
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
        `}
      </style>
    </div>
  );
};

export default Project;