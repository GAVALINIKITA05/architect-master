import React, { useState, useEffect } from 'react';

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

// Footer component
const Footer = () => {
  return (
    <footer style={footerStyles.container}>
      <div style={footerStyles.content}>
        <p style={footerStyles.copyright}>
          © {new Date().getFullYear()} ARCTITECH. All rights reserved.
        </p>
        <div style={footerStyles.links}>
          <a href="/PrivacyPolicy" className="footer-link" style={footerStyles.link}>Privacy Policy</a>
          <a href="/TearmsCondition" className="footer-link" style={footerStyles.link}>Terms of Service</a>
          <a href="/contact" className="footer-link" style={footerStyles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

// Main Privacy Policy component
const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div style={styles.pageWrapper}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Privacy Policy</h1>
          <p style={styles.effectiveDate}>
            <strong>Effective date: 2nd March 2026</strong>
          </p>

          <div style={styles.content}>
            <p style={styles.paragraph}>
              At ARCTITECH, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 style={styles.subheading}>1. Information We Collect</h2>
            <p style={styles.paragraph}>
              We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. The personal information we collect may include:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Name and contact information (email address, phone number, mailing address)</li>
              <li style={styles.listItem}>Project preferences and requirements</li>
              <li style={styles.listItem}>Communication preferences</li>
              <li style={styles.listItem}>Any other information you choose to provide</li>
            </ul>

            <h2 style={styles.subheading}>2. How We Use Your Information</h2>
            <p style={styles.paragraph}>
              We use the information we collect or receive:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>To provide, operate, and maintain our website and services</li>
              <li style={styles.listItem}>To improve, personalize, and expand our website and services</li>
              <li style={styles.listItem}>To understand and analyze how you use our website</li>
              <li style={styles.listItem}>To develop new products, services, features, and functionality</li>
              <li style={styles.listItem}>To communicate with you, including for customer service, updates, and marketing purposes</li>
              <li style={styles.listItem}>To process your project inquiries and appointment requests</li>
              <li style={styles.listItem}>To send you architectural inspiration, newsletters, and promotional materials</li>
              <li style={styles.listItem}>To find and prevent fraud</li>
            </ul>

            <h2 style={styles.subheading}>3. Sharing Your Information</h2>
            <p style={styles.paragraph}>
              We may share your personal information in the following situations:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
              <li style={styles.listItem}><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              <li style={styles.listItem}><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              <li style={styles.listItem}><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, or legal proceedings.</li>
            </ul>

            <h2 style={styles.subheading}>4. Cookies and Tracking Technologies</h2>
            <p style={styles.paragraph}>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on our website to help customize the site and improve your experience. When you access our website, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of our website.
            </p>

            <h2 style={styles.subheading}>5. Data Security</h2>
            <p style={styles.paragraph}>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. We cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
            </p>

            <h2 style={styles.subheading}>6. Data Retention</h2>
            <p style={styles.paragraph}>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
            </p>

            <h2 style={styles.subheading}>7. Your Privacy Rights</h2>
            <p style={styles.paragraph}>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>The right to access and receive a copy of your personal information</li>
              <li style={styles.listItem}>The right to request rectification or erasure of your personal information</li>
              <li style={styles.listItem}>The right to restrict or object to processing of your personal information</li>
              <li style={styles.listItem}>The right to data portability</li>
              <li style={styles.listItem}>The right to withdraw consent at any time</li>
            </ul>
            <p style={styles.paragraph}>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>

            <h2 style={styles.subheading}>8. Children's Privacy</h2>
            <p style={styles.paragraph}>
              Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us.
            </p>

            <h2 style={styles.subheading}>9. Third-Party Websites</h2>
            <p style={styles.paragraph}>
              Our website may contain links to third-party websites, including social media platforms. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to read the privacy policies of any third-party websites you visit.
            </p>

            <h2 style={styles.subheading}>10. International Data Transfers</h2>
            <p style={styles.paragraph}>
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. By using our website and services, you consent to the transfer of your information to countries outside your country of residence.
            </p>

            <h2 style={styles.subheading}>11. Updates to This Privacy Policy</h2>
            <p style={styles.paragraph}>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Effective Date" and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.
            </p>

            <h2 style={styles.subheading}>12. Contact Us</h2>
            <p style={styles.paragraph}>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p style={styles.paragraph}>
              <strong>ARCTITECH</strong><br />
              Email: <a href="mailto:privacy@arctitech.com" style={styles.link}>privacy@arctitech.com</a><br />
              Phone: +91 123 456 7890<br />
              Address: Hyderabad, India
            </p>

            <p style={styles.paragraph}>
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />

      </>
  );
};

// Styles for the main content
const styles = {
  pageWrapper: {
    backgroundColor: '#d5d6d8',
    padding: '40px 20px',
    fontFamily: "Open Sans",
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
    fontWeight: '600',
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
    fontWeight: '600',
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
  list: {
    marginBottom: '24px',
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '12px',
    lineHeight: '1.7',
    fontSize: '1.05rem',
    color: '#2c3e50',
  },
};

// Header-specific styles
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
    fontWeight: '600',
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
    fontWeight: '600',
    borderBottom: '2px solid transparent',
    paddingBottom: '4px',
  },
};

// Footer-specific styles
const footerStyles = {
  container: {
    backgroundColor: '#1e2b3a',
    color: '#ffffff',
    padding: '40px 20px',
    fontFamily: "Open Sans",
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

export default PrivacyPolicy;