import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import rootReducer from '../../redux/reducer';
import GenresList from './genres-list.js';

describe('Genres List component renders correctly', () => {
  it('should render a genres list', () => {
    const genres = [];
    const store = createStore(rootReducer);
    const tree = renderer
      .create(
        <Provider store={store}>
          <GenresList genres={genres} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
