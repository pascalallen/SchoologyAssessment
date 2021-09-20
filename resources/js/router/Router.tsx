import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Path from '@/router/Path';
import Home from '@/pages/home/Home';

const Router = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path={Path.HOME}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
