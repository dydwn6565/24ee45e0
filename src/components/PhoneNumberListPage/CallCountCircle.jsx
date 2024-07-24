import React from 'react';

const CallCountCircle = ({ count }) => {
  return (
    <div className="call-info-missed-call">
      <div className="call-count-circle">{count}</div>
    </div>
  );
};

export default CallCountCircle;
