import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import './MainPage.css';
import { Typography } from '@mui/material';
import CallListAndCallItem from '../CallListAndCallItem/CallListAndCallItem.jsx';
import {
  airCallActiveStepAtom,
  currentAirCallFooterStateAtom,
  currentAirCallHeaderStateAtom,
} from '../../atom/aircall.atoms.jsx';
import StateChangeComponent from '../CallListAndCallItem/StateChangeComponent.jsx';
import PhoneNumberListPage from '../PhoneNumberListPage/PhoneNumberListPage.jsx';
import KeyPadComponent from '../KeyPadPage/KeyPadComponent.jsx';
import SettingPage from '../SettingPage/SettingPage.jsx';
import { API_BASE_URL } from '../../utils/api.js';
import SnackBar from '../SnackBar/SnackBar.jsx';

const MainPage = () => {
  const [airCall, setAirCall] = useState([]);
  const airCallState = useAtomValue(airCallActiveStepAtom);
  const currentHeaderMenu = useAtomValue(currentAirCallHeaderStateAtom);
  const navigationState = useAtomValue(currentAirCallFooterStateAtom);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState('error'); 
  useEffect(() => {
    const getAirCallData = async () => {
      const response = await fetch(`${API_BASE_URL}/activities`);
      if (response.ok) {
        const result = await response.json();
        setAirCall(result);
      } else {
        setSnackBarMessage('Failed to fetch entire calls');
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
      }
    };
    getAirCallData();
  }, [airCallState, airCall]);
  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };
  const renderContent = () => {
    switch (navigationState) {
    case 'Call':
      return (
        <>
          {(currentHeaderMenu === 'InBox' ||
            currentHeaderMenu === 'Archive') && (
            <StateChangeComponent airCall={airCall} />
          )}
          {airCall.length > 0 && airCallState === 'Activity' ? (
            <CallListAndCallItem airCall={airCall} state={false} />
          ) : (
            <CallListAndCallItem airCall={airCall} state={true} />
          )}
        </>
      );
    case 'PhonNumber':
      return <PhoneNumberListPage airCall={airCall} />;

    case 'KeyPad':
      return <KeyPadComponent />;

    case 'Setting':
      return <SettingPage />;

    default:
      return <Typography>No content available</Typography>;
    }
  };
  return (
    <div className="activity-foot-page-container">
      <div>{renderContent()}</div>
      <SnackBar 
        open={snackBarOpen} 
        onClose={handleCloseSnackBar} 
        message={snackBarMessage} 
        severity={snackBarSeverity}
      />
    </div>
  );
};

export default MainPage;
