import './css/body.css';
import './css/app.css';
import './css/header.css';
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
