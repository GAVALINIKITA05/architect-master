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
    otherSubject: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [showOtherSubject, setShowOtherSubject] = useState(false);

  const headerBgImage = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

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

  const styles = {
    page: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#333",
      lineHeight: 1.6,
      overflowX: "hidden"
    },
    header: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerBgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: isMobile ? "300px" : "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "white",
      position: "relative",
      marginBottom: "40px"
    },
    headerTitle: {
      fontSize: isMobile ? "2rem" : "3rem",
      fontWeight: "700",
      marginBottom: "10px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
    },
    headerSubtitle: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      maxWidth: "600px",
      padding: "0 20px"
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? "10px 20px" : "20px 30px",
      backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.3s ease",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: scrolled ? "#333" : "white",
      textDecoration: "none"
    },
    navItems: {
      display: isMobile ? "none" : "flex",
      gap: "30px",
      alignItems: "center"
    },
    navLink: {
      color: scrolled ? "#333" : "white",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "color 0.3s ease",
      cursor: "pointer"
    },
    mobileMenuButton: {
      display: isMobile ? "block" : "none",
      background: "none",
      border: "none",
      color: scrolled ? "#333" : "white",
      fontSize: "1.5rem",
      cursor: "pointer"
    },
    mobileMenu: {
      position: "fixed",
      top: "70px",
      left: 0,
      right: 0,
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
      opacity: mobileMenuOpen ? 1 : 0,
      transition: "all 0.3s ease",
      zIndex: 999
    },
    mobileNavItem: {
      display: "block",
      padding: "15px 20px",
      color: "#333",
      textDecoration: "none",
      fontSize: "1.1rem",
      borderBottom: "1px solid #eee"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 15px" : "0 30px"
    },
    contactSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "30px" : "50px",
      marginBottom: "60px"
    },
    contactInfo: {
      flex: isMobile ? "1" : "0.4",
      backgroundColor: "#f8f9fa",
      padding: isMobile ? "25px" : "40px",
      borderRadius: "10px"
    },
    contactForm: {
      flex: isMobile ? "1" : "0.6",
      backgroundColor: "white",
      padding: isMobile ? "25px" : "40px",
      borderRadius: "10px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
    },
    infoItem: {
      marginBottom: "30px",
      display: "flex",
      alignItems: "flex-start",
      gap: "15px"
    },
    infoIcon: {
      fontSize: "1.5rem",
      color: "#007bff",
      minWidth: "40px"
    },
    infoContent: {
      flex: 1
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "5px",
      color: "#333"
    },
    infoText: {
      color: "#666",
      lineHeight: 1.6
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#333",
      fontSize: "0.95rem"
    },
    required: {
      color: "#dc3545",
      marginLeft: "4px"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
      outline: "none"
    },
    textarea: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "vertical",
      outline: "none"
    },
    select: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "1rem",
      backgroundColor: "white",
      outline: "none"
    },
    errorText: {
      color: "#dc3545",
      fontSize: "0.85rem",
      marginTop: "5px"
    },
    hintText: {
      color: "#666",
      fontSize: "0.85rem",
      marginTop: "5px",
      fontStyle: "italic"
    },
    wordCount: {
      textAlign: "right",
      fontSize: "0.85rem",
      color: "#666",
      marginTop: "5px"
    },
    budgetDisplay: {
      marginTop: "10px",
      padding: "10px",
      backgroundColor: "#f0f0f0",
      borderRadius: "5px",
      fontSize: "1.1rem",
      fontWeight: "500",
      color: "#333"
    },
    submitButton: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "20px"
    },
    submitButtonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed"
    },
    successMessage: {
      padding: "15px",
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
      borderRadius: "5px",
      marginBottom: "20px",
      textAlign: "center"
    },
    errorMessage: {
      padding: "15px",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
      borderRadius: "5px",
      marginBottom: "20px",
      textAlign: "center"
    },
    emailSuggestions: {
      marginTop: "5px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "5px",
      border: "1px solid #e9ecef"
    },
    suggestionItem: {
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "3px",
      transition: "background-color 0.2s ease"
    },
    footer: {
      backgroundColor: "#1a1a1a",
      color: "#999",
      padding: "40px 0 20px",
      marginTop: "60px"
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 15px" : "0 30px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gap: "30px"
    },
    footerSection: {
      marginBottom: isMobile ? "30px" : "0"
    },
    footerTitle: {
      color: "white",
      fontSize: "1.1rem",
      marginBottom: "15px",
      fontWeight: "600"
    },
    footerLink: {
      color: "#999",
      textDecoration: "none",
      display: "block",
      marginBottom: "8px",
      transition: "color 0.3s ease"
    },
    footerBottom: {
      textAlign: "center",
      paddingTop: "20px",
      marginTop: "20px",
      borderTop: "1px solid #333",
      fontSize: "0.9rem"
    }
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
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          ArchitectStudio
        </Link>
        <div style={styles.navItems}>
          {tabItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{
                ...styles.navLink,
                borderBottom: item.id === "contact" ? "2px solid #007bff" : "none"
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          style={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="menu-button"
        >
          ☰
        </button>
      </nav>

      <div style={styles.mobileMenu} className="mobile-menu">
        {tabItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            style={styles.mobileNavItem}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Contact Us</h1>
        <p style={styles.headerSubtitle}>
          Get in touch with our team of expert architects. We're here to bring your vision to life.
        </p>
      </header>

      <main style={styles.container}>
        <div style={styles.contactSection}>
          <div style={styles.contactInfo}>
            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>📍</div>
              <div style={styles.infoContent}>
                <h3 style={styles.infoTitle}>Visit Us</h3>
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
                  +91 98765 43210<br />
                  +91 22 1234 5678
                </p>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>✉️</div>
              <div style={styles.infoContent}>
                <h3 style={styles.infoTitle}>Email Us</h3>
                <p style={styles.infoText}>
                  info@architectstudio.com<br />
                  projects@architectstudio.com
                </p>
              </div>
            </div>

            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>🕒</div>
              <div style={styles.infoContent}>
                <h3 style={styles.infoTitle}>Working Hours</h3>
                <p style={styles.infoText}>
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div style={styles.contactForm} className="form-box">
            {submitStatus === "success" && (
              <div style={styles.successMessage}>
                Thank you for contacting us! We'll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === "error" && (
              <div style={styles.errorMessage}>
                {errors.submit || "Something went wrong. Please try again."}
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
                    borderColor: errors.name ? "#dc3545" : "#ddd"
                  }}
                />
                {errors.name && <div style={styles.errorText}>{errors.name}</div>}
                {formData.name && !errors.name && (
                  <div style={styles.hintText}>
                    {formData.name.trim().split(" ").length < 2 ? "Please enter your full name" : "✓ Valid name format"}
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email Address <span style={styles.required}>*</span>
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
                    borderColor: errors.email ? "#dc3545" : "#ddd"
                  }}
                />
                {errors.email && <div style={styles.errorText}>{errors.email}</div>}
                {getEmailHint(formData.email) && (
                  <div style={styles.errorText}>{getEmailHint(formData.email)}</div>
                )}
                {formData.email && !errors.email && formData.email.includes('@') && formData.email.toLowerCase().endsWith('.com') && (
                  <div style={styles.hintText}>✓ Valid .com email format</div>
                )}
                
                {emailSuggestions && (
                  <div style={styles.emailSuggestions}>
                    <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "5px" }}>
                      Did you mean:
                    </div>
                    {emailSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        style={{
                          ...styles.suggestionItem,
                          backgroundColor: "#fff"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e9ecef"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
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
                  Mobile Number <span style={styles.required}>*</span>
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
                    borderColor: errors.phone ? "#dc3545" : "#ddd"
                  }}
                />
                {errors.phone && <div style={styles.errorText}>{errors.phone}</div>}
                {formData.phone && !errors.phone && (
                  <div style={styles.hintText}>✓ Valid Indian mobile number</div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Project Budget (₹) <span style={styles.required}>*</span>
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
                    borderColor: errors.budget ? "#dc3545" : "#ddd"
                  }}
                />
                {errors.budget && <div style={styles.errorText}>{errors.budget}</div>}
                {formData.budget && !errors.budget && (
                  <>
                    <div style={styles.budgetDisplay}>
                      Estimated budget: {formatIndianCurrency(formData.budget)}
                    </div>
                    <div style={styles.hintText}>
                      Minimum: ₹1,00,000 | Maximum: ₹10,00,00,000
                    </div>
                  </>
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
                    borderColor: errors.projectType ? "#dc3545" : "#ddd"
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
                {errors.projectType && <div style={styles.errorText}>{errors.projectType}</div>}
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
                    borderColor: errors.subject ? "#dc3545" : "#ddd"
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
                {errors.subject && <div style={styles.errorText}>{errors.subject}</div>}
              </div>

              {showOtherSubject && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Please specify your subject <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="otherSubject"
                    value={formData.otherSubject}
                    onChange={handleChange}
                    placeholder="Enter your subject"
                    style={{
                      ...styles.input,
                      borderColor: errors.otherSubject ? "#dc3545" : "#ddd"
                    }}
                  />
                  {errors.otherSubject && <div style={styles.errorText}>{errors.otherSubject}</div>}
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
                  placeholder="Please provide details about your project..."
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message ? "#dc3545" : "#ddd"
                  }}
                />
                {errors.message && <div style={styles.errorText}>{errors.message}</div>}
                {formData.message && (
                  <>
                    <div style={styles.wordCount}>
                      Words: {getWordCount(formData.message)} / 5 (minimum)
                    </div>
                    <div style={styles.wordCount}>
                      Characters: {formData.message.length} / 1000
                    </div>
                  </>
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
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>About Us</h3>
            <p style={{ color: "#999", lineHeight: 1.6 }}>
              We are a team of passionate architects dedicated to creating sustainable and innovative designs that inspire and endure.
            </p>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/about" style={styles.footerLink}>About</Link>
            <Link to="/services" style={styles.footerLink}>Services</Link>
            <Link to="/projects" style={styles.footerLink}>Projects</Link>
            <Link to="/contact" style={styles.footerLink}>Contact</Link>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Services</h3>
            <Link to="/services" style={styles.footerLink}>Architectural Design</Link>
            <Link to="/services" style={styles.footerLink}>Interior Design</Link>
            <Link to="/services" style={styles.footerLink}>Urban Planning</Link>
            <Link to="/services" style={styles.footerLink}>Sustainable Design</Link>
            <Link to="/services" style={styles.footerLink}>Consultation</Link>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Connect With Us</h3>
            <a href="#" style={styles.footerLink}>Facebook</a>
            <a href="#" style={styles.footerLink}>Instagram</a>
            <a href="#" style={styles.footerLink}>LinkedIn</a>
            <a href="#" style={styles.footerLink}>Twitter</a>
            <a href="#" style={styles.footerLink}>Pinterest</a>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>© 2024 ArchitectStudio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;