import React, { useState, useEffect } from 'react';

// Header component (identical to Privacy Policy header)
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) closeMenu();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.overlay}></div>
      <div style={headerStyles.logo}>
        <a href="/" style={headerStyles.logoLink}>ARCTITECH</a>
      </div>

      <div style={headerStyles.hamburger} onClick={toggleMenu}>
        <span style={headerStyles.bar}></span>
        <span style={headerStyles.bar}></span>
        <span style={headerStyles.bar}></span>
      </div>

      <nav
        className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
        style={headerStyles.nav}
      >
        <a href="/" className="nav-link" style={headerStyles.link} onClick={closeMenu}>Home</a>
        <a href="/about" className="nav-link" style={headerStyles.link} onClick={closeMenu}>About</a>
        <a href="/contact" className="nav-link" style={headerStyles.link} onClick={closeMenu}>Contact</a>
        <a href="/services" className="nav-link" style={headerStyles.link} onClick={closeMenu}>Services</a>
        <a href="/project" className="nav-link" style={headerStyles.link} onClick={closeMenu}>Project</a>
        <a href="/appointment" className="nav-link" style={headerStyles.link} onClick={closeMenu}>Appointment</a>
      </nav>
    </header>
  );
};

// Footer component (identical)
const Footer = () => {
  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.content}>
        <p style={footerStyles.copyright}>
          © {new Date().getFullYear()} ARCTITECH. All rights reserved.
        </p>
        <div style={footerStyles.links}>
          <a href="/PrivacyPolicy" className="footer-link" style={footerStyles.link}>Privacy Policy</a>
          <a href="/terms" className="footer-link" style={footerStyles.link}>Terms of Service</a>
          <a href="/contact" className="footer-link" style={footerStyles.link}>Contact Us</a>

        </div>
      </div>
    </footer>
  );
};

// Main Terms and Conditions component
const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div style={styles.pageWrapper}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Terms and Conditions</h1>
          <p style={styles.effectiveDate}>
            <strong>Effective date: 2nd March 2026</strong>
          </p>

          <div style={styles.content}>
            <p style={styles.paragraph}>
              Welcome to ARCTITECH. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use our services.
            </p>

            <h2 style={styles.subheading}>1. Acceptance of Terms</h2>
            <p style={styles.paragraph}>
              By accessing the website of ARCTITECH, you confirm that you accept these terms and conditions and that you agree to comply with them. If you do not agree, you must not use our website.
            </p>

            <h2 style={styles.subheading}>2. Changes to Terms</h2>
            <p style={styles.paragraph}>
              We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the revised terms.
            </p>

            <h2 style={styles.subheading}>3. Use of Our Services</h2>
            <p style={styles.paragraph}>
              You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
            </p>

            <h2 style={styles.subheading}>4. Intellectual Property</h2>
            <p style={styles.paragraph}>
              All content on this website, including text, graphics, logos, images, and software, is the property of ARCTITECH or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>

            <h2 style={styles.subheading}>5. Limitation of Liability</h2>
            <p style={styles.paragraph}>
              ARCTITECH will not be liable for any direct, indirect, incidental, or consequential damages arising out of your use or inability to use our website or services, even if we have been advised of the possibility of such damages.
            </p>

            <h2 style={styles.subheading}>6. Third-Party Links</h2>
            <p style={styles.paragraph}>
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them.
            </p>

            <h2 style={styles.subheading}>7. Governing Law</h2>
            <p style={styles.paragraph}>
              These terms shall be governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Hyderabad.
            </p>

            <h2 style={styles.subheading}>8. Contact Information</h2>
            <p style={styles.paragraph}>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p style={styles.paragraph}>
              Email: <a href="mailto:legal@arctitech.com" style={styles.link}>legal@arctitech.com</a><br />
              Phone: +91 123 456 7890<br />
              Address: Hyderabad, India
            </p>

            <p style={styles.paragraph}>
              By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
      <Footer />

      <style>{`
        .nav-link {
          transition: color 0.2s ease, border-bottom-color 0.2s ease;
        }
        .nav-link:hover {
          color: #2d7a6e;
          border-bottom-color: #2d7a6e;
        }
        .footer-link {
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          header > div:first-child + div {
            display: flex !important;
          }

          nav.nav-menu {
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background-color: #605e5e;
            flex-direction: column;
            align-items: center;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 1000;
            border-bottom: 1px solid #5b5f64;
            display: flex;
          }

          nav.nav-menu.open {
            max-height: 300px;
            padding: 10px 0;
          }

          nav.nav-menu a {
            width: 100%;
            text-align: center;
            padding: 15px 0;
            border-bottom: 1px solid #7a7f85;
          }

          nav.nav-menu a:last-child {
            border-bottom: none;
          }

          .card {
            padding: 30px 20px !important;
          }
          h1 {
            font-size: 2.2rem !important;
          }
          footer > div {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

// Styles for the main content (matching Privacy Policy)
const styles = {
  pageWrapper: {
    backgroundColor: '#d5d6d8',
    padding: '40px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f0ecec',
    borderRadius: '24px',
    boxShadow: '0 20px 40px -10px rgba(0, 20, 30, 0.15)',
    padding: '48px 56px',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: '8px',
    textAlign: 'center',
    color: '#101416',
    letterSpacing: '-0.02em',
    borderBottom: '4px solid #2d7a6e',
    display: 'inline-block',
    paddingBottom: '12px',
    width: '100%',
  },
  effectiveDate: {
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '32px',
    color: '#5f6b7a',
    fontWeight: '500',
  },
  content: {
    marginTop: '20px',
  },
  subheading: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#1e2b3a',
  },
  paragraph: {
    marginBottom: '24px',
    lineHeight: '1.7',
    fontSize: '1.05rem',
    color: '#2c3e50',
    textAlign: 'justify',
  },
  link: {
    color: '#2d7a6e',
    textDecoration: 'none',
    borderBottom: '1px dotted #2d7a6e',
  },
};

// Header-specific styles (with background image)
const headerStyles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#605e5e',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottom: '1px solid #5b5f64',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    flexWrap: 'wrap',
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    zIndex: 2,
  },
  logoLink: {
    textDecoration: 'none',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '5px',
    zIndex: 2,
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#ffffff',
    margin: '3px 0',
    borderRadius: '2px',
  },
  nav: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    zIndex: 2,
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
    paddingBottom: '4px',
  },
};

// Footer-specific styles (identical)
const footerStyles = {
  container: {
    backgroundColor: '#1e2b3a',
    color: '#ffffff',
    padding: '40px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  copyright: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#cbd5e0',
  },
  links: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  link: {
    color: '#cbd5e0',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
};

export default TermsAndConditions;