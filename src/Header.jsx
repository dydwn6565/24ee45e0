import React from 'react';
import {
  airCallActiveHandleAtom,
  colorAtom,
  currentAirCallFooterStateAtom,
  currentAirCallHeaderStateAtom,
  currentAirCallHeaderStateHandleAtom,
} from './atom/aircall.atoms.jsx';
import { useAtomValue, useSetAtom } from 'jotai';
import './css/header.css';
import { Button } from '@mui/material';

const Header = () => {
  const headerAirCallState = useAtomValue(currentAirCallHeaderStateAtom);
  const currentColorState = useAtomValue(colorAtom);
  const currentNavigationState = useAtomValue(currentAirCallFooterStateAtom);
  // const airCallState = useAtomValue(airCallActiveStepAtom);
  const handleAirCallState = useSetAtom(airCallActiveHandleAtom);
  const updateAirCallHeaderState = useSetAtom(
    currentAirCallHeaderStateHandleAtom
  );

  return (
    <div>
      {currentNavigationState === 'Call' ? (
        <header className="header">
          <div className="header-left-container">
            <svg
              viewBox="0 0 486 168"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M84,168 C37.8,168 0,130.2 0,84 C0,37.8 37.8,0 84,0 C130.2,0 168,37.8 168,84 C168,130.2 130.2,168 84,168 Z M84,12 C44.4,12 12,44.4 12,84 C12,123.6 44.4,156 84,156 C123.6,156 156,123.6 156,84 C156,44.4 123.6,12 84,12 Z M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z"
                  fill="#2AC420"
                />
              </g>
            </svg>
            <div className="header-title">Activity</div>
          </div>
          <div className="header-right-container">
            <Button
              className={`header-inbox ${headerAirCallState === 'InBox' ? 'active' : ''} ${currentColorState}`}
              onClick={() => {
                updateAirCallHeaderState('InBox');
                handleAirCallState('Activity');
              }}
            >
              InBox
            </Button>
            <Button
              variant="text"
              className={`header-inbox ${headerAirCallState === 'AllCalls' ? 'active' : ''}`}
              onClick={() => updateAirCallHeaderState('AllCalls')}
            >
              AllCalls
            </Button>
            <Button
              variant="text"
              className={`header-inbox ${headerAirCallState === 'Archive' ? 'active' : ''}`}
              onClick={() => {
                updateAirCallHeaderState('Archive');
                handleAirCallState('Archive');
              }}
            >
              Archive
            </Button>
          </div>
        </header>
      ) : (
        <div className="sub-header-container">{currentNavigationState}</div>
      )}
    </div>
  );
};

export default Header;
