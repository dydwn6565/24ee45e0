import React, { useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';

const CallMenu = React.memo(
  ({ anchorEl, open, onClose, onMenuItemClick, selectedCallId, airCall }) => {
    const selectedCall = useMemo(() => {
      return airCall.find((call) => call.id === selectedCallId);
    }, [selectedCallId, airCall]);

    if (!selectedCall) {
      return null;
    }

    return (
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem onClick={() => onMenuItemClick('Call')}>Call</MenuItem>

        {selectedCall.is_archived === true ? (
          <MenuItem onClick={() => onMenuItemClick('Activity', selectedCallId)}>
            Activity
          </MenuItem>
        ) : (
          <MenuItem onClick={() => onMenuItemClick('Archive', selectedCallId)}>
            Archive
          </MenuItem>
        )}
      </Menu>
    );
  }
);

export default CallMenu;
