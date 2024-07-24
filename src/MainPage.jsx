import React, { useEffect, useState } from 'react';
import CallListAndCallItem from './CallListAndCallItem.jsx';
import { useAtomValue } from 'jotai';
import {
  airCallActiveStepAtom,
  currentAirCallFooterStateAtom,
  currentAirCallHeaderStateAtom,
} from './atom/aircall.atoms.jsx';
import './css/ActivityFeedPage.css';
import StateChangeComponent from './StateChangeComponent.jsx';
import { Typography } from '@mui/material';
import PhoneNumberListPage from './PhoneNumberListPage.jsx';
import SettingPage from './SettingPage.jsx';
import KeyPadComponent from './KeyPadComponent.jsx';

const MainPage = () => {
  const [airCall, setAirCall] = useState([]);
  const airCallState = useAtomValue(airCallActiveStepAtom);
  const currentHeaderMenu = useAtomValue(currentAirCallHeaderStateAtom);
  const navigationState = useAtomValue(currentAirCallFooterStateAtom);
  useEffect(() => {
    const getAirCallData = async () => {      
      const response = await fetch(
        'https://aircall-backend.onrender.com/activities'
      );
      if (response.ok) {
        const result = await response.json();
        setAirCall(result);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    };
    getAirCallData();
  }, [airCallState, airCall]);
  const renderContent = () => {
    switch (navigationState) {
    case 'Call':
      return (
        <>
          {
            (currentHeaderMenu === 'InBox' || currentHeaderMenu === 'Archive') 
              && <StateChangeComponent airCall={airCall} />}
          {airCall.length > 0 && airCallState === 'Activity' ? (
            <CallListAndCallItem airCall={airCall} state={false} />
          ) : (
            <CallListAndCallItem airCall={airCall} state={true} />
          )}
        </>
      );
    case 'PeopleList':
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
    <div className="activity-feed-page-container">
      <div>{renderContent()}</div>
    </div>
  );
};

export default MainPage;
