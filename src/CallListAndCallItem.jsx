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
    return `${month} ${day}, ${year}`;
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
    const bodyContent = option === "Archive" ? { is_archived: false } : { is_archived: true };
    try {
      const response = await fetch(`https://aircall-backend.onrender.com/activities/${selectedCallId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(`Error updating call ${selectedCallId}:`, error);
    }

    console.log(`Selected option: ${option} for call ID: ${selectedCallId}`);
    handleClose();
  };

  const open = Boolean(anchorEl);

  const groupedCallsByDate = filteredAirCall.reduce((acc, call) => {
    const dateKey = getDateOnly(call.created_at);
    
  
    let fromToKey = `${call.from}-${call.to}`;
    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }
    if (!acc[dateKey][fromToKey]) {
      acc[dateKey][fromToKey] = [];
    }
    acc[dateKey][fromToKey].push(call);
    return acc;
  }, {});

  return (
    <div>
      <>
      {/* {console.log(airCall)} */}
      </>
      {Object.keys(groupedCallsByDate).length > 0 ? (
        
        Object.keys(groupedCallsByDate).map((date) => {
          const callsByFromTo = groupedCallsByDate[date];

          return (
            <div key={date}>
              <Box className="divide-line">
                <Divider className='dot-divider' />
                <Typography className='lightgrey-text'>{date}</Typography>
                <Divider className='dot-divider' />
              </Box>
              {Object.keys(callsByFromTo).map((fromToKey) => {
                const calls = callsByFromTo[fromToKey];
                const callCount = calls.length;
                const activity = calls[0]; // 대표 항목 선택

                return (
                  <CallItem
                    key={activity.id}
                    activity={activity}
                    onClick={(event) => handleClick(event, activity.id)}
                    callCount={callCount}
                  />
                );
              })}
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
