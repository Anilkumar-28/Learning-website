import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  return (
    <div className="companies-section">
      <p className="companies-heading">Trusted by learners from</p>
      <div className="companies-logos">
        <img src={assets.microsoft_logo} alt="Microsoft" className="company-logo" />
        <img src={assets.walmart_logo} alt="Walmart" className="company-logo" />
        <img src={assets.accenture_logo} alt="Accenture" className="company-logo" />
        <img src={assets.adobe_logo} alt="Adobe" className="company-logo" />
        <img src={assets.paypal_logo} alt="PayPal" className="company-logo" />
      </div>
    </div>
  );
};

export default Companies;
