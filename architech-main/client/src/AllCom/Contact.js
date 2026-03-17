import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    projectType: "",
    subject: "",
    message: "",
    otherSubject: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [showOtherSubject, setShowOtherSubject] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const headerBgImage = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      // Hide scroll hint after scrolling
      if (window.scrollY > 100) {
        setShowScrollHint(false);
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

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const tabItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "services", label: "Services", path: "/services" },
    { id: "projects", label: "Projects", path: "/project" },
    { id: "appointment", label: "Appointment", path: "/appointment" },
  ];

  const projectTypeOptions = [
    { value: "", label: "Select Project Type", disabled: true },
    { value: "residential", label: "Residential Design" },
    { value: "commercial", label: "Commercial Space" },
    { value: "interior", label: "Interior Design" },
    { value: "sustainable", label: "Sustainable Design" },
    { value: "urban", label: "Urban Planning" },
    { value: "heritage", label: "Heritage Conservation" },
    { value: "landscape", label: "Landscape Architecture" },
    { value: "renovation", label: "Renovation / Restoration" },
    { value: "consultation", label: "Consultation Only" },
    { value: "other", label: "Other Project Type" }
  ];

  const subjectOptions = [
    { value: "", label: "Select a subject", disabled: true },
    { value: "project-inquiry", label: "Project Inquiry" },
    { value: "consultation", label: "Book a Consultation" },
    { value: "quotation", label: "Request a Quotation" },
    { value: "existing-project", label: "Existing Project Update" },
    { value: "collaboration", label: "Business Collaboration" },
    { value: "career", label: "Career Opportunities" },
    { value: "feedback", label: "Feedback / Suggestion" },
    { value: "complaint", label: "Complaint / Issue" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "media", label: "Media / Press Inquiry" },
    { value: "other", label: "Other Subject" }
  ];

  // Validation functions
  const validateName = (name) => {
    if (!name || name.trim() === "") return "Full name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(name)) {
      return "Name cannot contain special characters like < > [ ] { } ( ) @ # $ % ^ & *";
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, dots, hyphens, and apostrophes";
    }
    if (name.trim().split(" ").length < 2) return "Please enter your full name (first and last)";
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return {
        isValid: false,
        message: "Email address is required"
      };
    }

    const specialCharsRegex = /[<>[\]{}()#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(email)) {
      return {
        isValid: false,
        message: "Email cannot contain special characters like < > [ ] { } ( ) # $ % ^ & *"
      };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address format (e.g., name@domain.com)"
      };
    }

    if (email.includes(' ')) {
      return {
        isValid: false,
        message: "Email address cannot contain spaces"
      };
    }

    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) {
      return {
        isValid: false,
        message: "Email must contain exactly one @ symbol"
      };
    }

    const [localPart, domain] = email.split('@');

    if (localPart.length < 1) {
      return {
        isValid: false,
        message: "Email must have text before @"
      };
    }

    if (localPart.length > 64) {
      return {
        isValid: false,
        message: "Local part (before @) is too long (max 64 characters)"
      };
    }

    if (!domain) {
      return {
        isValid: false,
        message: "Email must have a domain after @"
      };
    }

    if (!email.toLowerCase().endsWith('.com')) {
      return {
        isValid: false,
        message: "Only .com email addresses are accepted. Please use a Gmail, Yahoo, or other .com email."
      };
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];

    if (tld.toLowerCase() !== 'com') {
      return {
        isValid: false,
        message: "Email must end with .com (e.g., name@gmail.com)"
      };
    }

    if (domainParts.length !== 2) {
      return {
        isValid: false,
        message: "Invalid domain format. Use provider.com format (e.g., gmail.com, yahoo.com)"
      };
    }

    if (domainParts[0].length < 2) {
      return {
        isValid: false,
        message: "Domain name must be at least 2 characters"
      };
    }

    if (domain.includes('..')) {
      return {
        isValid: false,
        message: "Domain cannot contain consecutive dots"
      };
    }

    const blockedDomains = [
      'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
      '10minutemail.com', 'yopmail.com'
    ];

    if (blockedDomains.includes(domain.toLowerCase())) {
      return {
        isValid: false,
        message: "Please use a permanent email address"
      };
    }

    return {
      isValid: true,
      message: "Valid .com email address"
    };
  };

  const validatePhone = (phone) => {
    if (!phone) return "Mobile number is required";
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(phone)) {
      return "Phone number cannot contain special characters";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid Indian mobile number (10 digits starting with 6,7,8, or 9)";
    }
    if (/^(\d)\1{9}$/.test(phone)) {
      return "Please enter a valid mobile number (cannot be all same digits)";
    }
    return "";
  };

  const validateBudget = (budget) => {
    if (!budget) return "Project budget is required";
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(budget)) {
      return "Budget cannot contain special characters";
    }
    const budgetNum = parseInt(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) return "Please enter a valid budget amount";
    if (budgetNum < 100000) return "Minimum budget is ₹1,00,000";
    if (budgetNum > 100000000) return "Maximum budget is ₹10,00,00,000";
    return "";
  };

  const validateProjectType = (projectType) => {
    if (!projectType) return "Please select a project type";
    return "";
  };

  const validateSubject = (subject, otherSubject) => {
    if (!subject) return "Please select a subject";
    if (subject === "other") {
      if (!otherSubject || otherSubject.trim() === "") {
        return "Please specify your subject";
      }
      const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
      if (specialCharsRegex.test(otherSubject)) {
        return "Subject cannot contain special characters like < > [ ] { } ( ) @ # $ % ^ & *";
      }
      if (otherSubject.length < 5) {
        return "Subject must be at least 5 characters";
      }
      if (otherSubject.length > 100) {
        return "Subject must be less than 100 characters";
      }
    }
    return "";
  };

  const validateMessage = (message) => {
    if (!message || message.trim() === "") return "Message is required";
    const maliciousPatterns = /<script|javascript:|onerror=|onclick=|onload=/i;
    if (maliciousPatterns.test(message)) {
      return "Message contains invalid content";
    }
    if (message.length < 20) return "Message must be at least 20 characters";
    if (message.length > 1000) return "Message must be less than 1000 characters";
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount < 5) return "Please provide more details (at least 5 words)";
    return "";
  };

  const formatEmail = (email) => {
    return email.toLowerCase().replace(/\s/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/g;

    if (name === "name") {
      const filteredValue = value.replace(/[<>[\]{}()@#$%^&*+=|\\/?!`~]/g, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });
    }
    else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: digitsOnly.slice(0, 10)
      });
    }
    else if (name === "budget") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: digitsOnly.slice(0, 9)
      });
    }
    else if (name === "email") {
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });
      const validation = validateEmail(filteredValue);
      if (!validation.isValid && filteredValue.length > 0) {
        setErrors({
          ...errors,
          email: validation.message
        });
      } else if (validation.isValid) {
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
    }
    else if (name === "subject") {
      setFormData({
        ...formData,
        [name]: value,
        otherSubject: ""
      });
      setShowOtherSubject(value === "other");
      if (errors.subject) {
        setErrors({
          ...errors,
          subject: ""
        });
      }
    }
    else if (name === "otherSubject") {
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });
      if (errors.otherSubject) {
        setErrors({
          ...errors,
          otherSubject: ""
        });
      }
    }
    else {
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });
    }

    if (errors[name] && name !== "email") {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      const formattedEmail = formatEmail(formData.email);
      const validation = validateEmail(formattedEmail);
      if (!validation.isValid) {
        setErrors({
          ...errors,
          email: validation.message
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
      setFormData({
        ...formData,
        email: formattedEmail
      });
    }
  };

  const validateForm = () => {
    const emailValidation = validateEmail(formData.email);
    const newErrors = {
      name: validateName(formData.name),
      email: emailValidation.isValid ? "" : emailValidation.message,
      phone: validatePhone(formData.phone),
      budget: validateBudget(formData.budget),
      projectType: validateProjectType(formData.projectType),
      subject: validateSubject(formData.subject, formData.otherSubject),
      message: validateMessage(formData.message)
    };

    if (formData.subject === "other" && formData.otherSubject) {
      const otherSubjectError = validateSubject("other", formData.otherSubject);
      if (otherSubjectError) {
        newErrors.otherSubject = otherSubjectError;
      }
    }

    Object.keys(newErrors).forEach(key => {
      if (newErrors[key] === "") delete newErrors[key];
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailToSubmit = formData.email;
    if (formData.email) {
      emailToSubmit = formatEmail(formData.email);
    }

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector('.form-box');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const finalSubject = formData.subject === "other"
      ? formData.otherSubject
      : subjectOptions.find(opt => opt.value === formData.subject)?.label || formData.subject;

    const finalProjectType = projectTypeOptions.find(
      opt => opt.value === formData.projectType
    )?.label || formData.projectType;

    console.log("Form submitted:", {
      name: formData.name,
      email: emailToSubmit,
      phone: formData.phone,
      budget: formData.budget,
      projectType: finalProjectType,
      subject: finalSubject,
      message: formData.message
    });

    try {
      await axios.post('http://localhost:5000/api/contact', {
        name: formData.name,
        email: emailToSubmit,
        phone: formData.phone,
        budget: formData.budget,
        projectType: finalProjectType,
        subject: finalSubject,
        message: formData.message,
        otherSubject: formData.otherSubject
      });

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        projectType: "",
        subject: "",
        message: "",
        otherSubject: ""
      });
      setShowOtherSubject(false);
      setErrors({});

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setErrors({ submit: "Failed to submit contact query. Please try again." });
    }
  };

  const formatIndianCurrency = (amount) => {
    if (!amount) return "";
    const num = parseInt(amount);
    if (isNaN(num)) return "";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const getEmailSuggestion = (email) => {
    if (!email || email.includes('@') || email.length < 3) return null;
    const commonProviders = [
      { domain: 'gmail.com', label: 'Gmail' },
      { domain: 'yahoo.com', label: 'Yahoo' },
      { domain: 'hotmail.com', label: 'Hotmail' },
      { domain: 'outlook.com', label: 'Outlook' },
      { domain: 'rediffmail.com', label: 'Rediffmail' },
      { domain: 'icloud.com', label: 'iCloud' },
      { domain: 'protonmail.com', label: 'ProtonMail' },
      { domain: 'aol.com', label: 'AOL' },
      { domain: 'zoho.com', label: 'Zoho' }
    ];
    return commonProviders.map(provider => ({
      full: `${email}@${provider.domain}`,
      label: `${email}@${provider.domain}`
    }));
  };

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  const getEmailHint = (email) => {
    if (!email || email.length === 0) return null;
    if (email.includes('@')) {
      if (!email.toLowerCase().endsWith('.com')) {
        return "Email must end with .com";
      }
    }
    return null;
  };

  const scrollToForm = () => {
    document.querySelector('.form-box')?.scrollIntoView({ behavior: 'smooth' });
  };

  const styles = {
    page: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#1e293b",
      scrollBehavior: "smooth",
      overflowX: "hidden",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },

    /* ---------- HEADER (Same as Home/About page) ---------- */
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
      transform: mobileMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
    },

    menuBar2: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
      opacity: mobileMenuOpen ? 0 : 1,
    },

    menuBar3: {
      width: "24px",
      height: "2px",
      background: "#fff",
      transition: "all 0.3s ease",
      transform: mobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
    },

    /* ---------- NAVIGATION MENU (Same as Home/About page) ---------- */
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
      cursor: "pointer",
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
      transform: mobileMenuOpen ? "translateY(0)" : "translateY(-150%)",
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

    /* ---------- HERO SECTION (Reduced size) ---------- */
    heroSection: {
      position: "relative",
      height: isMobile ? "40vh" : "40vh",
      minHeight: isMobile ? "400px" : "450px",
      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.7) 100%), url(${headerBgImage})`,
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
      padding: isMobile ? "0 20px" : "0 20px",
      animation: "fadeInUp 1s ease",
      marginTop: isMobile ? "-20px" : "0",
    },

    heroBadge: {
      display: "inline-block",
      padding: isMobile ? "5px 14px" : "6px 16px",
      background: "rgba(56, 189, 248, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      borderRadius: "50px",
      fontSize: isMobile ? "11px" : "12px",
      fontWeight: "600",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: isMobile ? "15px" : "18px",
      color: "#fff",
    },

    heroTitle: {
      fontSize: isMobile ? "clamp(28px, 7vw, 38px)" : "clamp(36px, 5vw, 48px)",
      fontWeight: "800",
      marginBottom: isMobile ? "12px" : "15px",
      lineHeight: "1.2",
      textShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },

    heroTitleHighlight: {
      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    heroSubtitle: {
      fontSize: isMobile ? "14px" : "clamp(14px, 2.5vw, 16px)",
      opacity: 0.95,
      lineHeight: isMobile ? "1.5" : "1.6",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "600px",
      margin: "0 auto 20px",
      padding: isMobile ? "0 10px" : "0",
    },

    heroButton: {
      display: "inline-block",
      padding: isMobile ? "10px 24px" : "12px 32px",
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 15px 30px rgba(56, 189, 248, 0.3)",
      textDecoration: "none",
    },

    scrollHint: {
      position: "absolute",
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#fff",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      opacity: showScrollHint ? 1 : 0,
      transition: "opacity 0.3s ease",
    },

    scrollArrow: {
      width: "22px",
      height: "34px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderRadius: "20px",
      position: "relative",
    },

    scrollDot: {
      width: "4px",
      height: "6px",
      background: "#fff",
      borderRadius: "2px",
      position: "absolute",
      top: "5px",
      left: "50%",
      transform: "translateX(-50%)",
      animation: "scrollDown 2s infinite",
    },

    /* ---------- MAIN CONTENT ---------- */
    mainContent: {
      flex: 1,
      width: "100%",
    },

    container: {
      maxWidth: "1100px",
      margin: isMobile ? "20px auto 0" : "-30px auto 0",
      padding: isMobile ? "0 12px" : "0 20px",
      position: "relative",
      zIndex: 10,
    },

    contactSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "30px",
      marginBottom: "40px",
    },

    contactInfo: {
      flex: isMobile ? "1" : "0.35",
      backgroundColor: "#ffffff",
      padding: isMobile ? "20px" : "25px",
      borderRadius: "16px",
      boxShadow: "0 15px 30px rgba(0,0,0,0.05)",
      border: "1px solid #e2e8f0",
      height: "fit-content",
      position: isMobile ? "relative" : "sticky",
      top: isMobile ? "auto" : "90px",
    },

    contactForm: {
      flex: isMobile ? "1" : "0.65",
      backgroundColor: "#ffffff",
      padding: isMobile ? "20px" : "30px",
      borderRadius: "16px",
      boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
      border: "1px solid #e2e8f0",
      width: "100%",
      maxWidth: isMobile ? "100%" : "650px",
      margin: "0 auto",
    },

    infoItem: {
      marginBottom: "20px",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: "12px",
      borderRadius: "10px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "1px solid transparent",
    },

    infoIcon: {
      fontSize: "1.5rem",
      color: "#0284c7",
      minWidth: "40px",
      width: "40px",
      height: "40px",
      background: "#e0f2fe",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    infoContent: {
      flex: 1,
    },

    infoTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "4px",
      color: "#0f172a",
    },

    infoText: {
      color: "#475569",
      lineHeight: 1.6,
      fontSize: isMobile ? "13px" : "13px",
    },

    formGroup: {
      marginBottom: "16px",
    },

    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#0f172a",
      fontSize: "0.9rem",
    },

    required: {
      color: "#ef4444",
      marginLeft: "4px",
    },

    input: {
      width: "100%",
      padding: "10px 14px",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      height: "42px",
    },

    textarea: {
      width: "100%",
      padding: "10px 14px",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      minHeight: "100px",
      maxHeight: "180px",
      resize: "vertical",
      outline: "none",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
    },

    select: {
      width: "100%",
      padding: "10px 14px",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      fontSize: "0.95rem",
      backgroundColor: "#f8fafc",
      outline: "none",
      cursor: "pointer",
      color: "#0f172a",
      height: "42px",
    },

    errorText: {
      color: "#ef4444",
      fontSize: "0.8rem",
      marginTop: "4px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },

    hintText: {
      color: "#10b981",
      fontSize: "0.8rem",
      marginTop: "4px",
      fontStyle: "italic",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },

    wordCount: {
      textAlign: "right",
      fontSize: "0.8rem",
      color: "#64748b",
      marginTop: "4px",
    },

    budgetDisplay: {
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#e0f2fe",
      borderRadius: "8px",
      fontSize: "0.95rem",
      fontWeight: "600",
      color: "#0284c7",
      border: "1px solid #38bdf8",
    },

    submitButton: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "20px",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
      height: "48px",
    },

    submitButtonDisabled: {
      background: "#94a3b8",
      cursor: "not-allowed",
      boxShadow: "none",
    },

    successMessage: {
      padding: "14px",
      backgroundColor: "#dcfce7",
      color: "#166534",
      border: "1px solid #86efac",
      borderRadius: "10px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "0.95rem",
      fontWeight: "500",
    },

    errorMessage: {
      padding: "14px",
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      border: "1px solid #fecaca",
      borderRadius: "10px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "0.95rem",
      fontWeight: "500",
    },

    emailSuggestions: {
      marginTop: "8px",
      padding: "12px",
      backgroundColor: "#f8fafc",
      borderRadius: "10px",
      border: "2px solid #e2e8f0",
    },

    suggestionItem: {
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      marginBottom: "4px",
      color: "#0f172a",
      border: "1px solid transparent",
      fontSize: "13px",
    },

    mapContainer: {
      marginTop: "40px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0",
      height: isMobile ? "250px" : "300px",
    },

    mapIframe: {
      width: "100%",
      height: "100%",
      border: 0,
      display: "block",
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#0f172a",
      color: "#fff",
      padding: isMobile ? "30px 20px 15px" : "40px 8% 20px",
      marginTop: "50px",
      width: "100%",
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
      gap: isMobile ? "25px" : "40px",
      marginBottom: "25px",
      textAlign: isMobile ? "center" : "left",
      maxWidth: "1100px",
      margin: "0 auto 25px",
    },

    footerLogo: {
      fontSize: isMobile ? "22px" : "24px",
      fontWeight: "800",
      marginBottom: "12px",
      background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    footerLink: {
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      display: "block",
      marginBottom: "8px",
      transition: "0.3s",
      fontSize: isMobile ? "13px" : "13px",
    },

    footerBottom: {
      textAlign: "center",
      paddingTop: "15px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      fontSize: isMobile ? "11px" : "12px",
      maxWidth: "1100px",
      margin: "0 auto",
    },
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      email: suggestion.full
    });
    const validation = validateEmail(suggestion.full);
    if (!validation.isValid) {
      setErrors({
        ...errors,
        email: validation.message
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const emailSuggestions = getEmailSuggestion(
    formData.email && !formData.email.includes('@') ? formData.email : null
  );

  return (
    <div style={styles.page}>
      {/* HEADER - Same as Home/About page with blue highlight on active tab */}
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div style={mobileMenuOpen ? styles.menuBar1 : styles.menuBar}></div>
          <div style={mobileMenuOpen ? styles.menuBar2 : styles.menuBar}></div>
          <div style={mobileMenuOpen ? styles.menuBar3 : styles.menuBar}></div>
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
              color: location.pathname === item.path ? "#38bdf8" : "#fff",
              fontWeight: location.pathname === item.path ? "600" : "500",
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* HERO SECTION - Reduced size */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Get In Touch</span>
          <h1 style={styles.heroTitle}>
            Let's Discuss Your <span style={styles.heroTitleHighlight}>Vision</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Have a project in mind? We'd love to hear about it. Our team of expert architects is ready to bring your vision to life.
          </p>
          <button onClick={scrollToForm} style={styles.heroButton}>
            Start Your Project
          </button>
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

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.contactSection}>
            {/* Contact Information */}
            <div style={styles.contactInfo}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📍</div>
                <div style={styles.infoContent}>
                  <h3 style={styles.infoTitle}>Visit Our Studio</h3>
                  <p style={styles.infoText}>
                    123 Architecture Avenue<br />
                    Design District<br />
                    Mumbai - 400001
                  </p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📞</div>
                <div style={styles.infoContent}>
                  <h3 style={styles.infoTitle}>Call Us</h3>
                  <p style={styles.infoText}>
                    <strong>Sales:</strong> +91 98765 43210<br />
                    <strong>Support:</strong> +91 22 1234 5678
                  </p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>✉️</div>
                <div style={styles.infoContent}>
                  <h3 style={styles.infoTitle}>Email Us</h3>
                  <p style={styles.infoText}>
                    <strong>General:</strong> info@architectstudio.com<br />
                    <strong>Projects:</strong> projects@architectstudio.com
                  </p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>🕒</div>
                <div style={styles.infoContent}>
                  <h3 style={styles.infoTitle}>Working Hours</h3>
                  <p style={styles.infoText}>
                    <strong>Mon-Fri:</strong> 9:00 AM - 7:00 PM<br />
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form - Reduced size */}
            <div style={styles.contactForm} className="form-box">
              {submitStatus === "success" && (
                <div style={styles.successMessage}>
                  🎉 Thank you! We'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === "error" && (
                <div style={styles.errorMessage}>
                  ❌ {errors.submit || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Full Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    style={{
                      ...styles.input,
                      borderColor: errors.name ? "#ef4444" : "#e2e8f0"
                    }}
                  />
                  {errors.name && <div style={styles.errorText}>⚠️ {errors.name}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Email <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="name@gmail.com"
                    style={{
                      ...styles.input,
                      borderColor: errors.email ? "#ef4444" : "#e2e8f0"
                    }}
                  />
                  {errors.email && <div style={styles.errorText}>⚠️ {errors.email}</div>}
                  
                  {emailSuggestions && (
                    <div style={styles.emailSuggestions}>
                      <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "8px", fontWeight: "500" }}>
                        Did you mean:
                      </div>
                      {emailSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          style={{
                            ...styles.suggestionItem,
                            backgroundColor: "#fff"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#e2e8f0";
                            e.currentTarget.style.borderColor = "#38bdf8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.borderColor = "transparent";
                          }}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Mobile <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength="10"
                    style={{
                      ...styles.input,
                      borderColor: errors.phone ? "#ef4444" : "#e2e8f0"
                    }}
                  />
                  {errors.phone && <div style={styles.errorText}>⚠️ {errors.phone}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Budget (₹) <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="500000"
                    maxLength="9"
                    style={{
                      ...styles.input,
                      borderColor: errors.budget ? "#ef4444" : "#e2e8f0"
                    }}
                  />
                  {errors.budget && <div style={styles.errorText}>⚠️ {errors.budget}</div>}
                  {formData.budget && !errors.budget && (
                    <div style={styles.budgetDisplay}>
                      💰 {formatIndianCurrency(formData.budget)}
                    </div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Project Type <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={{
                      ...styles.select,
                      borderColor: errors.projectType ? "#ef4444" : "#e2e8f0"
                    }}
                  >
                    {projectTypeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && <div style={styles.errorText}>⚠️ {errors.projectType}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Subject <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      ...styles.select,
                      borderColor: errors.subject ? "#ef4444" : "#e2e8f0"
                    }}
                  >
                    {subjectOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <div style={styles.errorText}>⚠️ {errors.subject}</div>}
                </div>

                {showOtherSubject && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Specify Subject <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="otherSubject"
                      value={formData.otherSubject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                      style={{
                        ...styles.input,
                        borderColor: errors.otherSubject ? "#ef4444" : "#e2e8f0"
                      }}
                    />
                    {errors.otherSubject && <div style={styles.errorText}>⚠️ {errors.otherSubject}</div>}
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Message <span style={styles.required}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Project details..."
                    style={{
                      ...styles.textarea,
                      borderColor: errors.message ? "#ef4444" : "#e2e8f0"
                    }}
                  />
                  {errors.message && <div style={styles.errorText}>⚠️ {errors.message}</div>}
                  {formData.message && (
                    <div style={styles.wordCount}>
                      {formData.message.length}/1000 chars
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.submitButton,
                    ...(isSubmitting ? styles.submitButtonDisabled : {})
                  }}
                >
                  {isSubmitting ? "📨 Sending..." : "📨 Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div style={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.555961638111!2d72.8237!3d18.975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5c0b3c6b3f%3A0x6b5b5b5b5b5b5b5b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              style={styles.mapIframe}
              allowFullScreen=""
              loading="lazy"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6", fontSize: isMobile ? "13px" : "13px", maxWidth: "220px" }}>
              Creating timeless architecture that inspires.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "12px" : "15px", fontSize: isMobile ? "16px" : "16px" }}>Quick Links</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/about" style={styles.footerLink}>About</Link>
            <Link to="/services" style={styles.footerLink}>Services</Link>
            <Link to="/project" style={styles.footerLink}>Projects</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "12px" : "15px", fontSize: isMobile ? "16px" : "16px" }}>Legal</h4>
            <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/TearmsCondition" style={styles.footerLink}>Terms</Link>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: isMobile ? "12px" : "15px", fontSize: isMobile ? "16px" : "16px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "6px", fontSize: isMobile ? "13px" : "13px" }}>
              contact@arctitech.com
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "13px" : "13px" }}>+1 (555) 123-4567</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
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

          @keyframes scrollDown {
            0% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            75% {
              opacity: 0;
              transform: translateX(-50%) translateY(12px);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) translateY(12px);
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

          a:hover {
            color: #38bdf8 !important;
          }

          .menu-btn {
            display: ${isMobile ? 'flex' : 'none'};
          }

          input:focus, select:focus, textarea:focus {
            border-color: #38bdf8 !important;
            box-shadow: 0 0 0 2px rgba(56,189,248,0.1);
            background-color: #fff !important;
          }

          button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(56, 189, 248, 0.4) !important;
          }

          .suggestion-item:hover {
            background-color: #e2e8f0 !important;
            border-color: #38bdf8 !important;
          }

          div[style*="infoItem"]:hover {
            background-color: #f8fafc;
            border-color: #38bdf8 !important;
          }

          .footer-link:hover {
            color: white !important;
            padding-left: 3px;
          }
        `}
      </style>
    </div>
  );
};

export default Contact;