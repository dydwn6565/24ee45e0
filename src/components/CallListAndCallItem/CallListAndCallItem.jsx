import React, { useEffect, useState } from 'react';
import './CallListAndCallItem.css';
import CallMenu from './CallMenu.jsx';
import { currentAirCallHeaderStateAtom } from '../../atom/aircall.atoms.jsx';
import { useAtomValue } from 'jotai';
import RenderGropuedCallsComponent from './RenderGroupedCallsComponent.jsx';

const CallListAndCallItem = ({ airCall, state }) => {
  const [filteredActivityCall, setFilteredActivityCall] = useState([]);
  const [filteredArchivedCall, setFilteredArchivedCall] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const headerAirCallState = useAtomValue(currentAirCallHeaderStateAtom);
  useEffect(() => {
    const filteredActivityCalls = () => {
      const filteredData = airCall.filter((item) => item.is_archived === false);
      setFilteredActivityCall(filteredData);
    };
    filteredActivityCalls();
  }, [airCall, state]);

  useEffect(() => {
    const filteredArchivedCalls = () => {
      const filteredData = airCall.filter((item) => item.is_archived === true);
      setFilteredArchivedCall(filteredData);
    };
    filteredArchivedCalls();
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
      console.log('Network response was not ok.');
    }

    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {headerAirCallState === 'InBox' ? (
        <RenderGropuedCallsComponent
          filteredAirCall={filteredActivityCall}
          handleClick={handleClick}
        />
      ) : headerAirCallState === 'Archive' ? (
        <RenderGropuedCallsComponent
          filteredAirCall={filteredArchivedCall}
          handleClick={handleClick}
        />
      ) : (
        <RenderGropuedCallsComponent
          filteredAirCall={airCall}
          handleClick={handleClick}
        />
      )}
      {(headerAirCallState === 'InBox' || headerAirCallState === 'Archive') && (
        <CallMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onMenuItemClick={handleMenuItemClick}
          selectedCallId={selectedCallId}
          airCall={airCall}
        />
      )}
    </div>
  );
};

export default CallListAndCallItem;
