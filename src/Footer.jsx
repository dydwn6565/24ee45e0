import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { GoPerson } from 'react-icons/go';
import { VscSettingsGear } from 'react-icons/vsc';
import { PiDotsNineBold } from 'react-icons/pi';
import './css/footer.css';
import {
  colorAtom,
  currentPageHandlerAtom,
  currentTotalCallStateAtom,
} from './atom/aircall.atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import CallCountCircle from './components/PhoneNumberListPage/CallCountCircle';
const Footer = () => {
  const currentColor = useAtomValue(colorAtom);
  const currentTotalCalls = useAtomValue(currentTotalCallStateAtom);
  const updatePage = useSetAtom(currentPageHandlerAtom);
  return (
    <div className="footer-container">
      <div className="call-icon-wrapper">
        <IoMdCall className="icon" onClick={() => updatePage('Call')} />
        <CallCountCircle
          className="footer-total-call-number-conter"
          count={currentTotalCalls}
        />
      </div>
      <GoPerson className="icon" onClick={() => updatePage('PhonNumber')} />
      <PiDotsNineBold className="icon" onClick={() => updatePage('KeyPad')} />
      <VscSettingsGear className="icon" onClick={() => updatePage('Setting')} />
      <div className={`footer-color-indicator ${currentColor}`}></div>
    </div>
  );
};

export default Footer;
