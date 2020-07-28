import { ActionTypes as types } from '../../ActionTypes';

const initialState = {
  promoMovie: {},
  movies: [],
  similarMovies: [],
  currentMovieId: null,
  currentTab: 'Overview',
  currentGenre: 'All genres'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GENRE:
      return {
        ...state,
        currentGenre: action.payload
      };
    case types.SET_CURRENT_MOVIE:
      return { ...state, currentMovieId: action.payload };
    case types.SET_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
    case types.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case types.LOAD_PROMO_MOVIE:
      return {
        ...state,
        promoMovie: action.payload
      };
  }
  return state;
};
