import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import HeaderWrapped from '../../components/header';
import Footer from '../../components/footer';
import MoviesList from '../../components/movies-list/';
import {
  getSortedMovies,
  getCurrentGenre,
  getPromoMovie,
  getUniqueGenres,
  getMoreMoviesStatus
} from '../../redux/reducer/data/selectors';
import { ActionCreator, Operations } from '../../redux/reducer/data/actions';
import { Constants } from '../../constants';
import GenresList from '../../components/genres-list';
import { getAuthorizationStatus } from '../../redux/reducer/user/selectors';
import FavoriteButton from '../../components/favorite-button';

class Main extends PureComponent {
  static propTypes = {
    setCurrentGenre: PropTypes.func.isRequired,
    loadPromoMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    currentGenre: PropTypes.string.isRequired,
    promoMovie: PropTypes.object.isRequired,
    genres: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadPromoMovie();
  }

  onGenreChange = genre => {
    this.props.setCurrentGenre(genre);
  };

  onButtonClick = () => {
    this.props.loadMoreMovies();
  };

  render() {
    const ShowMoreButton = (
      <button
        className='catalog__button'
        type='button'
        onClick={this.onButtonClick}
      >
        Show more
      </button>
    );
    const {
      movies,
      currentGenre,
      promoMovie,
      genres,
      match,
      moreMovies
    } = this.props;
    const {
      color,
      background,
      title,
      poster,
      genre,
      release,
      isFavorite,
      id
    } = promoMovie;
    return (
      <>
        <section
          className='movie-card'
          style={{
            backgroundColor: `${color}`
          }}
        >
          <div className='movie-card__bg'>
            <img src={background} alt={title} />
          </div>
          <h1 className='visually-hidden'>WTW</h1>
          <HeaderWrapped classMod={`movie-card__head`} />
          <div className='movie-card__wrap'>
            <div className='movie-card__info'>
              <div className='movie-card__poster'>
                <img src={poster} alt={title} width='218' height='327' />
              </div>
              <div className='movie-card__desc'>
                <h2 className='movie-card__title'>{title}</h2>
                <p className='movie-card__meta'>
                  <span className='movie-card__genre'>{genre}</span>
                  <span className='movie-card__year'>{release}</span>
                </p>

                <div className='movie-card__buttons'>
                  <Link
                    to={`/film/${id}/player`}
                    className='btn movie-card__button'
                  >
                    <svg viewBox='0 0 19 19' width='19' height='19'>
                      <use xlinkHref='#play-s' />
                    </svg>
                    Play
                  </Link>
                  <FavoriteButton
                    id={id}
                    isFavorite={isFavorite}
                    match={match}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='page-content'>
          <section className='catalog'>
            <h2 className='catalog__title visually-hidden'>Catalog</h2>
            <GenresList
              currentGenre={currentGenre}
              onGenreChange={this.onGenreChange}
              genres={genres}
            />
            {movies.length ? (
              <MoviesList
                movies={
                  moreMovies
                    ? movies.slice(0, Constants.MORE_MAX_MOVIES)
                    : movies.slice(0, Constants.MAX_MOVIES)
                }
              />
            ) : null}
            {movies.length > Constants.MAX_MOVIES && !moreMovies ? (
              <div className='catalog__more'>{ShowMoreButton}</div>
            ) : null}
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  movies: getSortedMovies(state),
  promoMovie: getPromoMovie(state),
  moreMovies: getMoreMoviesStatus(state),
  currentGenre: getCurrentGenre(state),
  genres: getUniqueGenres(state),
  isAuthorizationRequired: getAuthorizationStatus(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentGenre: genre => dispatch(ActionCreator.setGenre(genre)),
  loadMoreMovies: () => dispatch(ActionCreator.loadMoreMovies(true)),
  loadPromoMovie: () => dispatch(Operations.loadPromoMovie())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
