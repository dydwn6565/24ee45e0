import { useAtomValue } from 'jotai';
import React from 'react';
import { HiOutlineArchive } from 'react-icons/hi';
import {
  airCallActiveStepAtom,
} from './atom/aircall.atoms';

const StateChangeComponent = ({ airCall }) => {
  const airCallState = useAtomValue(airCallActiveStepAtom);

  const stateChangeCall = async () => {
    try {
      console.log('StateChangeCall function called with state:', airCallState);
      const callIds = airCall.filter(
        (call) => call.is_archived === (airCallState === 'Archive')
      );
      console.log(
        'Filtered call IDs:',
        callIds.map((call) => call.id)
      );
      await Promise.all(
        callIds.map((call) => archiveCall(call.id, airCallState))
      );
      // updateAirCallState(airCallState === "Archive" ? "Activity" : "Archive");
      console.log('All calls processed successfully');
    } catch (error) {
      console.error('Error processing all calls:', error);
    }
  };

  const archiveCall = async (callId, currentCallState) => {
    try {
      console.log('Archiving call ID:', currentCallState);
      const bodyContent =
        currentCallState === 'Archive'
          ? { is_archived: false }
          : { is_archived: true };
      console.log('Request body:', bodyContent);
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
        throw new Error(
          `Failed to archive call ${callId}: ${response.statusText} - ${errorText}`
        );
      }
      console.log(`Successfully archived call ID: ${callId}`);
    } catch (error) {
      console.error(`Error archiving call ${callId}:`, error);
    }
  };
  return (
    <div className="call-container">
      <div className="call-container-left" onClick={() => stateChangeCall()}>
        <HiOutlineArchive size={20} />
        {airCallState === 'Archive' ? (
          <p>Activity all calls</p>
        ) : (
          <p>Archive all calls</p>
        )}
      </div>
    </div>
  );
};

export default StateChangeComponent;
