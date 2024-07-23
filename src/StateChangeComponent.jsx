import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react'
import { HiOutlineArchive } from "react-icons/hi";
import { airCallActiveHandleAtom, airCallActiveStepAtom } from './atom/aircall.atoms';
const StateChangeComponent = ({airCall}) => {
  const updateAirCallState = useSetAtom(airCallActiveHandleAtom);
  const airCallState = useAtomValue(airCallActiveStepAtom);
  const archiveCall = async (callId) => {
    try {
      const bodyContent = airCallState === "Archive" ? { is_archived: true } : { is_archived: false };
      const response = await fetch(`https://aircall-backend.onrender.com/activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyContent),
      })
      if (!response.ok) {
        throw new Error(`Failed to archive call ${callId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error archiving call ${callId}:`, error);
    }
  };

  const stateChangeCall = async () => {

    try {

      const callIds = airCall.filter(call => call.is_archived === airCallState);
      console.log(callIds);
      await Promise.all(callIds.map(id => archiveCall(id)));
      updateAirCallState(airCallState);
      console.log('All calls archived successfully');
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  return (
    <div className='call-container'>
      <div className='call-container-left' onClick={()=>stateChangeCall()}>
        <HiOutlineArchive size={20}/>
        {airCallState &&  <p>{airCallState} all calls</p>}
        
      </div>
    </div>
  )
}

export default StateChangeComponent
