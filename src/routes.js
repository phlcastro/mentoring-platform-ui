import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import UserAuthenticationPage from './pages/UserAuthenticationPage';
import DashboardPage from './pages/DashboardPage';
import QuestionsPage from './pages/QuestionsPage';

function requireAuth(nextState, replace){
  if(!window.localStorage.getItem('jwt')){
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={UserAuthenticationPage} />
    <Route path='dashboard' component={DashboardPage} onEnter={requireAuth}>
      <IndexRoute component={QuestionsPage} />
    </Route>
  </Route>
);