import React from 'react';
import './SettingPage.css';
import { useSetAtom } from 'jotai';
import { currentColorHandlerAtom } from '../../atom/aircall.atoms.jsx';

const SettingPage = () => {
  const colors = ['blue', 'red', 'green', 'yellow'];
  const chooseColor = useSetAtom(currentColorHandlerAtom);

  return (
    <div className="setting-container">
      <h2 className="setting-title">Select Custom Color</h2>
      <div className="color-options">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => chooseColor(color)}
            className={`color-option ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
