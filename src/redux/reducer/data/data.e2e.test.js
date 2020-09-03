import MockAdapter from 'axios-mock-adapter';

import { reducer } from './data';
import configureAPI from '../../../services/api';
import { Operations } from './actions';
import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { movies } from '../../../mocks';
import { adaptMovies } from '../../../adapter';

describe('Reducer works correctly', () => {
  it('Should return initial state by default', () => {
    expect(reducer(undefined, {})).toEqual({
      promoMovie: {},
      movies: [],
      moreMovies: false,
      currentTab: 'Overview',
      currentGenre: 'All genres'
    });
  });

  it('Should set current tab', () => {
    expect(
      reducer(
        {
          promoMovie: {},
          movies: [],
          moreMovies: false,
          currentTab: 'Overview',
          currentGenre: 'All genres'
        },
        { type: types.SET_TAB, payload: 'Details' }
      )
    ).toEqual({
      promoMovie: {},
      movies: [],
      moreMovies: false,
      currentTab: 'Details',
      currentGenre: 'All genres'
    });
  });

  it('Should set current genre', () => {
    expect(
      reducer(
        {
          promoMovie: {},
          movies: [],
          moreMovies: false,
          currentTab: 'Details',
          currentGenre: 'All genres'
        },
        { type: types.SET_GENRE, payload: 'Comedy' }
      )
    ).toEqual({
      promoMovie: {},
      movies: [],
      moreMovies: false,
      currentTab: 'Details',
      currentGenre: 'Comedy'
    });
  });

  it('Should change moreMovies status', () => {
    expect(
      reducer(
        {
          promoMovie: {},
          movies: [],
          moreMovies: false,
          currentTab: 'Details',
          currentGenre: 'Comedy'
        },
        { type: types.LOAD_MORE_MOVIES, payload: true }
      )
    ).toEqual({
      promoMovie: {},
      movies: [],
      moreMovies: true,
      currentTab: 'Details',
      currentGenre: 'Comedy'
    });
  });

  it('Should make a correct API call to /films', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const moviesLoader = Operations.loadMovies();

    apiMock.onGet(Constants.FILMS_PATH).reply(Constants.STATUS_OK, movies);

    return moviesLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.LOAD_MOVIES,
        payload: adaptMovies(movies)
      });
    });
  });
  it('Should make a correct API call to /promo', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoMovieLoader = Operations.loadPromoMovie();

    apiMock
      .onGet(`${Constants.FILMS_PATH}${Constants.PROMO_MOVIE_PATH}`)
      .reply(Constants.STATUS_OK, movies[0]);

    return promoMovieLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.LOAD_PROMO_MOVIE,
        payload: adaptMovies(movies[0])
      });
    });
  });
});
