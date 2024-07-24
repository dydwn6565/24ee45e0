import React, { useState } from 'react';
import { Button } from '@mui/material';
import { PiDotsThreeVerticalThin } from 'react-icons/pi';
import './css/callItem.css';
import CallStatusIcon from './CallStatusIcon';
import CallCountCircle from './CallCountCircle';

const CallItem = ({ activity, onClick, allCalls, count }) => {
  const [isHovered, setIsHovered] = useState(false);
  const getTimeOnly = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    };
    return date.toLocaleTimeString('en-US', options);
  };

  return (
    <div className="call-item-wrapper">
      <Button
        className="call-container"
        onClick={(event) => onClick(event, activity.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="call-container-left">
          <CallStatusIcon
            direction={activity.direction}
            callType={activity.call_type}
          />
          <div className="call-container-left-information">
            <div className="call-container-left-information-call">
              <div className="call-info">
                <div>{activity.from} </div>
                {count > 1 && (
                  // <div className="call-info-missed-call">
                  //   <div className="call-count-circle">{count}</div>
                  // </div>
                  <CallCountCircle count={count} />
                )}
              </div>
            </div>
            <div className="lightgrey-text">tried to call on {activity.to}</div>
          </div>
        </div>
        <div className="call-container-right">
          <PiDotsThreeVerticalThin />
          <div className="lightgrey-text">
            {getTimeOnly(allCalls[allCalls.length - 1].created_at)}
          </div>
        </div>
      </Button>
      {isHovered && count > 1 && (
        <div className="call-details-hover">
          <ul>
            {allCalls.map((call, index) => (
              <li key={index}>
                From: {call.from}, To: {call.to}, Time:{' '}
                {getTimeOnly(call.created_at)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CallItem;
