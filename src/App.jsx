import React from 'react';
import MainPage from './components/MainPage/MainPage.jsx';
import Footer from './Footer.jsx';
import './css/app.css';
import Header from './Header.jsx';

const App = () => {
  return (
    <div className="container">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};

export default App;
