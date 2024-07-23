import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { VscSettingsGear } from 'react-icons/vsc';
import { PiDotsNineBold } from 'react-icons/pi';
import './css/footer.css';
import { colorAtom } from './atom/aircall.atoms';
import { useAtomValue } from 'jotai';
const Footer = () => {
  const currentColor = useAtomValue(colorAtom);
  return (
    <div className="footer-container">
      <IoMdCall />
      <GoPerson />
      <PiDotsNineBold />
      <VscSettingsGear />
      <div className={`footer-color-indicator ${currentColor}`}></div>
    </div>
  );
};

export default Footer;
