import { createSelector } from 'reselect';
import { Constants } from '../../../constants';

export const getCurrentTab = state => state.data.currentTab;
export const getCurrentGenre = state => state.data.currentGenre;
export const getMovies = state => state.data.movies;
export const getPromoMovie = state => state.data.promoMovie;
export const getMoreMoviesStatus = state => state.data.moreMovies;

export const getUniqueGenres = createSelector(getMovies, movies => {
  return [...new Set(movies.map(movie => movie.genre))];
});

export const getSortedMovies = createSelector(
  getCurrentGenre,
  getMovies,
  (genre, allMovies) => {
    return genre === 'All genres'
      ? allMovies
      : allMovies.filter(movie => movie.genre === genre);
  }
);

export const getMovieById = (state, id) => {
  const movies = getMovies(state);
  return movies && movies.find(movie => movie.id == id);
};

export const getMovie = createSelector(
  getMovies,
  getMovieById,
  (movies, currentMovie) => {
    return movies.find(movie => movie.id === currentMovie.id);
  }
);

export const getSimilarMovies = createSelector(
  getSortedMovies,
  getMovieById,
  (movies, currentMovie) => {
    return movies
      .filter(movie => movie.id !== currentMovie.id)
      .slice(0, Constants.MAX_SIMILAR_MOVIES);
  }
);
