import { createSelector } from 'reselect';

export const getCurrentTab = state => state.data.currentTab;
export const getCurrentGenre = state => state.data.currentGenre;
export const getMovies = state => state.data.movies;
export const getPromoMovie = state => state.data.promoMovie;

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
