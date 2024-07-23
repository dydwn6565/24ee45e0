// src/components/CallItem.jsx
import React from 'react';
import { Button } from '@mui/material';
import { BsTelephoneInboundFill } from 'react-icons/bs';
import { PiDotsThreeVerticalThin } from 'react-icons/pi';

const CallItem = ({ activity, onClick, callCount,count }) => {
  const getTimeOnly = (isoDateString) => {
    
    const date = new Date(isoDateString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
      timeZone: 'UTC' 
    };
    return date.toLocaleTimeString('en-US', options);
  };
  return (
    <Button className='call-container' onClick={(event) => onClick(event, activity.id)}>
      <div className='call-container-left'>
        <BsTelephoneInboundFill />
        <div className='call-container-left-information'>
          <div>{activity.from} ({count} calls)</div>
          <div className='lightgrey-text'>tried to call on {activity.to}</div>
        </div>
      </div>
      <div className='call-container-right'>
        <PiDotsThreeVerticalThin />
        <div className='lightgrey-text'>{getTimeOnly(activity.created_at)}</div>
        
      </div>
    </Button>
  );
};



export default CallItem;
