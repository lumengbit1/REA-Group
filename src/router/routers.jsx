import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import MainRouter from '../components/MainRouter';

const Routes = () => (
  <Switch>
    <MainRouter exact path="/" component={Home} />
    <Redirect from="/" to="/dashboard" />
  </Switch>
);

export default Routes;
