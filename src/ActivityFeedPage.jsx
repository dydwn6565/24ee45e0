import React, { useEffect, useState } from 'react';
import CallListAndCallItem from './CallListAndCallItem';

const ActivityFeedPage = () => {
    const [airCall, setAirCall] = useState([]);
    const [callState , setCallState] = useState("Activity");
    useEffect(() => {
        const getAirCallData = async () => {
        try {
            const response = await fetch("https://aircall-backend.onrender.com/activities");
            if (response.ok) {
            const result = await response.json();
            setAirCall(result);
            console.log(result);
            } else {
            console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        getAirCallData();
    }, []); 

  return (
    <div>
    <CallListAndCallItem airCall={airCall}/>
  </div>
  );
};

export default ActivityFeedPage;
