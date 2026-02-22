import React from 'react';
import './MGP_Banner.css';

import mgp_bg from '../../../assets/images/mgp_index/mgp_banner/mgp_bg.png';
import mgp_logo from '../../../assets/images/mgp_index/mgp_banner/mgp_logo.png';

const MGP_Banner = () => {
  return (
    <section className="mgp-banner">
      <img src={mgp_bg} alt="MGP Background" className="banner-bg" />
      <div className="banner-overlay">
        <img src = {mgp_logo} alt="MGP Title" className="banner-title" />
      </div>
    </section>
  );
};

export default MGP_Banner;
