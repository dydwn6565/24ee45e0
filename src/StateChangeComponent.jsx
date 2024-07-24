import { useAtomValue } from 'jotai';
import React from 'react';
import { HiOutlineArchive } from 'react-icons/hi';
import { airCallActiveStepAtom } from './atom/aircall.atoms';
import { Button } from '@mui/material';

const StateChangeComponent = ({ airCall }) => {
  const airCallState = useAtomValue(airCallActiveStepAtom);

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
    const response = await fetch(
      `https://aircall-backend.onrender.com/activities/${callId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.log(
        `Failed to archive call ${callId}: ${response.statusText} - ${errorText}`
      );
    }
  
  };
  return (
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
  );
};

export default StateChangeComponent;
