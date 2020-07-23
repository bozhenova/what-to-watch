import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Spinner from '../spinner';
import Main from '../../containers/main';
// const Main = lazy(() => import('../../containers/main'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Redirect from='*' to='/' />
      </Switch>
    </Suspense>
  );
};

export default App;
