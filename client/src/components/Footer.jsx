import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Himalayan Nuts</h3>
        <p className="footer-tagline">Pure Crunch. Himalayan Touch.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Himalayan Nuts. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
