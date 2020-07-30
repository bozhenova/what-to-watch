import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import SignIn from './sign-in';
import rootReducer from '../../redux/reducer';
import history from '../../history';

describe('Sign In component renders correctly', () => {
  it('should render Sign In', () => {
    const store = createStore(rootReducer);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
