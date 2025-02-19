import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { HiOutlineArchive } from 'react-icons/hi';
import { Button } from '@mui/material';
import { airCallActiveStepAtom } from '../../atom/aircall.atoms.jsx';
import { API_BASE_URL } from '../../utils/api';
import SnackBar from '../SnackBar/SnackBar.jsx';

const StateChangeComponent = ({ airCall }) => {
  const airCallState = useAtomValue(airCallActiveStepAtom);
  const [snackBarMessage, setSnackBarMessage] = useState ('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState('error');
  const stateChangeCall = async () => {
    try {
      const callIds = airCall.filter(
        (call) => call.is_archived === (airCallState === 'Archive')
      );
      await Promise.all(
        callIds.map((call) => archiveCall(call.id, airCallState))
      );
    } catch (error) {
      console.error('Error processing all calls:', error);
    }
  };

  const archiveCall = async (callId, currentCallState) => {
    const bodyContent =
      currentCallState === 'Archive'
        ? { is_archived: false }
        : { is_archived: true };
    const response = await fetch(`${API_BASE_URL}/activities/${callId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContent),
    });
    if (!response.ok) { 
      setSnackBarMessage(`Failed to fetch ${callId} call`);
      setSnackBarSeverity('error');
      setSnackBarOpen(true);
    }
  };
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };
  return (
    <div>
      <Button className="call-container">
        <div className="call-container-left" onClick={() => stateChangeCall()}>
          <HiOutlineArchive size={20} />
          {airCallState === 'Archive' ? (
            <p>Activity all calls</p>
          ) : (
            <p>Archive all calls</p>
          )}
        </div>
      </Button>
      <SnackBar 
        open={snackBarOpen} 
        onClose={handleCloseSnackBar} 
        message={snackBarMessage} 
        severity={snackBarSeverity}
      />
    </div>
  );
};

export default StateChangeComponent;
