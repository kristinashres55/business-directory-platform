import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-top">
        <div className="footer-section address">
          <h3>Address</h3>
          <p>📍 Toronto, Canada</p>
          <p>📞 +012 345 67890</p>
          <p>✉️ mail@business.com</p>
          <div className="social-icons">
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* <div className="footer-section">
          <h3>Quick Link</h3>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Career</li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Popular Link</h3>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Career</li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>📩</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Business Directory, All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Cookies</a>
          <a href="#">Help</a>
          <a href="#">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
