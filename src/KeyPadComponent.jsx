import React, { useState } from 'react';
import './css/keypadComponent.css';

const KeyPadComponent = () => {
  const [inputNumber, setInputNumber] = useState('');
  const handleNumberClick = (number) => {
    setInputNumber((prev) => prev + number);
  };

  const handleDeleteClick = () => {
    setInputNumber((prev) => prev.slice(0, -1));
  };

  const handleCallClick = () => {
    console.log('Calling:', inputNumber);
  };
  const buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <div className="keypad-container">
      <div className="input-number">{inputNumber}</div>
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="keypad-row">
          {row.map((button) => (
            <button
              key={button}
              onClick={() => handleNumberClick(button)}
              className="keypad-button"
            >
              {button}
            </button>
          ))}
        </div>
      ))}
      <div className="keypad-row">
        <button onClick={handleDeleteClick} className="keypad-button">
          Del
        </button>
        <button onClick={handleCallClick} className="keypad-button call-button">
          Call
        </button>
      </div>
    </div>
  );
};

export default KeyPadComponent;
