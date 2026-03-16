import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Appointment() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    projectType: "",
    budget: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Background image URL for header
  const headerBgImage = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

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
    black: '#000000',
    white: '#ffffff',
    skyblue: '#38bdf8',
  };

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'projectType'];
    const filledRequired = requiredFields.filter(field => formData[field]?.trim()).length;
    const progress = (filledRequired / requiredFields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  // ================ IMPROVED NAME VALIDATION ================
  const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Full name is required";
    }

    // Remove extra spaces and check length
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return "Name must be at least 2 characters";
    }

    if (trimmedName.length > 50) {
      return "Name must be less than 50 characters";
    }

    // Check for special characters - only allow letters, spaces, dots, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!nameRegex.test(trimmedName)) {
      return "Name can only contain letters, spaces, dots, hyphens, and apostrophes";
    }

    // Check if name contains any special characters like < > [ ] { } ( ) etc.
    const specialCharsRegex = /[<>[\]{}()@#$%^&*+=|\\/?!`~]/;
    if (specialCharsRegex.test(trimmedName)) {
      return "Name cannot contain special characters like < > [ ] { } ( ) @ # $ % ^ & *";
    }

    // Check for at least two words (first and last name)
    const wordCount = trimmedName.split(/\s+/).length;
    if (wordCount < 2) {
      return "Please enter your full name (first and last name)";
    }

    // Check each part of the name
    const nameParts = trimmedName.split(/\s+/);
    for (let part of nameParts) {
      if (part.length < 2) {
        return "Each part of the name must be at least 2 characters";
      }
      // Check if part contains only valid characters
      const partRegex = /^[a-zA-Z.'-]+$/;
      if (!partRegex.test(part)) {
        return "Each part of the name can only contain letters, dots, hyphens, and apostrophes";
      }
    }

    return "";
  };
  // ================ END IMPROVED NAME VALIDATION ================

  // ================ EMAIL VALIDATION - ONLY .COM ================
  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email address is required";
    }

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address format";
    }

    // Check if email ends with .com
    if (!email.toLowerCase().endsWith('.com')) {
      return "Only .com email addresses are accepted. Please use a Gmail, Yahoo, or other .com email.";
    }

    // Extract domain
    const domain = email.split('@')[1].toLowerCase();

    // Check if domain is exactly .com (not .co.in, .org, etc.)
    if (!domain.endsWith('.com')) {
      return "Email must end with .com";
    }

    // Count dots in domain - should have exactly one dot for .com
    const dotCount = (domain.match(/\./g) || []).length;
    if (dotCount !== 1) {
      return "Only standard .com emails are accepted (e.g., name@gmail.com, not name@gmail.co.in)";
    }

    // Check if domain has only one part before .com
    const domainParts = domain.split('.');
    if (domainParts.length !== 2) {
      return "Invalid domain format. Use provider.com format";
    }

    // Check if domain part before .com is valid (at least 2 characters)
    if (domainParts[0].length < 2) {
      return "Domain name must be at least 2 characters";
    }

    return "";
  };
  // ================ END EMAIL VALIDATION - ONLY .COM ================

  // ================ INDIAN PHONE NUMBER VALIDATION ================
  const validatePhone = (phone) => {
    if (!phone || phone.trim() === "") {
      return "Mobile number is required";
    }

    // Remove all non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if it's exactly 10 digits
    if (cleanedPhone.length !== 10) {
      return "Indian mobile number must be exactly 10 digits";
    }

    // Check if it starts with 6,7,8,9 (valid Indian mobile prefixes)
    if (!/^[6-9]/.test(cleanedPhone)) {
      return "Indian mobile number must start with 6, 7, 8, or 9";
    }

    // Check if all digits are the same (like 7777777777)
    if (/^(\d)\1{9}$/.test(cleanedPhone)) {
      return "Please enter a valid mobile number (cannot be all same digits)";
    }

    return "";
  };
  // ================ END INDIAN PHONE NUMBER VALIDATION ================

  const validateDate = (date) => {
    if (!date) {
      return "Please select your preferred date";
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return "Please select a future date";
    }

    const day = selectedDate.getDay();
    if (day === 0) {
      return "We're closed on Sundays";
    }
    return "";
  };

  const validateTime = (time) => {
    if (!time) {
      return "Please select a preferred time slot";
    }
    return "";
  };

  const validateProjectType = (projectType) => {
    if (!projectType) {
      return "Please select a project type";
    }
    return "";
  };

  // ================ INDIAN BUDGET VALIDATION ================
  const validateBudget = (budget) => {
    if (!budget) return "";

    const budgetNum = parseInt(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      return "Please enter a valid budget amount";
    }

    if (budgetNum < 100000) {
      return "Minimum budget is ₹1,00,000";
    }

    if (budgetNum > 100000000) {
      return "Maximum budget is ₹10,00,00,000";
    }

    return "";
  };
  // ================ END INDIAN BUDGET VALIDATION ================

  const validateMessage = (message) => {
    if (message && message.length > 500) {
      return "Message must be less than 500 characters";
    }
    // Check for malicious content in message
    if (message) {
      const maliciousPatterns = /<script|javascript:|onerror=|onclick=|onload=/i;
      if (maliciousPatterns.test(message)) {
        return "Message contains invalid content";
      }
    }
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "date":
        return validateDate(value);
      case "time":
        return validateTime(value);
      case "projectType":
        return validateProjectType(value);
      case "budget":
        return validateBudget(value);
      case "message":
        return validateMessage(value);
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for name field to prevent special characters on input
    if (name === "name") {
      // Allow only letters, spaces, dots, hyphens, and apostrophes
      // This prevents special characters like < > [ ] etc. from being typed
      const filteredValue = value.replace(/[<>[\]{}()@#$%^&*+=|\\/?!`~]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }));
    }
    // Special handling for phone to only allow digits
    else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly.slice(0, 10) // Limit to 10 digits
      }));
    }
    // Special handling for budget to only allow digits
    else if (name === "budget") {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly.slice(0, 9) // Limit to 9 digits (max 10 crores)
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (touched[name]) {
      let valueToValidate = value;
      if (name === "name") {
        valueToValidate = value.replace(/[<>[\]{}()@#$%^&*+=|\\/?!`~]/g, '');
      } else if (name === "phone" || name === "budget") {
        valueToValidate = value.replace(/\D/g, '');
      }
      const error = validateField(name, valueToValidate);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      try {
        await axios.post('http://localhost:5000/api/appointment', formData);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          projectType: "",
          budget: "",
          message: ""
        });
        setTouched({});

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error(error);
        setErrors(prev => ({
          ...prev,
          submit: "Failed to submit appointment. Please try again."
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const getAvailableTimeSlots = () => {
    if (!formData.date) return timeSlots;

    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay();

    if (day === 0) return [];
    if (day === 6) {
      return timeSlots.filter(slot => {
        const hour = parseInt(slot.split(":")[0]);
        return hour >= 10 && hour <= 16;
      });
    }
    return timeSlots;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Get email suggestion for common .com providers
  const getEmailSuggestion = (email) => {
    if (!email || email.includes('@') || email.length < 3) return null;

    const commonProviders = [
      { domain: 'gmail.com', label: 'Gmail' },
      { domain: 'yahoo.com', label: 'Yahoo' },
      { domain: 'hotmail.com', label: 'Hotmail' },
      { domain: 'outlook.com', label: 'Outlook' },
      { domain: 'aol.com', label: 'AOL' },
      { domain: 'icloud.com', label: 'iCloud' },
      { domain: 'protonmail.com', label: 'ProtonMail' },
      { domain: 'rediffmail.com', label: 'Rediffmail' },
      { domain: 'ymail.com', label: 'Ymail' },
    ];

    return commonProviders.map(provider => ({
      full: `${email}@${provider.domain}`,
      label: `${email}@${provider.domain}`
    }));
  };

  // Format Indian currency
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

  const styles = {
    /* ---------- FIXED HEADER WITH NAVIGATION ---------- */
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled
        ? "rgba(15, 23, 42, 0.95)"
        : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
      backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
    },
    headerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '15px 16px' : '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      fontSize: isMobile ? '24px' : '28px',
      fontWeight: '800',
      background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.white})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      cursor: 'pointer',
      letterSpacing: '-0.5px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    /* ---------- DESKTOP NAVIGATION ---------- */
    navMenu: {
      display: isMobile ? 'none' : 'flex',
      gap: isTablet ? '24px' : '32px',
      alignItems: 'center',
    },
    navLink: {
      color: colors.white,
      textDecoration: 'none',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '500',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '8px 16px',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      position: 'relative',
      borderRadius: '30px',
    },
    navLinkActive: {
      background: colors.skyblue,
      color: colors.white,
      boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)',
    },
    navLinkHover: {
      color: colors.primary[400],
    },
    /* ---------- MOBILE MENU BUTTON (Three Lines) ---------- */
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 1001,
      padding: '10px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '44px',
      height: '44px',
    },
    menuBar: {
      width: '24px',
      height: '2px',
      background: colors.white,
      margin: '3px 0',
      transition: 'all 0.3s ease',
    },
    menuBar1: {
      width: '24px',
      height: '2px',
      background: colors.white,
      margin: '3px 0',
      transition: 'all 0.3s ease',
      transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
    },
    menuBar2: {
      width: '24px',
      height: '2px',
      background: colors.white,
      margin: '3px 0',
      transition: 'all 0.3s ease',
      opacity: mobileMenuOpen ? 0 : 1,
    },
    menuBar3: {
      width: '24px',
      height: '2px',
      background: colors.white,
      margin: '3px 0',
      transition: 'all 0.3s ease',
      transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
    },
    /* ---------- MOBILE MENU ---------- */
    mobileMenu: {
      display: mobileMenuOpen ? 'flex' : 'none',
      position: 'fixed',
      top: isMobile ? '70px' : '80px',
      left: 0,
      right: 0,
      background: 'rgba(15, 23, 42, 0.98)',
      backdropFilter: 'blur(10px)',
      padding: '30px 20px',
      flexDirection: 'column',
      gap: '16px',
      zIndex: 999,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      borderBottom: `1px solid ${colors.gray[800]}`,
    },
    mobileNavLink: {
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: '500',
      padding: '15px 0',
      borderBottom: `1px solid ${colors.gray[800]}`,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'center',
      transition: 'color 0.3s ease',
    },
    mobileNavLinkActive: {
      color: colors.skyblue,
      fontWeight: '600',
    },
    /* ---------- HERO SECTION (with background image) ---------- */
    heroSection: {
      position: 'relative',
      minHeight: isMobile ? '80vh' : '90vh',
      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%), url(${headerBgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      padding: isMobile ? '100px 16px 60px' : '120px 24px 80px',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '900px',
      margin: '0 auto',
      animation: 'fadeInUp 1s ease',
    },
    heroBadge: {
      display: 'inline-block',
      padding: isMobile ? '6px 16px' : '8px 20px',
      background: 'rgba(99, 102, 241, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(99, 102, 241, 0.5)',
      borderRadius: '50px',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '600',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: isMobile ? '20px' : '24px',
      color: '#fff',
    },
    heroTitle: {
      fontSize: isMobile ? '32px' : isTablet ? '42px' : '52px',
      fontWeight: '800',
      marginBottom: isMobile ? '16px' : '20px',
      lineHeight: '1.2',
      textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    heroHighlight: {
      color: colors.primary[400],
      textShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
    },
    heroSubtitle: {
      fontSize: isMobile ? '16px' : '18px',
      opacity: 0.95,
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6',
      color: 'rgba(255,255,255,0.9)',
      padding: isMobile ? '0 10px' : '0',
    },
    /* ---------- MAIN CONTENT ---------- */
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '40px 16px' : '60px 24px',
    },
    progressSection: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginBottom: isMobile ? '30px' : '40px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    progressTitle: {
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      color: colors.gray[700],
    },
    progressPercentage: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '700',
      color: colors.primary[600],
    },
    progressBar: {
      height: '8px',
      backgroundColor: colors.gray[200],
      borderRadius: '4px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.primary[600]})`,
      borderRadius: '4px',
      transition: 'width 0.3s ease',
      width: `${formProgress}%`,
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
      gap: isMobile ? '20px' : '30px',
      backgroundColor: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    },
    sidebar: {
      backgroundColor: colors.gray[50],
      padding: isMobile ? '24px' : '32px',
      borderRight: isMobile ? 'none' : `1px solid ${colors.gray[200]}`,
      borderBottom: isMobile ? `2px solid ${colors.gray[200]}` : 'none',
    },
    sidebarTitle: {
      fontSize: isMobile ? '22px' : '24px',
      fontWeight: '700',
      color: colors.gray[900],
      marginBottom: '16px',
    },
    sidebarText: {
      color: colors.gray[600],
      lineHeight: '1.6',
      marginBottom: isMobile ? '24px' : '32px',
      fontSize: isMobile ? '14px' : '15px',
    },
    infoCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    infoItem: {
      display: 'flex',
      gap: isMobile ? '12px' : '16px',
      padding: isMobile ? '12px 0' : '16px 0',
      borderBottom: `1px solid ${colors.gray[200]}`,
    },
    infoIcon: {
      width: isMobile ? '40px' : '44px',
      height: isMobile ? '40px' : '44px',
      backgroundColor: colors.primary[50],
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '18px' : '20px',
      color: colors.primary[600],
      flexShrink: 0,
    },
    infoContent: {
      flex: 1,
      minWidth: 0,
    },
    infoLabel: {
      fontSize: isMobile ? '12px' : '13px',
      color: colors.gray[500],
      marginBottom: '4px',
    },
    infoValue: {
      fontSize: isMobile ? '14px' : '15px',
      fontWeight: '600',
      color: colors.gray[900],
      wordBreak: 'break-word',
    },
    hoursItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${colors.gray[200]}`,
      fontSize: isMobile ? '14px' : '15px',
      color: colors.gray[700],
      flexWrap: 'wrap',
      gap: '8px',
    },
    formSection: {
      padding: isMobile ? '24px' : '32px',
    },
    formTitle: {
      fontSize: isMobile ? '24px' : '28px',
      fontWeight: '700',
      color: colors.gray[900],
      marginBottom: '8px',
    },
    formSubtitle: {
      color: colors.gray[500],
      fontSize: isMobile ? '14px' : '15px',
      marginBottom: isMobile ? '24px' : '32px',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '16px' : '20px',
    },
    fullWidth: {
      gridColumn: isMobile ? 'span 1' : 'span 2',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: isMobile ? '13px' : '14px',
      fontWeight: '600',
      color: colors.gray[700],
      marginBottom: '8px',
      flexWrap: 'wrap',
    },
    required: {
      color: colors.error,
      fontSize: '14px',
      marginLeft: '4px',
    },
    input: {
      width: '100%',
      padding: isMobile ? '12px 14px' : '14px 16px',
      fontSize: isMobile ? '14px' : '15px',
      border: `2px solid ${colors.gray[200]}`,
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
    },
    inputError: {
      borderColor: colors.error,
      backgroundColor: `${colors.error}08`,
    },
    errorText: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: '8px',
      fontSize: isMobile ? '12px' : '13px',
      color: colors.error,
      flexWrap: 'wrap',
    },
    hintText: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: '8px',
      fontSize: isMobile ? '12px' : '13px',
      color: colors.gray[500],
      flexWrap: 'wrap',
    },
    emailHint: {
      fontSize: isMobile ? '12px' : '13px',
      color: colors.skyblue,
      marginTop: '5px',
      padding: '8px 12px',
      background: `${colors.skyblue}10`,
      borderRadius: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    emailSuggestion: {
      color: colors.skyblue,
      cursor: 'pointer',
      padding: '4px 12px',
      background: '#fff',
      borderRadius: '20px',
      fontSize: isMobile ? '11px' : '12px',
      border: `1px solid ${colors.skyblue}`,
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
    },
    select: {
      width: '100%',
      padding: isMobile ? '12px 14px' : '14px 16px',
      fontSize: isMobile ? '14px' : '15px',
      border: `2px solid ${colors.gray[200]}`,
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${colors.gray[600]}' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 16px center',
      paddingRight: '44px',
    },
    textarea: {
      width: '100%',
      padding: isMobile ? '12px 14px' : '14px 16px',
      fontSize: isMobile ? '14px' : '15px',
      border: `2px solid ${colors.gray[200]}`,
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      minHeight: isMobile ? '100px' : '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    timeSlotGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '8px' : '12px',
      marginTop: '8px',
    },
    timeSlot: {
      padding: isMobile ? '12px 4px' : '14px 8px',
      textAlign: 'center',
      backgroundColor: colors.gray[50],
      border: `2px solid ${colors.gray[200]}`,
      borderRadius: '10px',
      fontSize: isMobile ? '13px' : '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: colors.gray[700],
      whiteSpace: 'nowrap',
    },
    selectedTimeSlot: {
      backgroundColor: colors.primary[600],
      borderColor: colors.primary[600],
      color: 'white',
    },
    timeSlotDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: colors.gray[100],
      pointerEvents: 'none',
    },
    budgetPreview: {
      fontSize: isMobile ? '13px' : '14px',
      color: colors.primary[600],
      marginTop: '5px',
      fontWeight: '500',
    },
    button: {
      width: '100%',
      padding: isMobile ? '14px' : '16px',
      backgroundColor: colors.primary[600],
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: isMobile ? '15px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: isMobile ? '24px' : '32px',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    successMessage: {
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '12px' : '16px',
      padding: isMobile ? '16px' : '20px',
      backgroundColor: `${colors.success}15`,
      border: `2px solid ${colors.success}`,
      borderRadius: '12px',
      marginTop: '24px',
      flexDirection: isMobile ? 'column' : 'row',
      textAlign: isMobile ? 'center' : 'left',
    },
    successIcon: {
      width: isMobile ? '40px' : '48px',
      height: isMobile ? '40px' : '48px',
      backgroundColor: colors.success,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: isMobile ? '20px' : '24px',
      margin: isMobile ? '0 auto' : '0',
    },
    successContent: {
      flex: 1,
    },
    successTitle: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '700',
      color: colors.gray[900],
      marginBottom: '4px',
    },
    successText: {
      fontSize: isMobile ? '13px' : '14px',
      color: colors.gray[600],
    },
    /* ---------- FEATURES SECTION ---------- */
    featuresSection: {
      padding: isMobile ? '60px 16px' : '80px 24px',
      backgroundColor: colors.gray[50],
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
      fontWeight: '700',
      color: colors.gray[900],
      marginBottom: isMobile ? '12px' : '16px',
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: isMobile ? '16px' : '18px',
      color: colors.gray[600],
      marginBottom: isMobile ? '32px' : '48px',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: isMobile ? '0 16px' : '0',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : '30px',
    },
    featureCard: {
      padding: isMobile ? '24px' : '32px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
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
    /* ---------- FOOTER ---------- */
    footer: {
      backgroundColor: colors.black,
      color: 'white',
      padding: isMobile ? '30px 16px 15px' : '60px 24px 30px',
      borderTop: `1px solid ${colors.gray[800]}`,
    },
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : '40px',
      marginBottom: isMobile ? '20px' : '40px',
    },
    footerSection: {
      width: '100%',
      textAlign: isMobile ? 'center' : 'left',
    },
    footerTitle: {
      fontSize: isMobile ? '16px' : '20px',
      fontWeight: '700',
      marginBottom: isMobile ? '10px' : '20px',
      color: colors.white,
      position: 'relative',
      paddingBottom: '6px',
      borderBottom: isMobile ? `1px solid ${colors.primary[600]}` : `2px solid ${colors.primary[600]}`,
      display: isMobile ? 'block' : 'inline-block',
      width: isMobile ? '100%' : 'auto',
    },
    footerText: {
      color: colors.gray[400],
      lineHeight: '1.6',
      fontSize: isMobile ? '13px' : '15px',
      marginBottom: isMobile ? '12px' : '20px',
      padding: isMobile ? '0 5px' : '0',
    },
    footerLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '8px' : '10px',
      alignItems: isMobile ? 'center' : 'flex-start',
    },
    footerLink: {
      display: 'inline-block',
      color: colors.gray[400],
      textDecoration: 'none',
      fontSize: isMobile ? '13px' : '15px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: isMobile ? '6px 0' : '4px 0',
      textAlign: 'center',
      position: 'relative',
      width: 'fit-content',
    },
    footerSocial: {
      display: 'flex',
      gap: isMobile ? '12px' : '15px',
      marginTop: isMobile ? '12px' : '15px',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    socialIcon: {
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      borderRadius: '50%',
      backgroundColor: colors.gray[800],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.white,
      fontSize: isMobile ? '16px' : '18px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
    },
    footerBottom: {
      paddingTop: isMobile ? '15px' : '30px',
      borderTop: `1px solid ${colors.gray[800]}`,
      textAlign: 'center',
      color: colors.gray[500],
      fontSize: isMobile ? '11px' : '14px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '8px' : '0',
    },
    footerBottomLinks: {
      display: 'flex',
      gap: isMobile ? '12px' : '25px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    footerBottomLink: {
      color: colors.gray[500],
      textDecoration: 'none',
      fontSize: isMobile ? '10px' : '13px',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: isMobile ? '4px 0' : '0',
    },
    newsletterForm: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '8px' : '10px',
      marginTop: isMobile ? '10px' : '15px',
      width: '100%',
    },
    newsletterInput: {
      flex: 1,
      padding: isMobile ? '10px 12px' : '12px 16px',
      fontSize: isMobile ? '13px' : '15px',
      border: `1px solid ${colors.gray[700]}`,
      borderRadius: '6px',
      backgroundColor: 'transparent',
      color: colors.white,
      outline: 'none',
      transition: 'all 0.3s ease',
      width: isMobile ? '100%' : 'auto',
      textAlign: isMobile ? 'center' : 'left',
    },
    newsletterButton: {
      padding: isMobile ? '10px 16px' : '12px 24px',
      backgroundColor: colors.primary[600],
      color: colors.white,
      border: 'none',
      borderRadius: '6px',
      fontSize: isMobile ? '13px' : '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      width: isMobile ? '100%' : 'auto',
    },
  };

  // Custom style for footer logo (reusing header logo style with white text)
  const footerLogoStyle = {
    ...styles.logo,
    WebkitTextFillColor: colors.white, // override gradient to solid white for footer
    background: 'none',
    color: colors.white,
    marginBottom: '16px',
  };

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

  const footerLinks = {
    company: ['About Us', 'Our Work', 'Team', 'Careers'],
    services: ['Residential', 'Commercial', 'Interior', 'Renovation'],
    support: ['Contact', 'FAQ', 'Privacy Policy', 'Terms of Service'],
    connect: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter']
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.gray[50] }}>
      {/* FIXED HEADER WITH NAVIGATION */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logo} onClick={() => handleNavigation('/')}>
            ARCTITECH
          </div>

          {/* Desktop Navigation */}
          <nav style={styles.navMenu}>
            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              Home
            </button>
            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/about' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/about')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/about') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/about') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              About
            </button>
            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/contact' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/contact')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/contact') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/contact') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              Contact
            </button>
            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/services' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/services')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/services') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/services') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              Services
            </button>
            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/project' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/project')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/project') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/project') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              Projects
            </button>

            <button
              style={{ ...styles.navLink, ...(window.location.pathname === '/appointment' ? styles.navLinkActive : {}) }}
              onClick={() => handleNavigation('/appointment')}
              onMouseEnter={(e) => {
                if (window.location.pathname !== '/appointment') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (window.location.pathname !== '/appointment') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = colors.white;
                }
              }}
            >
              Appointment
            </button>
          </nav>

          {/* Mobile Menu Button (Three Lines) */}
          <button
            style={styles.mobileMenuButton}
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div style={mobileMenuOpen ? styles.menuBar1 : styles.menuBar}></div>
            <div style={mobileMenuOpen ? styles.menuBar2 : styles.menuBar}></div>
            <div style={mobileMenuOpen ? styles.menuBar3 : styles.menuBar}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={styles.mobileMenu} className="mobile-menu">
            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/')}
            >
              Home
            </button>
            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/about' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/about')}
            >
              About
            </button>
            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/contact' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </button>
            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/services' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/services')}
            >
              Services
            </button>

            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/project' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/project')}
            >
              Projects
            </button>

            <button
              style={{ ...styles.mobileNavLink, ...(window.location.pathname === '/appointment' ? styles.mobileNavLinkActive : {}) }}
              onClick={() => handleNavigation('/appointment')}
            >
              Appointment
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Book Your Consultation</span>
          <h1 style={styles.heroTitle}>
            Book Your <span style={styles.heroHighlight}>Architectural</span> Consultation
          </h1>
          <p style={styles.heroSubtitle}>
            Let's discuss your vision and bring your ideas to life.
            Choose a time that works best for you.
          </p>
        </div>
      </section>

      <main style={styles.mainContainer}>
        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span style={styles.progressTitle}>Form Completion</span>
            <span style={styles.progressPercentage}>{Math.round(formProgress)}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>

        <div style={styles.mainGrid}>
          <aside style={styles.sidebar}>
            <h2 style={styles.sidebarTitle}>Let's Create Something Amazing</h2>
            <p style={styles.sidebarText}>
              Schedule a personalized consultation with our expert architectural team.
            </p>

            <div style={styles.infoCard}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📍</div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Visit Our Studio</div>
                  <div style={styles.infoValue}>Pune, Maharashtra 411001</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>📞</div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Call Us Directly</div>
                  <div style={styles.infoValue}>+91 98765 43210</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoIcon}>✉️</div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Email Us</div>
                  <div style={styles.infoValue}>consult@arctitech.com</div>
                </div>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: colors.gray[900] }}>
                Working Hours
              </h3>
              <div style={styles.hoursItem}>
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div style={styles.hoursItem}>
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div style={{ ...styles.hoursItem, borderBottom: 'none' }}>
                <span>Sunday</span>
                <span style={{ color: colors.error }}>Closed</span>
              </div>
            </div>
          </aside>

          <div style={styles.formSection}>
            <h2 style={styles.formTitle}>Book Your Appointment</h2>
            <p style={styles.formSubtitle}>
              Fill in your details below and we'll confirm your appointment within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>
                    <span>👤</span> Full Name <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your full name (e.g., John Doe)"
                    style={{
                      ...styles.input,
                      ...(touched.name && errors.name ? styles.inputError : {})
                    }}
                  />
                  {touched.name && errors.name && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.name}
                    </div>
                  )}
                  {formData.name && !errors.name && (
                    <div style={styles.hintText}>
                      <span>✓</span> Valid name
                    </div>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <span>📧</span> Email <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@gmail.com"
                    style={{
                      ...styles.input,
                      ...(touched.email && errors.email ? styles.inputError : {})
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
                              setTouched({ ...touched, email: true });
                              setErrors({ ...errors, email: "" });
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = colors.skyblue;
                              e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = '#fff';
                              e.target.style.color = colors.skyblue;
                            }}
                          >
                            {suggestion.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {touched.email && errors.email && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.email}
                    </div>
                  )}

                  {formData.email && !errors.email && (
                    <div style={styles.hintText}>
                      <span>✓</span> Valid .com email
                    </div>
                  )}

                  {/* Show hint about .com requirement */}
                  {formData.email && formData.email.includes('@') && !formData.email.toLowerCase().endsWith('.com') && (
                    <div style={{ ...styles.hintText, color: colors.error }}>
                      <span>ℹ️</span> Only .com email addresses are accepted (e.g., name@gmail.com)
                    </div>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <span>📱</span> Mobile Number <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    maxLength="10"
                    style={{
                      ...styles.input,
                      ...(touched.phone && errors.phone ? styles.inputError : {})
                    }}
                  />
                  {touched.phone && errors.phone && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.phone}
                    </div>
                  )}
                  {formData.phone && !errors.phone && (
                    <div style={styles.hintText}>
                      <span>✓</span> Valid Indian mobile number
                    </div>
                  )}
                  {formData.phone && formData.phone.length > 0 && (
                    <div style={styles.hintText}>
                      {formData.phone.length}/10 digits
                    </div>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <span>📅</span> Preferred Date <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      ...styles.input,
                      ...(touched.date && errors.date ? styles.inputError : {})
                    }}
                  />
                  {touched.date && errors.date && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.date}
                    </div>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <span>🏗️</span> Project Type <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...styles.select,
                      ...(touched.projectType && errors.projectType ? styles.inputError : {})
                    }}
                  >
                    <option value="">Select Project Type</option>
                    <option value="residential">🏠 Residential</option>
                    <option value="commercial">🏢 Commercial</option>
                    <option value="interior">🪑 Interior</option>
                    <option value="renovation">🔨 Renovation</option>
                    <option value="landscape">🌳 Landscape</option>
                  </select>
                  {touched.projectType && errors.projectType && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.projectType}
                    </div>
                  )}
                </div>

                <div>
                  <label style={styles.label}>
                    <span>💰</span> Budget Range (₹)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="500000"
                    maxLength="9"
                    style={{
                      ...styles.input,
                      ...(touched.budget && errors.budget ? styles.inputError : {})
                    }}
                  />
                  {formData.budget && !errors.budget && (
                    <div style={styles.budgetPreview}>
                      Estimated: {formatIndianCurrency(formData.budget)}
                    </div>
                  )}
                  {touched.budget && errors.budget && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.budget}
                    </div>
                  )}
                  {formData.budget && formData.budget.length > 0 && (
                    <div style={styles.hintText}>
                      Min: ₹1,00,000 | Max: ₹10,00,00,000
                    </div>
                  )}
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>
                    <span>⏰</span> Preferred Time <span style={styles.required}>*</span>
                  </label>
                  <div style={styles.timeSlotGrid}>
                    {timeSlots.map((time) => {
                      const isAvailable = availableTimeSlots.includes(time);
                      const isSelected = formData.time === time;

                      return (
                        <div
                          key={time}
                          style={{
                            ...styles.timeSlot,
                            ...(isSelected ? styles.selectedTimeSlot : {}),
                            ...(!isAvailable ? styles.timeSlotDisabled : {})
                          }}
                          onClick={() => {
                            if (isAvailable) {
                              setFormData({ ...formData, time });
                              setTouched({ ...touched, time: true });
                              setErrors({ ...errors, time: "" });
                            }
                          }}
                        >
                          {time}
                        </div>
                      );
                    })}
                  </div>
                  {touched.time && errors.time && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.time}
                    </div>
                  )}
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>
                    <span>📝</span> Project Details
                    {formData.message && (
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: colors.gray[500] }}>
                        ({formData.message.length}/500)
                      </span>
                    )}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project, requirements, and any specific questions you have..."
                    style={styles.textarea}
                    maxLength={500}
                  />
                  {touched.message && errors.message && (
                    <div style={styles.errorText}>
                      <span>⚠️</span> {errors.message}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.button,
                  ...(isSubmitting ? styles.buttonDisabled : {})
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing Request...</>
                ) : (
                  <>
                    <span>📅</span>
                    Book Appointment
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {submitted && (
              <div style={styles.successMessage}>
                <div style={styles.successIcon}>✓</div>
                <div style={styles.successContent}>
                  <div style={styles.successTitle}>
                    Appointment Request Submitted!
                  </div>
                  <div style={styles.successText}>
                    We've sent a confirmation to {formData.email}. Our team will confirm your slot within 24 hours.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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
      </main>

      {/* FOOTER (corrected) */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            {/* Column 1: Logo & Description */}
            <div style={styles.footerSection}>
              <div style={footerLogoStyle}>ARCTITECH</div>
              <p style={styles.footerText}>
                Creating timeless architecture that inspires and transforms.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Quick Links</h4>
              <div style={styles.footerLinks}>
                <Link to="/" style={styles.footerLink}>Home</Link>
                <Link to="/about" style={styles.footerLink}>About Us</Link>
                <Link to="/services" style={styles.footerLink}>Services</Link>
                <Link to="/project" style={styles.footerLink}>Projects</Link>
                <Link to="/contact" style={styles.footerLink}>Contact</Link>
                <Link to="/appointment" style={styles.footerLink}>Appointment</Link>
              </div>
            </div>

            {/* Column 3: Legal */}
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Legal</h4>
              <div style={styles.footerLinks}>
                <Link to="/PrivacyPolicy" style={styles.footerLink}>Privacy Policy</Link>
                <Link to="/TermsCondition" style={styles.footerLink}>Terms of Service</Link>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div style={styles.footerSection}>
              <h4 style={styles.footerTitle}>Contact</h4>
              <p style={styles.footerText}>contact@arctitech.com</p>
              <p style={styles.footerText}>+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={styles.footerBottom}>
            <span>© {new Date().getFullYear()} ARCTITECH. All rights reserved.</span>
            <div style={styles.footerBottomLinks}>
              <Link to="/PrivacyPolicy" style={styles.footerBottomLink}>Privacy</Link>
              <Link to="/TermsCondition" style={styles.footerBottomLink}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            padding-top: ${isMobile ? '70px' : '80px'};
          }

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

          input:focus, select:focus, textarea:focus {
            border-color: ${colors.primary[500]} !important;
            box-shadow: 0 0 0 3px ${colors.primary[100]} !important;
            outline: none;
          }

          button {
            cursor: pointer;
            font-family: inherit;
          }

          button:hover:not(:disabled) {
            transform: translateY(-2px);
          }

          button:active:not(:disabled) {
            transform: translateY(0);
          }

          @media (max-width: 480px) {
            .time-slot-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            button, input, select, textarea, [role="button"] {
              min-height: 44px;
            }
            
            .time-slot {
              min-height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: ${colors.gray[100]};
          }

          ::-webkit-scrollbar-thumb {
            background: ${colors.primary[400]};
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${colors.primary[600]};
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
}