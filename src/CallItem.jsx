// src/components/CallItem.js
import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BsTelephoneInboundFill } from "react-icons/bs";
import { PiDotsThreeVerticalThin } from "react-icons/pi";
import CallMenu from './CallMenu';

const CallItem = ({ activity, onClick }) => {
  return (
    <div key={activity.id}>
      <Button className='call-container' onClick={(event) => onClick(event, activity.id)}>
        <div className='call-container-left'>
          <BsTelephoneInboundFill />
          <div className='call-container-left-information'>
            <div>{activity.from}</div>
            <div className='lightgrey-text'>tried to call on {activity.to}</div>
          </div>
        </div>
        <div className='call-container-right'>
          <PiDotsThreeVerticalThin />
          <div className='lightgrey-text'>{getTimeOnly(activity.created_at)}</div>
        </div>
      </Button>
    </div>
  );
};

const getTimeOnly = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleTimeString('en-US', options);
};

export default CallItem;
