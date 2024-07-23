import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeedPage from './MainPage.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <ActivityFeedPage />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
