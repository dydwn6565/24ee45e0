import React from 'react'

function CallListAndCallItem({airCall}) {
    const getDateOnly = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      };
    
      const getTimeOnly = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toTimeString().split(' ')[0].substring(0,5); // YYYY-MM-DD 형식
      };
  return (
    <div>
      {airCall.length > 0 ? (
      airCall.map((activity, index) => {
        const previousActivity = index > 0 ? airCall[index - 1] : null;

        const currentDate = getDateOnly(activity.created_at);
        console.log(currentDate);
        const previousDate = previousActivity ? getDateOnly(previousActivity.created_at) : null;

        return (
          <div key={activity.id}>
            
            { (
              <p>
                {index ===0 || currentDate !== previousDate ? (
                    <div>
                        ----------------currentDate ------------------
                    </div>

                  
                ) : (
                 <></> 
                )}
                <p>Call From: {activity.from}</p>
                <div>Call To: {activity.to}</div>
                <div>Time: {getTimeOnly(activity.created_at)}</div>
              </p>
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
