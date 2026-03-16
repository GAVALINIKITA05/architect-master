import React, { useState, useEffect } from "react";
import img1 from "../bg1.jpg";
import img2 from "../bg2.jpg";
import img3 from "../bg4.jpg";
import { useNavigate } from "react-router-dom";

const OneBHK = () => {
  const navigate = useNavigate();
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

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
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      color: "#1e293b",
      scrollBehavior: "smooth",
      overflowX: "hidden"
    },

    /* ---------- HERO SECTION ---------- */
    heroSection: {
      position: "relative",
      height: "80vh",
      minHeight: "600px",
      overflow: "hidden",
      backgroundColor: "#0f172a"
    },

    sliderContainer: {
      position: "relative",
      width: "100%",
      height: "100%"
    },

    imageWrapper: {
      position: "relative",
      width: "100%",
      height: "100%"
    },

    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)"
    },

    imageOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.4) 100%)",
      zIndex: 1
    },

    heroContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      color: "#fff",
      zIndex: 2,
      width: "80%",
      maxWidth: "800px",
      animation: "fadeInUp 1s ease"
    },

    heroBadge: {
      display: "inline-block",
      padding: "8px 20px",
      background: "rgba(56, 189, 248, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      borderRadius: "50px",
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "24px",
      color: "#fff"
    },

    heroTitle: {
      fontSize: "clamp(36px, 8vw, 56px)",
      fontWeight: "800",
      marginBottom: "20px",
      lineHeight: "1.1",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)"
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    heroSubtitle: {
      fontSize: "clamp(16px, 4vw, 18px)",
      opacity: 0.95,
      lineHeight: "1.8",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "600px",
      margin: "0 auto"
    },

    /* ---------- SLIDER CONTROLS ---------- */
    sliderControls: {
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "20px",
      zIndex: 3
    },

    sliderDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.5)",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },

    activeSliderDot: {
      width: "32px",
      borderRadius: "20px",
      background: "#38bdf8"
    },

    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.3)",
      color: "#fff",
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: 3
    },

    prevButton: { left: "30px" },
    nextButton: { right: "30px" },

    /* ---------- PROJECT INFO SECTION ---------- */
    infoSection: {
      padding: "100px 8%",
      backgroundColor: "#ffffff"
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto"
    },

    projectHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "60px",
      flexWrap: "wrap",
      gap: "30px"
    },

    projectTitleBox: {
      flex: 1
    },

    projectCategory: {
      display: "inline-block",
      padding: "6px 16px",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      borderRadius: "50px",
      fontSize: "13px",
      fontWeight: "600",
      color: "#0369a1",
      marginBottom: "16px",
      textTransform: "uppercase",
      letterSpacing: "1px"
    },

    projectMainTitle: {
      fontSize: "clamp(32px, 5vw, 42px)",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "16px",
      lineHeight: "1.2"
    },

    projectLocation: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#64748b",
      fontSize: "16px"
    },

    projectStats: {
      display: "flex",
      gap: "40px",
      background: "#f8fafc",
      padding: "30px 40px",
      borderRadius: "30px",
      flexWrap: "wrap"
    },

    statItem: {
      textAlign: "center"
    },

    statValue: {
      fontSize: "32px",
      fontWeight: "800",
      color: "#0284c7",
      marginBottom: "4px"
    },

    statLabel: {
      fontSize: "14px",
      color: "#64748b",
      fontWeight: "500"
    },

    /* ---------- TABS SECTION ---------- */
    tabsContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "40px",
      borderBottom: "2px solid #f1f5f9",
      paddingBottom: "16px",
      flexWrap: "wrap"
    },

    tab: {
      padding: "12px 28px",
      background: "transparent",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#64748b",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative"
    },

    activeTab: {
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      color: "#fff",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)"
    },

    tabContent: {
      animation: "fadeIn 0.5s ease"
    },

    /* ---------- OVERVIEW SECTION ---------- */
    overviewGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "40px",
      alignItems: "start"
    },

    overviewText: {
      fontSize: "17px",
      lineHeight: "1.8",
      color: "#475569"
    },

    highlightList: {
      listStyle: "none",
      padding: 0,
      marginTop: "24px"
    },

    highlightItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
      fontSize: "16px",
      color: "#334155"
    },

    highlightIcon: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      borderRadius: "8px",
      color: "#0284c7",
      fontSize: "14px"
    },

    quickInfoCard: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "40px",
      borderRadius: "30px",
      color: "#fff"
    },

    quickInfoTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "24px",
      color: "#fff"
    },

    quickInfoItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "16px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(255,255,255,0.1)"
    },

    quickInfoLabel: {
      color: "rgba(255,255,255,0.7)",
      fontSize: "15px"
    },

    quickInfoValue: {
      fontWeight: "600",
      color: "#fff"
    },

    /* ---------- FEATURES GRID ---------- */
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      marginTop: "30px"
    },

    featureCard: {
      background: "#f8fafc",
      padding: "32px",
      borderRadius: "24px",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    },

    featureIcon: {
      fontSize: "32px",
      marginBottom: "20px",
      display: "inline-block",
      padding: "12px",
      background: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.02)"
    },

    featureTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#0f172a"
    },

    featureDesc: {
      fontSize: "15px",
      color: "#64748b",
      lineHeight: "1.7"
    },

    /* ---------- AMENITIES GRID ---------- */
    amenitiesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px",
      marginTop: "30px"
    },

    amenityCard: {
      background: "#ffffff",
      padding: "24px",
      borderRadius: "20px",
      border: "1px solid #f1f5f9",
      textAlign: "center",
      transition: "all 0.3s ease"
    },

    amenityIcon: {
      fontSize: "28px",
      marginBottom: "16px"
    },

    amenityName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "8px"
    },

    amenityDesc: {
      fontSize: "13px",
      color: "#64748b"
    },

    /* ---------- SPECIFICATIONS ---------- */
    specsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px",
      marginTop: "30px"
    },

    specCard: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "24px",
      background: "#f8fafc",
      borderRadius: "20px"
    },

    specIcon: {
      width: "56px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
      borderRadius: "16px",
      fontSize: "24px",
      color: "#0284c7"
    },

    specContent: {
      flex: 1
    },

    specLabel: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "4px"
    },

    specValue: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#0f172a"
    },

    /* ---------- GALLERY SECTION ---------- */
    gallerySection: {
      padding: "80px 8%",
      backgroundColor: "#f8fafc"
    },

    galleryTitle: {
      fontSize: "32px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "16px",
      color: "#0f172a"
    },

    gallerySubtitle: {
      fontSize: "18px",
      color: "#64748b",
      textAlign: "center",
      marginBottom: "50px"
    },

    galleryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px"
    },

    galleryItem: {
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      aspectRatio: "4/3",
      cursor: "pointer"
    },

    galleryImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease"
    },

    galleryOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 100%)",
      display: "flex",
      alignItems: "flex-end",
      padding: "24px",
      opacity: 0,
      transition: "opacity 0.4s ease"
    },

    galleryCaption: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600"
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      padding: "100px 8%",
      background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
      textAlign: "center",
      color: "#fff"
    },

    ctaTitle: {
      fontSize: "clamp(32px, 5vw, 42px)",
      fontWeight: "700",
      marginBottom: "20px"
    },

    ctaBtn: {
      padding: "18px 48px",
      background: "#fff",
      color: "#0284c7",
      border: "none",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      marginTop: "40px"
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#0f172a",
      color: "#fff",
      padding: "60px 8% 30px"
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "60px",
      marginBottom: "40px",
      maxWidth: "1200px",
      margin: "0 auto 40px"
    },

    footerLogo: {
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "20px",
      background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    footerLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      display: "block",
      marginBottom: "12px",
      transition: "0.3s"
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      maxWidth: "1200px",
      margin: "0 auto"
    }
  };

  const features = [
    {
      icon: "📐",
      title: "Smart Space Planning",
      desc: "Optimized layout that maximizes every square foot without compromising comfort."
    },
    {
      icon: "☀️",
      title: "Natural Lighting",
      desc: "Large windows strategically placed for maximum daylight and ventilation."
    },
    {
      icon: "🗄️",
      title: "Modular Storage",
      desc: "Custom-built storage solutions throughout the apartment."
    },
    {
      icon: "🔊",
      title: "Sound Insulation",
      desc: "Premium acoustic insulation for peaceful living environment."
    }
  ];

  const amenities = [
    { icon: "💧", name: "24/7 Water Supply", desc: "Treated water supply" },
    { icon: "⚡", name: "Power Backup", desc: "Full home backup" },
    { icon: "🔒", name: "Security System", desc: "CCTV surveillance" },
    { icon: "🚗", name: "Parking", desc: "Reserved parking" },
    { icon: "🛗", name: "Lift Access", desc: "High-speed elevators" },
    { icon: "🛒", name: "Nearby Market", desc: "5 mins walking" },
    { icon: "🏃", name: "Gymnasium", desc: "Fully equipped" },
    { icon: "🌳", name: "Garden Area", desc: "Landscaped gardens" }
  ];

  const specifications = [
    { icon: "📏", label: "Carpet Area", value: "650 sq.ft" },
    { icon: "🛏️", label: "Bedrooms", value: "1 Master Bedroom" },
    { icon: "🚿", label: "Bathrooms", value: "1 Modern Bathroom" },
    { icon: "🍳", label: "Kitchen", value: "Modular Kitchen" },
    { icon: "🪑", label: "Living Area", value: "Spacious Living" },
    { icon: "🌅", label: "Balcony", value: "1 Balcony" }
  ];

  return (
    <div style={styles.page}>
      {/* HERO SECTION WITH SLIDER */}
      <section style={styles.heroSection}>
        <div style={styles.sliderContainer}>
          <div style={styles.imageWrapper}>
            <img 
              src={images[current]} 
              alt="1BHK Apartment" 
              style={styles.image}
            />
            <div style={styles.imageOverlay}></div>
          </div>

          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Smart Living Solution</span>
            <h1 style={styles.heroTitle}>
              <span style={styles.heroTitleHighlight}>1BHK</span> Apartment
            </h1>
            <p style={styles.heroSubtitle}>
              Thoughtfully designed compact living space that maximizes comfort,
              style, and functionality without compromising on quality.
            </p>
          </div>

          {/* Navigation Buttons */}
          <button
            style={{...styles.navButton, ...styles.prevButton}}
            onClick={prevSlide}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(56,189,248,0.3)";
              e.currentTarget.style.borderColor = "#38bdf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            ←
          </button>
          
          <button
            style={{...styles.navButton, ...styles.nextButton}}
            onClick={nextSlide}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(56,189,248,0.3)";
              e.currentTarget.style.borderColor = "#38bdf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            →
          </button>

          {/* Dots Indicator */}
          <div style={styles.sliderControls}>
            {images.map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.sliderDot,
                  ...(current === index ? styles.activeSliderDot : {})
                }}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT INFO SECTION */}
      <section style={styles.infoSection}>
        <div style={styles.container}>
          <div style={styles.projectHeader}>
            <div style={styles.projectTitleBox}>
              <span style={styles.projectCategory}>Residential Design</span>
              <h2 style={styles.projectMainTitle}>
                Modern 1BHK Apartment
              </h2>
              <div style={styles.projectLocation}>
                <span>📍</span>
                <span>Pune, Maharashtra | Completed 2025</span>
              </div>
            </div>
            
            <div style={styles.projectStats}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>650</div>
                <div style={styles.statLabel}>Sq.Ft</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>1</div>
                <div style={styles.statLabel}>Bedroom</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>1</div>
                <div style={styles.statLabel}>Bathroom</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>2025</div>
                <div style={styles.statLabel}>Completed</div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div style={styles.tabsContainer}>
            {[
              { id: "overview", label: "Overview" },
              { id: "features", label: "Features" },
              { id: "amenities", label: "Amenities" },
              { id: "specs", label: "Specifications" }
            ].map((tab) => (
              <button
                key={tab.id}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.id ? styles.activeTab : {})
                }}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = "#f1f5f9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div style={styles.tabContent}>
            {activeTab === "overview" && (
              <div style={styles.overviewGrid}>
                <div>
                  <p style={styles.overviewText}>
                    This thoughtfully designed 1BHK apartment represents the perfect 
                    blend of modern aesthetics and functional living. Every square foot 
                    has been optimized to create a space that feels open, airy, and 
                    incredibly comfortable. The layout flows seamlessly from the living 
                    area to the bedroom, while the modular kitchen maximizes efficiency 
                    without sacrificing style.
                  </p>
                  
                  <ul style={styles.highlightList}>
                    <li style={styles.highlightItem}>
                      <span style={styles.highlightIcon}>✓</span>
                      Smart storage solutions integrated throughout
                    </li>
                    <li style={styles.highlightItem}>
                      <span style={styles.highlightIcon}>✓</span>
                      Premium quality fixtures and fittings
                    </li>
                    <li style={styles.highlightItem}>
                      <span style={styles.highlightIcon}>✓</span>
                      Energy-efficient LED lighting
                    </li>
                    <li style={styles.highlightItem}>
                      <span style={styles.highlightIcon}>✓</span>
                      Vitrified tile flooring throughout
                    </li>
                    <li style={styles.highlightItem}>
                      <span style={styles.highlightIcon}>✓</span>
                      Granite countertops in kitchen
                    </li>
                  </ul>
                </div>
                
                <div style={styles.quickInfoCard}>
                  <h4 style={styles.quickInfoTitle}>Quick Information</h4>
                  <div style={styles.quickInfoItem}>
                    <span style={styles.quickInfoLabel}>Status</span>
                    <span style={styles.quickInfoValue}>Ready to Move</span>
                  </div>
                  <div style={styles.quickInfoItem}>
                    <span style={styles.quickInfoLabel}>Floor</span>
                    <span style={styles.quickInfoValue}>7th Floor</span>
                  </div>
                  <div style={styles.quickInfoItem}>
                    <span style={styles.quickInfoLabel}>Facing</span>
                    <span style={styles.quickInfoValue}>East</span>
                  </div>
                  <div style={styles.quickInfoItem}>
                    <span style={styles.quickInfoLabel}>Parking</span>
                    <span style={styles.quickInfoValue}>1 Covered</span>
                  </div>
                  <div style={styles.quickInfoItem}>
                    <span style={styles.quickInfoLabel}>Possession</span>
                    <span style={styles.quickInfoValue}>Immediate</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <div style={styles.featuresGrid}>
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      style={styles.featureCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={styles.featureIcon}>{feature.icon}</div>
                      <h4 style={styles.featureTitle}>{feature.title}</h4>
                      <p style={styles.featureDesc}>{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <div style={styles.amenitiesGrid}>
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      style={styles.amenityCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.05)";
                        e.currentTarget.style.borderColor = "#38bdf8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#f1f5f9";
                      }}
                    >
                      <div style={styles.amenityIcon}>{amenity.icon}</div>
                      <h5 style={styles.amenityName}>{amenity.name}</h5>
                      <p style={styles.amenityDesc}>{amenity.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div>
                <div style={styles.specsGrid}>
                  {specifications.map((spec, index) => (
                    <div key={index} style={styles.specCard}>
                      <div style={styles.specIcon}>{spec.icon}</div>
                      <div style={styles.specContent}>
                        <div style={styles.specLabel}>{spec.label}</div>
                        <div style={styles.specValue}>{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section style={styles.gallerySection}>
        <h3 style={styles.galleryTitle}>Project Gallery</h3>
        <p style={styles.gallerySubtitle}>
          Explore more views of this beautifully designed 1BHK apartment
        </p>
        <div style={styles.galleryGrid}>
          {images.map((img, index) => (
            <div
              key={index}
              style={styles.galleryItem}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (img) img.style.transform = "scale(1.1)";
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (img) img.style.transform = "scale(1)";
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              <img 
                src={img} 
                alt={`Gallery ${index + 1}`} 
                style={styles.galleryImage} 
              />
              <div className="gallery-overlay" style={styles.galleryOverlay}>
                <span style={styles.galleryCaption}>
                  {index === 0 ? "Living Area" : index === 1 ? "Bedroom" : "Kitchen"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Interested in This Design?</h2>
        <p style={{ fontSize: "18px", opacity: 0.95, marginBottom: "20px" }}>
          Schedule a site visit or virtual tour of this 1BHK apartment
        </p>
        <button
          style={styles.ctaBtn}
          onClick={() => navigate("/appointment")}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.05)";
            e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
          }}
        >
          Schedule a Visit →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.7" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: "24px" }}>Quick Links</h4>
            <a href="/" style={styles.footerLink}>Home</a>
            <a href="/project" style={styles.footerLink}>Projects</a>
            <a href="/services" style={styles.footerLink}>Services</a>
            <a href="/contact" style={styles.footerLink}>Contact</a>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: "24px" }}>Project Info</h4>
            <a href="/1bhk" style={styles.footerLink}>1BHK Apartment</a>
            <a href="/luxury" style={styles.footerLink}>Luxury Apartment</a>
            <a href="/office" style={styles.footerLink}>Office Space</a>
            <a href="/beach" style={styles.footerLink}>Beach Apartment</a>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: "24px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "12px" }}>
              Pune, Maharashtra
            </p>
            <p style={{ color: "rgba(255,255,255,0.7", marginBottom: "12px" }}>
              +91 98765 43210
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              projects@arctitech.com
            </p>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} 1BHK Apartment Project | Smart Living Solutions
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

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            overflow-x: hidden;
          }

          a {
            text-decoration: none;
          }

          button {
            outline: none;
            border: none;
            cursor: pointer;
          }

          .gallery-overlay {
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
};

export default OneBHK;