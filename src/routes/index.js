import React from 'react';
import { Route, IndexRoute } from 'react-router';

import FeedPage from './FeedPage';
import Layout from './Layout';
import NewEntryPage from './NewEntryPage';
import CommentsPage from './CommentsPage';
import Creativer from './Creativer';

export default (
  <Route
    path="/"
    component={Layout}
  >
    <IndexRoute
      component={FeedPage}
    />
    <Route
      path="feed/:type"
      component={FeedPage}
    />
    <Route
      path="creativer"
      component={Creativer}
    />
    <Route
      path="submit"
      component={NewEntryPage}
    />
    <Route
      path="/:org/:repoName"
      component={CommentsPage}
    />
  </Route>
);
