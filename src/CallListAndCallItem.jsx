import React, { useEffect, useState } from 'react';
import '../src/css/CallListAndCallItem.css'
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BsTelephoneInboundFill } from "react-icons/bs";
import { PiDotsThreeVerticalThin } from "react-icons/pi";


function CallListAndCallItem({airCall, archived}) {
    const [filteredAirCall, setFilteredAirCall] = useState();

    useEffect(()=>{
        const filteredAirCallByState = () => {
            const filteredData = airCall.filter((item)=> item.is_archived == archived);
            setFilteredAirCall(filteredData);
        }
        filteredAirCallByState();
    }, [airCall, archived])
    
    const getDateOnly = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()]; 
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}, ${day } ${year}`;
      };
    
      const getTimeOnly = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleTimeString('en-US', options);
      };
  return (
    <div>
      {filteredAirCall?.length > 0 ? (
        filteredAirCall.map((activity, index) => {
        const previousActivity = index > 0 ? airCall[index - 1] : null;

        const currentDate = getDateOnly(activity.created_at);
        console.log(currentDate);
        const previousDate = previousActivity ? getDateOnly(previousActivity.created_at) : null;

        return (
          <div key={activity.id}>
            
            { (
              <div>
                {index ===0 || currentDate !== previousDate ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                    <Divider sx={{ flexGrow: 1, borderStyle: 'dotted' }} />
                    <Typography sx={{ mx: 2 }}>{currentDate}</Typography>
                    <Divider sx={{ flexGrow: 1, borderStyle: 'dotted' }} />
                  </Box>           
                ) : (
                 <></> 
                )}
                <div className='call-container'>
                    <div className='call-container-left'>
                        <BsTelephoneInboundFill />
                        <div className='call-container-left-infomation'>
                            <div>Call From: {activity.from}</div>
                            <div>tried to call on  {activity.to}</div>
                        </div>
                    </div>
                    <div className='call-container-right'>
                        <PiDotsThreeVerticalThin />
                        <div>Time: {getTimeOnly(activity.created_at)}</div>
                        
                    </div>
                </div>
              </div>
            )}
          </div>
        );
      })
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}

export default CallListAndCallItem
