import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <img src={assets.logo_dark} alt="logo" className="footer-logo" />
          <p className="footer-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div className="footer-section">
          <h2 className="footer-heading">Company</h2>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h2 className="footer-heading">Subscribe to our newsletter</h2>
          <p className="footer-note">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <p className="footer-bottom">Copyright 2025 © TalentSprint. All Rights Reserved. </p>
    </footer>
  );
};

export default Footer;
