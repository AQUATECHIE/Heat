import { useState } from "react";
import "../styles/Footer.css";
import { FaArrowRight, FaEnvelope, FaPhone, FaInstagram } from "react-icons/fa";
import api from "../api/axios";

const Footer = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

 const handleSubscribe = async () => {

  if (!email) {
    setMessage("Please enter email");
    return;
  }

  try {

    const { data } = await api.post("/newsletter", {
      email
    });

    setMessage(data.message);
    setEmail("");

  } catch (error) {

    console.log(error);

    setMessage(
      error.response?.data?.message || "Subscription failed"
    );

  }
};

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

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <FaArrowRight
            className="arrow-icon"
            onClick={handleSubscribe}
          />

        </div>

        {message && (
          <p className="newsletter-message">{message}</p>
        )}

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