import React from 'react';
import ActivityFeedPage from './MainPage.jsx';
import Footer from './Footer.jsx';
import './css/app.css';
import Header from './Header.jsx';
const App = () => {
  return (
    <div className="container">
      <Header />
      <ActivityFeedPage />
      <Footer />
    </div>
  );
};

export default App;
