import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { adaptMovies, adaptMovie } from '../../../adapter';

export const ActionCreator = {
  loadFavorites: favorites => ({
    type: types.LOAD_FAVORITES,
    payload: favorites
  }),
  updateFavorites: favorites => ({
    type: types.UPDATE_FAVORITES,
    payload: favorites
  })
};

export const Operations = {
  loadFavorites: () => (dispatch, _getState, api) => {
    return api
      .get(Constants.FAVORITE_PATH)
      .then(response => adaptMovies(response))
      .then(data => dispatch(ActionCreator.loadFavorites(data)));
  },
  updateFavorites: (id, isFavorite) => (dispatch, _getState, api) => {
    return api
      .post(`${Constants.FAVORITE_PATH}/${id}/${+!isFavorite}`)
      .then(response => adaptMovie(response))
      .then(data => dispatch(ActionCreator.updateFavorites(data)));
  }
};
