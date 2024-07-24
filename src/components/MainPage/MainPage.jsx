import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import './MainPage.css';
import { Typography } from '@mui/material';
import CallListAndCallItem from '../CallListAndCallItem/CallListAndCallItem.jsx';
import { airCallActiveStepAtom, currentAirCallFooterStateAtom, currentAirCallHeaderStateAtom } from '../../atom/aircall.atoms.jsx';
import StateChangeComponent from '../CallListAndCallItem/StateChangeComponent.jsx';
import PhoneNumberListPage from '../PhoneNumberListPage/PhoneNumberListPage.jsx';
import KeyPadComponent from '../KeyPadPage/KeyPadComponent.jsx';
import SettingPage from '../SettingPage/SettingPage.jsx';
import { API_BASE_URL } from '../../utils/api.js';

const MainPage = () => {
  const [airCall, setAirCall] = useState([]);
  const airCallState = useAtomValue(airCallActiveStepAtom);
  const currentHeaderMenu = useAtomValue(currentAirCallHeaderStateAtom);
  const navigationState = useAtomValue(currentAirCallFooterStateAtom);
  useEffect(() => {
    const getAirCallData = async () => {
      const response = await fetch(
        `${API_BASE_URL}`
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
    </div>
  );
};

export default MainPage;
