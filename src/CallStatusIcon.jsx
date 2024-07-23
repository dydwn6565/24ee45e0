import React from 'react';
import {
  BsTelephoneInboundFill,
  BsTelephoneOutboundFill,
} from 'react-icons/bs';
import { HiPhoneMissedCall } from 'react-icons/hi';
import { MdPhoneMissed } from 'react-icons/md';
import './css/callStatusIcon.css';

const CallStatusIcon = ({ direction, callType }) => {
  const getIconClassName = () => {
    if (direction === 'inbound') {
      return callType === 'missed' ? 'icon-missed-inbound' : 'icon-inbound';
    } else if (direction === 'outbound') {
      return callType === 'missed' ? 'icon-missed-outbound' : 'icon-outbound';
    }
    return '';
  };

  return (
    <div className={`icon-container ${getIconClassName()}`}>
      {direction === 'inbound' && callType === 'missed' && (
        <HiPhoneMissedCall />
      )}
      {direction === 'inbound' && callType === 'answered' && (
        <BsTelephoneInboundFill />
      )}
      {direction === 'outbound' && callType === 'missed' && <MdPhoneMissed />}
      {direction === 'outbound' && callType === 'answered' && (
        <BsTelephoneOutboundFill />
      )}
    </div>
  );
};

export default CallStatusIcon;
