import "../styles/Footer.css";
import { FaArrowRight, FaEnvelope, FaPhone, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Newsletter */}
      <div className="newsletter">
        <h3>SIGN UP FOR HEAT ONLY UPDATES</h3>
        <p>
          By entering your email address below, you consent to receiving our
          newsletter with access to our latest collections, events and initiatives.
        </p>

        <div className="newsletter-input">
          <input type="email" placeholder="Email" />
          <FaArrowRight className="arrow-icon" />
        </div>
      </div>

      {/* Contact */}
      <div className="footer-section">
        <h4>CONTACT</h4>

        <div className="contact-item">
          <FaEnvelope />
          <span>Info.admin@heatonlykickcollectibles.com</span>
        </div>

        <div className="contact-item">
          <FaPhone />
          <span>+27665394231</span>
        </div>
      </div>

      {/* Social */}
      <div className="footer-section">
        <h4>SOCIAL</h4>
        <FaInstagram className="social-icon" />
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2026 Heatonly. All rights reserved
      </div>

    </footer>
  );
};

export default Footer;