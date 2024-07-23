// src/components/CallListAndCallItem.js
import React, { useEffect, useState } from 'react';
import '../src/css/CallListAndCallItem.css';
import { Box } from '@mui/system';
import CallItem from './CallItem.jsx';
import CallMenu from './CallMenu.jsx';
import { Divider, Typography } from '@mui/material';

const CallListAndCallItem = ({ airCall, state }) => {
  const [filteredAirCall, setFilteredAirCall] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCallId, setSelectedCallId] = useState(null);

  useEffect(() => {
    const filteredAirCallByState = () => {
      const filteredData = airCall.filter((item) => item.is_archived === state);
      setFilteredAirCall(filteredData);
    };
    filteredAirCallByState();
  }, [airCall, state]);

  const getDateOnly = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}, ${day} ${year}`;
  };

  const handleClick = (event, callId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCallId(callId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCallId(null);
  };

  const handleMenuItemClick = async (option, selectedCallId) => {
      const bodyContent = option === "Activity" ? { is_archived: false } : { is_archived: true };
      try {
        const response = await fetch(`https://aircall-backend.onrender.com/activities/${selectedCallId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyContent),
        });
        // {console.log(bodyContent)}
        {console.log(airCall)}
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
      } catch(error){
        console.error(`Error archiving call ${callId}:`, error);
      }
     
    
    console.log(`Selected option: ${option} for call ID: ${selectedCallId}`);
    handleClose(); 
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {filteredAirCall.length > 0 ? (
        filteredAirCall.map((activity, index) => {
          const previousActivity = index > 0 ? filteredAirCall[index - 1] : null;
          const currentDate = getDateOnly(activity.created_at);
          const previousDate = previousActivity ? getDateOnly(previousActivity.created_at) : null;

          return (
            <div key={activity.id}>
              {index === 0 || currentDate !== previousDate ? (
                <Box className="divide-line">
                  <Divider className='dot-divider' />
                  <Typography className='lightgrey-text'>{currentDate}</Typography>
                  <Divider className='dot-divider' />
                </Box>
              ) : null}
              <CallItem activity={activity} onClick={handleClick} />
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      <CallMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onMenuItemClick={handleMenuItemClick}
        selectedCallId={selectedCallId}
        airCall={airCall}
      />
    </div>
  );
};

export default CallListAndCallItem;
