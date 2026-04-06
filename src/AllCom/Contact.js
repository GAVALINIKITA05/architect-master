import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
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
    otherSubject: "" // For "Other" option in subject
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [showOtherSubject, setShowOtherSubject] = useState(false);

  // Background image URL for header
  const headerBgImage = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

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

  // Project Type Options
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

  // Subject Options
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

  // ================ ENHANCED NAME VALIDATION ================
  const validateName = (name) => {
    if (!name || name.trim() === "") return "Full name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";

    // Check for special characters including < > [ ] { } ( ) etc.
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(name)) {
      return "Name cannot contain special characters like < > [ ] { } ( ) @ # $ % ^ & *";
    }

    // Only allow letters, spaces, dots, hyphens, and apostrophes
    if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, dots, hyphens, and apostrophes";
    }

    if (name.trim().split(" ").length < 2) return "Please enter your full name (first and last)";
    return "";
  };

  // ================ ENHANCED EMAIL VALIDATION - ONLY .COM ================
  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return {
        isValid: false,
        message: "Email address is required"
      };
    }

    // Check for special characters like < > [ ] in email
    const specialCharsRegex = /[<>[\]{}()#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(email)) {
      return {
        isValid: false,
        message: "Email cannot contain special characters like < > [ ] { } ( ) # $ % ^ & *"
      };
    }

    // Basic format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address format (e.g., name@domain.com)"
      };
    }

    // Check for spaces
    if (email.includes(' ')) {
      return {
        isValid: false,
        message: "Email address cannot contain spaces"
      };
    }

    // Check for multiple @ symbols
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) {
      return {
        isValid: false,
        message: "Email must contain exactly one @ symbol"
      };
    }

    // Split email into local and domain parts
    const [localPart, domain] = email.split('@');

    // Validate local part (before @)
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

    // Validate domain part (after @)
    if (!domain) {
      return {
        isValid: false,
        message: "Email must have a domain after @"
      };
    }

    // Check if email ends with .com (case insensitive)
    if (!email.toLowerCase().endsWith('.com')) {
      return {
        isValid: false,
        message: "Only .com email addresses are accepted. Please use a Gmail, Yahoo, or other .com email."
      };
    }

    // Check if domain is exactly .com (not .co.in, .org, etc.)
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];

    if (tld.toLowerCase() !== 'com') {
      return {
        isValid: false,
        message: "Email must end with .com (e.g., name@gmail.com)"
      };
    }

    // Check for multiple dots in domain (should be exactly one for .com)
    if (domainParts.length !== 2) {
      return {
        isValid: false,
        message: "Invalid domain format. Use provider.com format (e.g., gmail.com, yahoo.com)"
      };
    }

    // Check if domain part before .com is valid (at least 2 characters)
    if (domainParts[0].length < 2) {
      return {
        isValid: false,
        message: "Domain name must be at least 2 characters"
      };
    }

    // Check for consecutive dots in domain
    if (domain.includes('..')) {
      return {
        isValid: false,
        message: "Domain cannot contain consecutive dots"
      };
    }

    // Check for common disposable/temporary email domains
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

    // All validations passed
    return {
      isValid: true,
      message: "Valid .com email address"
    };
  };
  // ================ END ENHANCED EMAIL VALIDATION ================

  // ================ ENHANCED PHONE VALIDATION ================
  const validatePhone = (phone) => {
    if (!phone) return "Mobile number is required";

    // Check for special characters
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(phone)) {
      return "Phone number cannot contain special characters";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid Indian mobile number (10 digits starting with 6,7,8, or 9)";
    }

    // Check for repeated digits (like 7777777777)
    if (/^(\d)\1{9}$/.test(phone)) {
      return "Please enter a valid mobile number (cannot be all same digits)";
    }

    return "";
  };
  // ================ END ENHANCED PHONE VALIDATION ================

  const validateBudget = (budget) => {
    if (!budget) return "Project budget is required";

    // Check for special characters
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

      // Check for special characters in other subject
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

    // Check for malicious content in message
    const maliciousPatterns = /<script|javascript:|onerror=|onclick=|onload=/i;
    if (maliciousPatterns.test(message)) {
      return "Message contains invalid content";
    }

    if (message.length < 20) return "Message must be at least 20 characters";
    if (message.length > 1000) return "Message must be less than 1000 characters";

    // Check for minimum words (optional)
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount < 5) return "Please provide more details (at least 5 words)";

    return "";
  };

  // Format email
  const formatEmail = (email) => {
    return email.toLowerCase().replace(/\s/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter out special characters for all fields
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/g;

    if (name === "name") {
      // For name, allow letters, spaces, dots, hyphens, apostrophes
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
        [name]: digitsOnly.slice(0, 10) // Limit to 10 digits
      });
    }
    else if (name === "budget") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: digitsOnly.slice(0, 9) // Limit to 9 digits (max 10 crores)
      });
    }
    else if (name === "email") {
      // Remove special characters from email input
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });

      // Real-time validation
      const validation = validateEmail(filteredValue);
      if (!validation.isValid && filteredValue.length > 0) {
        setErrors({
          ...errors,
          email: validation.message
        });
      } else if (validation.isValid) {
        // Clear email error if valid
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
    }
    else if (name === "subject") {
      setFormData({
        ...formData,
        [name]: value,
        otherSubject: "" // Reset other subject when changing
      });
      setShowOtherSubject(value === "other");

      // Clear subject error
      if (errors.subject) {
        setErrors({
          ...errors,
          subject: ""
        });
      }
    }
    else if (name === "otherSubject") {
      // Remove special characters from other subject
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });

      // Clear other subject error
      if (errors.otherSubject) {
        setErrors({
          ...errors,
          otherSubject: ""
        });
      }
    }
    else {
      // For message and other fields, remove special characters
      const filteredValue = value.replace(specialCharsRegex, '');
      setFormData({
        ...formData,
        [name]: filteredValue
      });
    }

    // Clear error for this field when user starts typing
    if (errors[name] && name !== "email") {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      // Format email (lowercase, no spaces)
      const formattedEmail = formatEmail(formData.email);

      // Validate the formatted email
      const validation = validateEmail(formattedEmail);

      if (!validation.isValid) {
        setErrors({
          ...errors,
          email: validation.message
        });
      } else {
        // Clear any existing email error
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }

      // Update with formatted email
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

    // Add otherSubject error if needed
    if (formData.subject === "other" && formData.otherSubject) {
      const otherSubjectError = validateSubject("other", formData.otherSubject);
      if (otherSubjectError) {
        newErrors.otherSubject = otherSubjectError;
      }
    }

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key] === "") delete newErrors[key];
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format email before submission
    let emailToSubmit = formData.email;
    if (formData.email) {
      emailToSubmit = formatEmail(formData.email);
    }

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector('.form-box');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      return;
    }

    setIsSubmitting(true);

    // Prepare final subject value
    const finalSubject = formData.subject === "other"
      ? formData.otherSubject
      : subjectOptions.find(opt => opt.value === formData.subject)?.label || formData.subject;

    // Prepare final project type
    const finalProjectType = projectTypeOptions.find(
      opt => opt.value === formData.projectType
    )?.label || formData.projectType;

    // Log form data (replace with actual API call)
    console.log("Form submitted:", {
      name: formData.name,
      email: emailToSubmit,
      phone: formData.phone,
      budget: formData.budget,
      projectType: finalProjectType,
      subject: finalSubject,
      message: formData.message
    });

    // Simulate form submission
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

  // Format budget in Indian currency
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

  // ================ ENHANCED EMAIL SUGGESTIONS ================
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
  // ================ END ENHANCED EMAIL SUGGESTIONS ================

  // Get word count for message
  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Get email hint for .com requirement
  const getEmailHint = (email) => {
    if (!email || email.length === 0) return null;

    if (email.includes('@')) {
      if (!email.toLowerCase().endsWith('.com')) {
        return "Email must end with .com";
      }
    }
    return null;
  };

  // Fixed styles - corrected the function syntax
  const styles = {
    page: {
      fontFamily: "Open Sans",
      color: "#12086F",
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
      color: "#12086F", // Dark color for white background
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
      background: "#12086F",
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
      background: "linear-gradient(135deg, #12086F 0%, #12086F 100%)",
      color: "#4caeeb",
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
      maxWidth: "800px",
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
      maxWidth: "600px",
      margin: "0 auto",
      padding: isMobile ? "0 15px" : "0"
    },

    /* ---------- CONTACT SECTION ---------- */
    contactSection: {
      padding: isMobile ? "60px 5%" : isTablet ? "80px 6%" : "100px 8%",
      backgroundColor: "#ffffff"
    },

    container: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1.2fr",
      gap: isMobile ? "40px" : isTablet ? "50px" : "60px",
      maxWidth: "1200px",
      margin: "0 auto"
    },

    /* ---------- CONTACT INFO ---------- */
    infoWrapper: {
      animation: "fadeInLeft 1s ease"
    },

    infoBadge: {
      display: "inline-block",
      padding: "6px 16px",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      borderRadius: "50px",
      fontSize: isMobile ? "12px" : "13px",
      fontWeight: "600",
      color: "#12086F",
      marginBottom: isMobile ? "15px" : "20px",
      textTransform: "uppercase",
      letterSpacing: "1px"
    },

    infoTitle: {
      fontSize: isMobile ? "26px" : isTablet ? "32px" : "clamp(28px, 5vw, 36px)",
      fontWeight: "600",
      marginBottom: isMobile ? "16px" : "24px",
      color: "#12086F",
      lineHeight: "1.2"
    },

    infoText: {
      fontSize: isMobile ? "15px" : "16px",
      lineHeight: "1.8",
      color: "#475569",
      marginBottom: isMobile ? "30px" : "40px"
    },

    contactCards: {
      display: "grid",
      gap: isMobile ? "16px" : "24px",
      marginBottom: isMobile ? "30px" : "40px"
    },

    contactCard: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "15px" : "20px",
      padding: isMobile ? "20px" : "24px",
      background: "#f8fafc",
      borderRadius: "20px",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },

    contactIcon: {
      width: isMobile ? "48px" : "56px",
      height: isMobile ? "48px" : "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      borderRadius: "16px",
      color: "#fff",
      fontSize: isMobile ? "20px" : "24px"
    },

    contactDetails: {
      flex: 1
    },

    contactLabel: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#64748b",
      marginBottom: "4px",
      textTransform: "uppercase",
      letterSpacing: "1px"
    },

    contactValue: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "600",
      color: "#0f172a"
    },

    socialSection: {
      marginTop: isMobile ? "30px" : "40px",
      textAlign: isMobile ? "center" : "left"
    },

    socialTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "600",
      color: "#12086F",
      marginBottom: isMobile ? "15px" : "20px"
    },

    socialLinks: {
      display: "flex",
      gap: isMobile ? "12px" : "16px",
      justifyContent: isMobile ? "center" : "flex-start"
    },

    socialLink: {
      width: isMobile ? "44px" : "48px",
      height: isMobile ? "44px" : "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f1f5f9",
      borderRadius: "12px",
      color: "#475569",
      fontSize: isMobile ? "18px" : "20px",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },

    /* ---------- CONTACT FORM ---------- */
    formWrapper: {
      animation: "fadeInRight 1s ease"
    },

    formBox: {
      background: "#ffffff",
      padding: isMobile ? "30px 20px" : isTablet ? "40px" : "48px",
      borderRadius: isMobile ? "30px" : "40px",
      boxShadow: "0 30px 60px rgba(0,0,0,0.03)",
      border: "1px solid #f1f5f9"
    },

    formTitle: {
      fontSize: isMobile ? "24px" : isTablet ? "26px" : "28px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#12086F",
      textAlign: isMobile ? "center" : "left"
    },

    formSubtitle: {
      fontSize: isMobile ? "14px" : "16px",
      color: "#64748b",
      marginBottom: isMobile ? "24px" : "32px",
      lineHeight: "1.6",
      textAlign: isMobile ? "center" : "left"
    },

    inputGroup: {
      marginBottom: isMobile ? "20px" : "24px",
      position: "relative"
    },

    label: {
      display: "block",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "600",
      color: "#334155",
      marginBottom: "6px"
    },

    requiredStar: {
      color: "#ef4444",
      marginLeft: "4px"
    },

    // Fixed - changed from function to object with conditional property
    input: (hasError) => ({
      width: "100%",
      padding: isMobile ? "12px 16px" : "14px 18px",
      fontSize: isMobile ? "14px" : "15px",
      border: hasError ? "2px solid #ef4444" : "2px solid #e2e8f0",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#ffffff",
      color: "#1e293b"
    }),

    // Fixed - changed from function to object with conditional property
    select: (hasError) => ({
      width: "100%",
      padding: isMobile ? "12px 16px" : "14px 18px",
      fontSize: isMobile ? "14px" : "15px",
      border: hasError ? "2px solid #ef4444" : "2px solid #e2e8f0",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#ffffff",
      color: "#1e293b",
      cursor: "pointer",
      appearance: "none",
      backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 1rem center",
      backgroundSize: "1em"
    }),

    textarea: {
      width: "100%",
      padding: isMobile ? "12px 16px" : "14px 18px",
      fontSize: isMobile ? "14px" : "15px",
      border: errors.message ? "2px solid #ef4444" : "2px solid #e2e8f0",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#ffffff",
      color: "#1e293b",
      minHeight: isMobile ? "120px" : "140px",
      resize: "vertical",
      fontFamily: "Open Sans ",
    },

    errorMessage: {
      fontSize: isMobile ? "12px" : "13px",
      color: "#ef4444",
      marginTop: "5px",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    },

    successMessage: {
      marginTop: "20px",
      padding: isMobile ? "14px" : "16px",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#fff",
      borderRadius: "16px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: "500",
      textAlign: "center",
      animation: "fadeIn 0.5s ease"
    },

    emailHint: {
      fontSize: isMobile ? "12px" : "13px",
      color: "#0284c7",
      marginTop: "5px",
      padding: "8px 12px",
      background: "#e0f2fe",
      borderRadius: "8px",
      display: "flex",
      flexWrap: "wrap",
      gap: "8px"
    },

    emailSuggestion: {
      color: "#0369a1",
      cursor: "pointer",
      padding: "4px 12px",
      background: "#fff",
      borderRadius: "20px",
      fontSize: isMobile ? "11px" : "12px",
      border: "1px solid #38bdf8",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap"
    },

    budgetPreview: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#0284c7",
      marginTop: "5px",
      fontWeight: "500"
    },

    successIndicator: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#10b981",
      marginTop: "5px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    },

    otherInput: {
      marginTop: "12px",
      animation: "slideDown 0.3s ease"
    },

    charCount: {
      fontSize: isMobile ? "11px" : "12px",
      color: "#64748b",
      textAlign: "right",
      marginTop: "4px"
    },

    button: {
      width: "100%",
      padding: isMobile ? "14px 24px" : "16px 28px",
      background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "16px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px"
    },

    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed"
    },

    /* ---------- MAP SECTION ---------- */
    mapSection: {
      padding: isMobile ? "60px 5%" : isTablet ? "70px 6%" : "80px 8%",
      backgroundColor: "#f8fafc"
    },

    mapContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      borderRadius: isMobile ? "30px" : "40px",
      overflow: "hidden",
      boxShadow: "0 30px 60px rgba(0,0,0,0.05)"
    },

    mapPlaceholder: {
      width: "100%",
      height: isMobile ? "300px" : isTablet ? "350px" : "400px",
      background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#475569",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "500",
      textAlign: "center",
      padding: isMobile ? "20px" : "0"
    },

    /* ---------- FAQ SECTION ---------- */
    faqSection: {
      padding: isMobile ? "60px 5%" : isTablet ? "80px 6%" : "100px 8%",
      // backgroundColor: "#e0dcdc"
    },

    faqTitle: {
      fontSize: isMobile ? "26px" : isTablet ? "36px" : "clamp(32px, 5vw, 40px)",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "15px",
      color: "#12086F"
    },

    faqSubtitle: {
      fontSize: isMobile ? "15px" : "18px",
      color: "#64748b",
      textAlign: "center",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.7",
      padding: isMobile ? "0 15px" : "0"
    },

    faqGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(400px, 1fr))",
      gap: isMobile ? "20px" : "30px",
      maxWidth: "1200px",
      margin: "0 auto"
    },

    faqCard: {
      padding: isMobile ? "24px" : "32px",
      background: "#f8fafc",
      borderRadius: isMobile ? "20px" : "24px",
      transition: "all 0.3s ease"
    },

    faqQuestion: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "700",
      color: "#12086F",
      marginBottom: "8px"
    },

    faqAnswer: {
      fontSize: isMobile ? "14px" : "15px",
      color: "#64748b",
      lineHeight: "1.7"
    },

    /* ---------- CTA SECTION ---------- */
    ctaSection: {
      // background:"#12086F",
      padding: isMobile ? "60px 5%" : isTablet ? "70px 6%" : "80px 8%",
      color: "#12086F",
      textAlign: "center"
    },

    ctaTitle: {
      fontSize: isMobile ? "24px" : isTablet ? "32px" : "clamp(28px, 5vw, 36px)",
      fontWeight: "700",
      marginBottom: "15px"
    },

    ctaBtn: {
      padding: isMobile ? "14px 32px" : "16px 48px",
      background: " #d1d0d2",
      borderRadius: "50px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 15px 30px rgba(56, 189, 248, 0.3)",
      marginTop: "20px"
    },

    /* ---------- FOOTER ---------- */
    footer: {
      background: "#e9ebec",
      color: "#100d0d",
      padding: isMobile ? "40px 5% 20px" : "60px 8% 30px"
    },

    footerContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(250px, 1fr))",
      gap: isMobile ? "40px" : "60px",
      marginBottom: "40px",
      maxWidth: "1200px",
      margin: "0 auto 40px",
      textAlign: isMobile ? "center" : "left"
    },

    o: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "800",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    footerLink: {
      color: "rgba(20, 16, 16, 0.7)",
      textDecoration: "none",
      display: "block",
      marginBottom: "10px",
      transition: "0.3s",
      fontSize: isMobile ? "14px" : "16px"
    },

    copyright: {
      textAlign: "center",
      paddingTop: "30px",
      borderTop: "1px solid rgba(15, 14, 14, 0.1)",
      color: "rgba(16, 12, 12, 0.6)",
      maxWidth: "1200px",
      margin: "0 auto",
      fontSize: isMobile ? "13px" : "15px"
    }
  };

  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. Typically, residential projects take 3-6 months for design, while commercial projects range from 6-12 months."
    },
    {
      question: "Do you offer international services?",
      answer: "Yes, we work on projects globally. Our team has experience with international building codes and standards."
    },
    {
      question: "How do you charge for your services?",
      answer: "We offer flexible pricing models including percentage of construction cost, fixed fee, or hourly rates depending on project requirements. Minimum project budget starts from ₹5,00,000."
    },
    {
      question: "Can I see previous work samples?",
      answer: "Absolutely! Visit our Projects page to explore our portfolio of completed residential and commercial projects across India."
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
              key={item.id}footerLog
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
          <span style={styles.heroBadge}>Get In Touch</span>
          <h1 style={styles.heroTitle}>
            Let's <span style={styles.heroTitleHighlight}>Connect</span>
            <br />
            & Create Together
          </h1>
          <p style={styles.heroSubtitle}>
            Have a project in mind? We'd love to hear about it.
            Reach out and let's start a conversation.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={styles.contactSection}>
        <div style={styles.container}>
          {/* CONTACT INFO */}
          <div style={styles.infoWrapper}>
            <span style={styles.infoBadge}>Contact Information</span>
            <h2 style={styles.infoTitle}>
              We're Here to Help
            </h2>
            <p style={styles.infoText}>
              Whether you have a question about our services, need a consultation,
              or want to discuss a potential project, our team is ready to assist you.
            </p>

            <div style={styles.contactCards}>
              <div
                style={styles.contactCard}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <div style={styles.contactIcon}>📍</div>
                <div style={styles.contactDetails}>
                  <div style={styles.contactLabel}>Visit Us</div>
                  <div style={styles.contactValue}>Pune, Maharashtra, India</div>
                </div>
              </div>

              <div
                style={styles.contactCard}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <div style={styles.contactIcon}>📞</div>
                <div style={styles.contactDetails}>
                  <div style={styles.contactLabel}>Call Us</div>
                  <div style={styles.contactValue}>+91 98765 43210</div>
                </div>
              </div>

              <div
                style={styles.contactCard}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <div style={styles.contactIcon}>✉️</div>
                <div style={styles.contactDetails}>
                  <div style={styles.contactLabel}>Email Us</div>
                  <div style={styles.contactValue}>info@arctitech.com</div>
                </div>
              </div>
            </div>

            <div style={styles.socialSection}>
              <div style={styles.socialTitle}>Follow Us</div>
              <div style={styles.socialLinks}>
                {["📘", "📷", "🔗"].map((icon, index) => (
                  <div
                    key={index}
                    style={styles.socialLink}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = "#0284c7";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = "#f1f5f9";
                        e.currentTarget.style.color = "#475569";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div style={styles.formWrapper}>
            <div className="form-box" style={styles.formBox}>
              <h3 style={styles.formTitle}>Send a Message</h3>
              <p style={styles.formSubtitle}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Full Name <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    style={styles.input(!!errors.name)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";

                      // Validate on blur
                      const nameError = validateName(formData.name);
                      if (nameError) {
                        setErrors({ ...errors, name: nameError });
                      }
                    }}
                  />
                  {errors.name && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.name}
                    </div>
                  )}
                  {!errors.name && formData.name && validateName(formData.name) === "" && (
                    <div style={styles.successIndicator}>
                      ✓ Valid name
                    </div>
                  )}
                </div>

                {/* Email Field - STRICT .COM VALIDATION */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Email Address <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="name@gmail.com"
                    style={styles.input(!!errors.email)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                  />

                  {/* Email Suggestions for .com domains */}
                  {formData.email && !formData.email.includes('@') && formData.email.length > 2 && (
                    <div style={styles.emailHint}>
                      <span style={{ width: '100%', marginBottom: '4px' }}>Suggested .com emails:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {getEmailSuggestion(formData.email)?.map((suggestion, idx) => (
                          <span
                            key={idx}
                            style={styles.emailSuggestion}
                            onClick={() => {
                              setFormData({ ...formData, email: suggestion.full });
                              setErrors({ ...errors, email: "" });
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = "#38bdf8";
                              e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = "#fff";
                              e.target.style.color = "#0369a1";
                            }}
                          >
                            {suggestion.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.email && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.email}
                    </div>
                  )}

                  {!errors.email && formData.email && validateEmail(formData.email).isValid && (
                    <div style={styles.successIndicator}>
                      ✓ Valid .com email address
                    </div>
                  )}

                  {/* Show hint for .com requirement */}
                  {formData.email && formData.email.includes('@') && !formData.email.toLowerCase().endsWith('.com') && (
                    <div style={{ ...styles.budgetPreview, color: "#ef4444" }}>
                      ℹ️ Only .com email addresses are accepted (e.g., name@gmail.com)
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Mobile Number <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength="10"
                    style={styles.input(!!errors.phone)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.phone ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";

                      // Validate on blur
                      const phoneError = validatePhone(formData.phone);
                      if (phoneError) {
                        setErrors({ ...errors, phone: phoneError });
                      }
                    }}
                  />
                  {errors.phone && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.phone}
                    </div>
                  )}
                  {!errors.phone && formData.phone && formData.phone.length === 10 && (
                    <div style={styles.successIndicator}>
                      ✓ Valid Indian mobile number
                    </div>
                  )}
                  {formData.phone && formData.phone.length > 0 && (
                    <div style={styles.charCount}>
                      {formData.phone.length}/10 digits
                    </div>
                  )}
                </div>

                {/* Budget Field */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Project Budget (₹) <span style={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="500000"
                    maxLength="9"
                    style={styles.input(!!errors.budget)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.budget ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";

                      // Validate on blur
                      const budgetError = validateBudget(formData.budget);
                      if (budgetError) {
                        setErrors({ ...errors, budget: budgetError });
                      }
                    }}
                  />
                  {formData.budget && !errors.budget && (
                    <div style={styles.budgetPreview}>
                      Estimated: {formatIndianCurrency(formData.budget)}
                    </div>
                  )}
                  {errors.budget && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.budget}
                    </div>
                  )}
                  {formData.budget && formData.budget.length > 0 && (
                    <div style={styles.charCount}>
                      Max: ₹10,00,00,000
                    </div>
                  )}
                </div>

                {/* Project Type Dropdown */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Project Type <span style={styles.requiredStar}>*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={styles.select(!!errors.projectType)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.projectType ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {projectTypeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        style={{
                          color: option.disabled ? "#94a3b8" : "#1e293b",
                          backgroundColor: "#ffffff"
                        }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {errors.projectType && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.projectType}
                    </div>
                  )}
                  {!errors.projectType && formData.projectType && formData.projectType !== "" && (
                    <div style={styles.successIndicator}>
                      ✓ Project type selected
                    </div>
                  )}
                </div>

                {/* Subject Dropdown */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Subject <span style={styles.requiredStar}>*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={styles.select(!!errors.subject)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.subject ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {subjectOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        style={{
                          color: option.disabled ? "#94a3b8" : "#1e293b",
                          backgroundColor: "#ffffff"
                        }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Show "Other" input field if "Other" is selected */}
                  {showOtherSubject && (
                    <div style={styles.otherInput}>
                      <input
                        type="text"
                        name="otherSubject"
                        value={formData.otherSubject}
                        onChange={handleChange}
                        placeholder="Please specify your subject"
                        style={styles.input(!!errors.otherSubject)}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#38bdf8";
                          e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = errors.otherSubject ? "#ef4444" : "#e2e8f0";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      {errors.otherSubject && (
                        <div style={styles.errorMessage}>
                          <span>⚠️</span> {errors.otherSubject}
                        </div>
                      )}
                    </div>
                  )}

                  {errors.subject && !showOtherSubject && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.subject}
                    </div>
                  )}
                  {!errors.subject && formData.subject && formData.subject !== "" && !showOtherSubject && (
                    <div style={styles.successIndicator}>
                      ✓ Subject selected
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Your Message <span style={styles.requiredStar}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project in detail..."
                    style={styles.textarea}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 4px rgba(56,189,248,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.message ? "#ef4444" : "#e2e8f0";
                      e.target.style.boxShadow = "none";

                      // Validate on blur
                      const messageError = validateMessage(formData.message);
                      if (messageError) {
                        setErrors({ ...errors, message: messageError });
                      }
                    }}
                  />
                  {errors.message && (
                    <div style={styles.errorMessage}>
                      <span>⚠️</span> {errors.message}
                    </div>
                  )}
                  {formData.message && (
                    <div style={styles.charCount}>
                      {formData.message.length}/1000 characters | {getWordCount(formData.message)} words
                    </div>
                  )}
                  {!errors.message && formData.message && formData.message.length >= 20 && (
                    <div style={styles.successIndicator}>
                      ✓ Message length sufficient
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(isSubmitting ? styles.buttonDisabled : {})
                  }}
                  disabled={isSubmitting}
                  onMouseEnter={(e) => {
                    if (!isMobile && !isSubmitting) {
                      e.target.style.transform = "translateY(-2px) scale(1.02)";
                      e.target.style.boxShadow = "0 15px 35px rgba(56, 189, 248, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile && !isSubmitting) {
                      e.target.style.transform = "translateY(0) scale(1)";
                      e.target.style.boxShadow = "0 10px 25px rgba(56, 189, 248, 0.3)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <span style={{ fontSize: "20px" }}>→</span>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div style={styles.successMessage}>
                    ✓ Thank you! Your message has been sent successfully. We'll contact you within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <div style={styles.mapPlaceholder}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: isMobile ? "40px" : "48px", marginBottom: "16px" }}>📍</div>
              <div style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "600", marginBottom: "8px" }}>
                Arctitech Studio
              </div>
              <div>Pune, Maharashtra, India - 411001</div>
              <div style={{ marginTop: "16px", color: "#64748b", fontSize: isMobile ? "14px" : "16px" }}>
                Interactive Map Integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={styles.faqSection}>
        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        <p style={styles.faqSubtitle}>
          Quick answers to common questions about our services and process
        </p>
        <div style={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={styles.faqCard}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <h4 style={styles.faqQuestion}>{faq.question}</h4>
              <p style={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={{...styles.ctaTitle,color: "#12086F"}}>Ready to Start Your Project?</h2>
        <p style={{
          fontSize: isMobile ? "15px" : "18px",
          opacity: 0.95,
          marginBottom: "20px",
          padding: isMobile ? "0 15px" : "0"
        }}>
          Schedule a free consultation with our team today.
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
          Book a Consultation
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>ARCTITECH</div>
            <p style={{ color: "rgba(20, 16, 16, 0.7)", lineHeight: "1.7", fontSize: isMobile ? "14px" : "16px" }}>
              Creating timeless architecture that inspires and transforms.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#0f172a", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Quick Links</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/services" style={styles.footerLink}>Services</Link>
            <Link to="/project" style={styles.footerLink}>Projects</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
            <Link to="/appointment" style={styles.footerLink}>Appointment</Link>
          </div>
          <div>
            <h4 style={{ color: "#0f172a", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Legal</h4>
            <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/TearmsCondition" style={styles.footerLink}>Terms of Service</Link>
          </div>
          <div>
            <h4 style={{ color: "#0f172a", marginBottom: isMobile ? "15px" : "24px", fontSize: isMobile ? "18px" : "20px" }}>Contact</h4>
            <p style={{ color: "rgba(20, 16, 16, 0.7)", marginBottom: "10px", fontSize: isMobile ? "14px" : "16px" }}>
              Pune, Maharashtra
            </p>
            <p style={{ color: "rgba(20, 16, 16, 0.7)", marginBottom: "10px", fontSize: isMobile ? "14px" : "16px" }}>
              +91 98765 43210
            </p>
            <p style={{ color: "rgba(20, 16, 16, 0.7)", fontSize: isMobile ? "14px" : "16px" }}>
              info@arctitech.com
            </p>
          </div>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} ARCTITECH. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Contact;