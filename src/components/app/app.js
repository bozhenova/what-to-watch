import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Spinner from '../spinner';
const Main = lazy(() => import('../../containers/main'));
const MoviePage = lazy(() => import('../../containers/movie-page'));
const Player = lazy(() => import('../player/'));
const SignIn = lazy(() => import('../sign-in/'));
const AddReview = lazy(() => import('../add-review/'));
const MyList = lazy(() => import('../../containers/my-list'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/mylist' component={MyList} />
        <Route exact path='/film/:id' component={MoviePage} />
        <Route exact path='/film/:id/player' component={Player} />
        <Route exact path='/film/:id/review' component={AddReview} />
        <Redirect from='*' to='/' />
      </Switch>
    </Suspense>
  );
};

export default App;
