import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';

import history from '../../history';
import AddReview from './add-review';
import rootReducer from '../../redux/reducer';

describe('Add Review component renders correctly', () => {
  it('should render Add Review', () => {
    const store = createStore(rootReducer);
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
