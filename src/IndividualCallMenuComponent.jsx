import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const IndividualCallMenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    console.log(`Selected option: ${option}`);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('Option 1')}>Option 1</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Option 2')}>Option 2</MenuItem>
      </Menu>
    </div>
  );
};

export default IndividualCallMenuComponent;
