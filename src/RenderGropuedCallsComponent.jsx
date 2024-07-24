import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import CallItem from './CallItem.jsx';
import { useSetAtom } from 'jotai';
import { currentTotalCallStateAtom } from './atom/aircall.atoms.jsx';
const RenderGropuedCallsComponent = ({ filteredAirCall, handleClick }) => {
  const updateCurrentTotalCalls = useSetAtom(currentTotalCallStateAtom);
  useEffect(() => {
    updateCurrentTotalCalls(filteredAirCall.length);
  }, [filteredAirCall]);

  const getDateOnly = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${month} ${day}, ${year}`;
  };

  const groupByDate = (calls) => {
    return calls.reduce((acc, call) => {
      const dateKey = getDateOnly(call.created_at);
      const fromToKey = `${call.from}-${call.to}`;

      if (!acc[dateKey]) {
        acc[dateKey] = {};
      }
      if (!acc[dateKey][call.call_type]) {
        acc[dateKey][call.call_type] = {};
      }
      if (!acc[dateKey][call.call_type][fromToKey]) {
        acc[dateKey][call.call_type][fromToKey] = [];
      }
      acc[dateKey][call.call_type][fromToKey].push(call);
      return acc;
    }, {});
  };

  const groupedCalls = groupByDate(filteredAirCall);

  return Object.entries(groupedCalls).map(([date, callTypes]) => (
    <div key={date}>
      <Box className="divide-line">
        <Divider className="dot-divider" />
        <Typography className="lightgrey-text">{date}</Typography>
        <Divider className="dot-divider" />
      </Box>
      {Object.entries(callTypes).map(([callType, fromToGroups]) => (
        <div key={callType}>
          {Object.entries(fromToGroups).map(([fromToKey, calls]) => (
            <div key={fromToKey}>
              <CallItem
                key={fromToKey}
                activity={calls[0]}
                count={calls.length}
                onClick={handleClick}
                allCalls={calls}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  ));
};
export default RenderGropuedCallsComponent;
