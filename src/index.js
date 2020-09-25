import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import { CurrentUserProvider } from './contexts/currentUser';
import CurrentUserChecker from './components/currentUserChecker';
import TopBar from './components/topBar';

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
