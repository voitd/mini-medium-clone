import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Article from './pages/article';
import Authentication from './pages/authentication';
import GlobalFeed from './pages/globalFeed';

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
