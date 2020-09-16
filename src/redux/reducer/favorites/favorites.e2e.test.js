import MockAdapter from 'axios-mock-adapter';

import configureAPI from '../../../services/api';
import { Operations } from './actions';
import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { movies } from '../../../mocks';
import { adaptMovies } from '../../../adapter';

describe('Reducer works correctly', () => {
  it('Should make a correct API call to /favorite', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operations.loadFavorites();

    apiMock.onGet(Constants.FAVORITE_PATH).reply(Constants.STATUS_OK, movies);

    return offersLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.LOAD_FAVORITES,
        payload: adaptMovies(movies)
      });
    });
  });
  it('Should make a correct API call POST to /films/id', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const id = 1;
    const isFavorite = false;
    const favoritesUpdate = Operations.updateFavorites(id, isFavorite);

    apiMock
      .onPost(`${Constants.FAVORITE_PATH}/${id}/${+!isFavorite}`)
      .reply(Constants.STATUS_OK, movies[0]);

    return favoritesUpdate(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.UPDATE_FAVORITES,
        payload: adaptMovies(movies[0])
      });
    });
  });
});
