import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from '../../history';
import Header from './header';
import renderer from 'react-test-renderer';
import rootReducer from '../../redux/reducer';

describe('Header component renders correctly', () => {
  it('should render a header', () => {
    const store = createStore(rootReducer);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
