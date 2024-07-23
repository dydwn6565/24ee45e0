import React from 'react';
import Header from './Header.jsx';
import ActivityFeedPage from './MainPage.jsx';
import Footer from './Footer.jsx';

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
