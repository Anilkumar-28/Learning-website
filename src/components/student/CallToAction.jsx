import React from 'react';
import { assets } from '../../assets/assets';

const CallToAction = () => {
  return (
    <div className="cta-section">
      <h1 className="cta-heading">Learn anything, anytime, anywhere</h1>
      <p className="cta-subtext">Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className="cta-buttons">
        <button className="cta-primary-btn">Get started</button>
        <button className="cta-secondary-btn">
          Learn More <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
