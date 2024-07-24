import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { VscSettingsGear } from 'react-icons/vsc';
import { PiDotsNineBold } from 'react-icons/pi';
import './css/footer.css';
import { colorAtom, currentPageHandlerAtom } from './atom/aircall.atoms';
import { useAtomValue, useSetAtom } from 'jotai';
const Footer = () => {
  const currentColor = useAtomValue(colorAtom);
  const updatePage = useSetAtom(currentPageHandlerAtom);
  return (
    <div className="footer-container">
      <IoMdCall onClick={()=>updatePage('Call')} />
      <GoPerson onClick={()=>updatePage('PeopleList')}/>
      <PiDotsNineBold  onClick={()=>updatePage('KeyPad')}/>
      <VscSettingsGear onClick={()=>updatePage('Setting')}/>
      <div className={`footer-color-indicator ${currentColor}`}></div>
    </div>
  );
};

export default Footer;
