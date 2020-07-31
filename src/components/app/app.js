import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Spinner from '../spinner';
import Main from '../../containers/main';
import MoviePage from '../../containers/movie-page';
import SignIn from '../sign-in/';
import MyList from '../../containers/my-list';

// import AddReview from '../add-review/';
// const Main = lazy(() => import('../../containers/main'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/mylist' component={MyList} />
        <Route exact path='/film/:id' component={MoviePage} />
        {/* <Route exact path='/film/:id/review' component={AddReview} /> */}
        <Redirect from='*' to='/' />
      </Switch>
    </Suspense>
  );
};

export default App;
