import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { VscSettingsGear } from 'react-icons/vsc';
import { PiDotsNineBold } from 'react-icons/pi';
import './css/footer.css';
const Footer = () => {
  return (
    <div className="footer-container">
      <IoMdCall />
      <GoPerson />
      <PiDotsNineBold />
      <VscSettingsGear />
      <div className="footer-color-indicator"></div>
    </div>
  );
};

export default Footer;
