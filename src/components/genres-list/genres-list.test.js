import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import rootReducer from '../../redux/reducer';
import GenresList from './genres-list.js';

describe('Genres List component renders correctly', () => {
  it('should render a genres list', () => {
    const genres = [];
    const onGenreChange = jest.fn();
    const store = createStore(rootReducer);
    const tree = renderer
      .create(
        <Provider store={store}>
          <GenresList
            genres={genres}
            currentGenre='All genres'
            onGenreChange={onGenreChange}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
