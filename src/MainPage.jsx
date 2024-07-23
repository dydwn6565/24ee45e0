import React, { useEffect, useState } from 'react';
import CallListAndCallItem from './CallListAndCallItem.jsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { airCallActiveHandleAtom, airCallActiveStepAtom } from './atom/aircall.atoms.jsx';
import './css/ActivityFeedPage.css'
import StateChangeComponent from './StateChangeComponent.jsx';

const MainPage = () => {
    const [airCall, setAirCall] = useState([]);
    const airCallState = useAtomValue(airCallActiveStepAtom);
    
    useEffect(() => {
        const getAirCallData = async () => {
        try {
            const response = await fetch("https://aircall-backend.onrender.com/activities");
            if (response.ok) {
            const result = await response.json();
            setAirCall(result);
            } else {
            console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        getAirCallData();
    }, [airCallState]); 

  return (
    <div className='activity-feed-page-container'>
        <StateChangeComponent airCall={airCall} />
        {airCall.length > 0 && airCallState === "Activity" ? <CallListAndCallItem airCall={airCall} archived = {false}/> : <CallListAndCallItem airCall={airCall} archived = {true}/> }
  </div>
  );
};

export default MainPage;
