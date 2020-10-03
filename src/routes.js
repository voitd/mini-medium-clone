import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Article from './pages/article';
import Authentication from './pages/authentication';
import CreateArticle from './pages/createArticle';
import GlobalFeed from './pages/globalFeed';
import TagFeed from './pages/tagFeed';
import YourFeed from './pages/yourFeed';
import EditArticle from './pages/editArticle';

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
