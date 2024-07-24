import React, { useEffect, useState } from 'react';
import './CallListAndCallItem.css';
import CallMenu from './CallMenu.jsx';
import { currentAirCallHeaderStateAtom } from '../../atom/aircall.atoms.jsx';
import { useAtomValue } from 'jotai';
import RenderGropuedCallsComponent from './RenderGroupedCallsComponent.jsx';
import { API_BASE_URL } from '../../utils/api.js';
import SnackBar from '../SnackBar/SnackBar.jsx';

const CallListAndCallItem = ({ airCall, state }) => {
  const [filteredActivityCall, setFilteredActivityCall] = useState([]);
  const [filteredArchivedCall, setFilteredArchivedCall] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [snackBarMessage, setSnackBarMessage] = useState ('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState('error');
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

  const handleExtendsComponentClick = (event, callId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCallId(callId);
  };

  const handleExtendsComponentClose = () => {
    setAnchorEl(null);
    setSelectedCallId(null);
  };

  const handleMenuItemClick = async (option, selectedCallId) => {
    const bodyContent =
      option === 'Archive' ? { is_archived: true } : { is_archived: false };
    const response = await fetch(
      `${API_BASE_URL}/activities/${selectedCallId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
      }
    );

    if (!response.ok) {
      setSnackBarMessage(`Failed to fetch ${selectedCallId} call`);
      setSnackBarSeverity('error');
      setSnackBarOpen(true);
    }
    handleExtendsComponentClose();
  };

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {headerAirCallState === 'InBox' ? (
        <RenderGropuedCallsComponent
          filteredAirCall={filteredActivityCall}
          handleClick={handleExtendsComponentClick}
        />
      ) : headerAirCallState === 'Archive' ? (
        <RenderGropuedCallsComponent
          filteredAirCall={filteredArchivedCall}
          handleClick={handleExtendsComponentClick}
        />
      ) : (
        <RenderGropuedCallsComponent
          filteredAirCall={airCall}
          handleClick={handleExtendsComponentClick}
        />
      )}
      {(headerAirCallState === 'InBox' || headerAirCallState === 'Archive') && (
        <CallMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleExtendsComponentClose}
          onMenuItemClick={handleMenuItemClick}
          selectedCallId={selectedCallId}
          airCall={airCall}
        />
      )}
      <SnackBar 
        open={snackBarOpen} 
        onClose={handleCloseSnackBar} 
        message={snackBarMessage} 
        severity={snackBarSeverity}
      />
    </div>
  );
};

export default CallListAndCallItem;
