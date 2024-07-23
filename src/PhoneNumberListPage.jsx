import React from 'react';
import { Divider } from '@mui/material'; // Material-UI의 Divider 사용
import './css/phoneNumberListPage.css';

const PhoneNumberListPage = ({ airCall }) => {
  const getUniquePhoneNumbers = (calls) => {
    const phoneNumbers = new Set();

    calls.forEach((call) => {
      phoneNumbers.add(call.from);
      phoneNumbers.add(call.to);
    });

    return Array.from(phoneNumbers);
  };

  const getStartDigit = (number) => {
    const strNumber = String(number); // 숫자를 문자열로 변환
    return strNumber.replace(/\D/g, '')[0]; // 숫자가 아닌 문자 제거 후 첫 번째 숫자 반환
  };

  const uniquePhoneNumbers = getUniquePhoneNumbers(airCall);

  // 전화번호를 시작 숫자에 따라 정렬
  const sortedPhoneNumbers = [...uniquePhoneNumbers].sort((a, b) => {
    return getStartDigit(a).localeCompare(getStartDigit(b));
  });

  return (
    <div className="phone-number-list-container">
      <div className="phone-number-list-inside-container">
        <h2>Phone Number List</h2>
        <ul>
          {sortedPhoneNumbers.length > 0 ? (
            sortedPhoneNumbers.map((number, index) => (
              <React.Fragment key={index}>
                <li className="phone-number-item">{number}</li>
                {index < sortedPhoneNumbers.length - 1 && (
                  <Divider className="phone-number-divider" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="no-numbers">No phone numbers available.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PhoneNumberListPage;
