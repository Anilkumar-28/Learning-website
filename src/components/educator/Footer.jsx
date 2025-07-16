import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="edufooter">
      <div className="edufooter-left">
        <img className="edufooter-logo" src={assets.logo} alt="logo" />
        <div className="edufooter-divider"></div>
        <p className="edufooter-text">Copyright 2025 @ Talentsprint. All Right Reserved.</p>
      </div>
      <div className="edufooter-socials">
        <a href="#"><img src={assets.facebook_icon} alt="facebook" /></a>
        <a href="#"><img src={assets.twitter_icon} alt="twitter" /></a>
        <a href="#"><img src={assets.instagram_icon} alt="instagram" /></a>
      </div>
    </footer>
  );
};

export default Footer;
