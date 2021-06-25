import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';

const Root = () => (
  <div>
    <Switch>
      <Route
        path="/"
        render={(props) => (
          <App>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </App>
        )}
      />
    </Switch>
  </div>
);

export default Root;
