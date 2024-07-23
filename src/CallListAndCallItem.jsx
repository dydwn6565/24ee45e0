// src/components/CallListAndCallItem.js
import React, { useEffect, useState } from 'react';
import '../src/css/CallListAndCallItem.css';
import CallMenu from './CallMenu.jsx';
import { currentAirCallHeaderStateAtom } from './atom/aircall.atoms.jsx';
import { useAtomValue } from 'jotai';
import RenderGropuedCallsComponent from './RenderGropuedCallsComponent.jsx';

const CallListAndCallItem = ({ airCall, state }) => {
  const [filteredAirCall, setFilteredAirCall] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const headerAirCallState = useAtomValue(currentAirCallHeaderStateAtom);
  useEffect(() => {
    const filteredAirCallByState = () => {
      const filteredData = airCall.filter((item) => item.is_archived === state);
      setFilteredAirCall(filteredData);
    };
    filteredAirCallByState();
  }, [airCall, state]);

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

  return (
    <div>
      {headerAirCallState === 'InBox' ? (
        <RenderGropuedCallsComponent
          filteredAirCall={filteredAirCall}
          handleClick={handleClick}
        />
      ) : (
        <RenderGropuedCallsComponent
          filteredAirCall={airCall}
          handleClick={handleClick}
        />
      )}
      {/* {Object.entries(groupByDate(filteredAirCall)).map(([date, callTypes]) => (
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
      ))} */}
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
