import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header';
import Footer from '../../components/footer';
import MoviesList from '../../components/movies-list/';
import {
  getSortedMovies,
  getCurrentGenre,
  getPromoMovie,
  getUniqueGenres
} from '../../redux/reducer/data/selectors';
import { ActionCreator } from '../../redux/reducer/data/actions';
import { Constants } from '../../constants';
import GenresList from '../../components/genres-list';

class Main extends PureComponent {
  onGenreChange = genre => {
    this.props.setCurrentGenre(genre);
  };

  onButtonClick = () => {
    console.log('clicked');
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
    const { movies, currentGenre, promoMovie, genres } = this.props;
    const { color, background, title, poster, genre, release } = promoMovie;

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
          <Header classModPrefix={`movie-card`} />
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
                  <button
                    className='btn btn--play movie-card__button'
                    type='button'
                  >
                    <svg viewBox='0 0 19 19' width='19' height='19'>
                      <use xlinkHref='#play-s' />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className='btn btn--list movie-card__button'
                    type='button'
                  >
                    <svg viewBox='0 0 19 20' width='19' height='20'>
                      <use xlinkHref='#add' />
                    </svg>
                    <span>My list</span>
                  </button>
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
              <MoviesList movies={movies.slice(0, Constants.MAX_MOVIES)} />
            ) : null}
            {movies.length > Constants.MAX_MOVIES ? (
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
  currentGenre: getCurrentGenre(state),
  genres: getUniqueGenres(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentGenre: genre => dispatch(ActionCreator.setGenre(genre))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
