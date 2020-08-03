import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { adaptMovies, adaptMovie } from '../../../adapter';
import { getMovieById } from './selectors';

export const ActionCreator = {
  setGenre: genre => ({
    type: types.SET_GENRE,
    payload: genre
  }),
  setTab: tab => ({
    type: types.SET_TAB,
    payload: tab
  }),
  loadMovies: movies => ({
    type: types.LOAD_MOVIES,
    payload: movies
  }),
  loadPromoMovie: movie => ({
    type: types.LOAD_PROMO_MOVIE,
    payload: movie
  })
};

export const Operations = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api
      .get(Constants.FILMS_PATH)
      .then(response => adaptMovies(response))
      .then(data => dispatch(ActionCreator.loadMovies(data)));
  },
  loadPromoMovie: () => (dispatch, _getState, api) => {
    return api
      .get(`${Constants.FILMS_PATH}${Constants.PROMO_MOVIE_PATH}`)
      .then(response => adaptMovie(response))
      .then(data => dispatch(ActionCreator.loadPromoMovie(data)));
  },
  loadMovie: id => (dispatch, _getState) => {
    const state = _getState();
    const movie = getMovieById(state, id);

    if (!movie) {
      return dispatch(Operations.loadMovies());
    }

    return Promise.resolve(movie);
  }
};
