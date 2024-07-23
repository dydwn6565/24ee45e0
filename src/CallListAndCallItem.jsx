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
    const year = date.getUTCFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
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
    const bodyContent =
      option === 'Archive' ? { is_archived: true } : { is_archived: false };

    try {
      const response = await fetch(
        `https://aircall-backend.onrender.com/activities/${selectedCallId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyContent),
        }
      );

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
    const fromToKey = `${call.from}-${call.to}`;

    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }
    if (!acc[dateKey][call.call_type]) {
      acc[dateKey][call.call_type] = {};
    }
    if (!acc[dateKey][call.call_type][fromToKey]) {
      acc[dateKey][call.call_type][fromToKey] = [];
    }
    acc[dateKey][call.call_type][fromToKey].push(call);
    return acc;
  }, {});

  

  return (
    <div>
      {Object.entries(groupedCallsByDate).map(([date, callTypes]) => (
        <div key={date}>
          <Box className="divide-line">
            <Divider className="dot-divider" />
            <Typography className="lightgrey-text">{date}</Typography>
            <Divider className="dot-divider" />
          </Box>
          {Object.entries(callTypes).map(([callType, fromToGroups]) => (
            <div key={callType}>
              {Object.entries(fromToGroups).map(([fromToKey, calls]) => {
                return (
                  <div key={fromToKey}>
                    <CallItem
                      key={fromToKey}
                      activity={calls[0]}
                      count={calls.length}
                      onClick={handleClick}
                      allCalls={calls}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
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
