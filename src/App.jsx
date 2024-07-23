import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeedPage from './MainPage.jsx';
import Footer from './Footer.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <ActivityFeedPage />
      <Footer />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
