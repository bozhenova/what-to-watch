import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from '../../components/favorite-button';
import HeaderWrapped from '../../components/header';
import Footer from '../../components/footer';
import MoviesList from '../../components/movies-list';
import TabsList from '../../components/tabs-list';
import Overview from '../../components/overview/';
import Details from '../../components/details';
import Reviews from '../../components/reviews';
import { getAuthorizationStatus } from '../../redux/reducer/user/selectors';
import { ActionCreator as DataActions } from '../../redux/reducer/data/actions';
import { Operations as ReviewsOperations } from '../../redux/reducer/reviews/actions';
import {
  getCurrentTab,
  getSimilarMovies,
  getMovie
} from '../../redux/reducer/data/selectors';
import { getReviews } from '../../redux/reducer/reviews/selectors';

class MoviePage extends PureComponent {
  static propTypes = {
    loadReviews: PropTypes.func.isRequired,
    setCurrentTab: PropTypes.func.isRequired,
    similarMovies: PropTypes.array.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    currentTab: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    movie: PropTypes.object
  };

  componentDidMount() {
    const { match, loadReviews } = this.props;
    const id = match.params.id;
    loadReviews(id);
  }

  componentDidUpdate(prevProps) {
    const { match, loadReviews } = this.props;
    const id = match.params.id;
    if (prevProps.match !== match) {
      loadReviews(id);
    }
  }

  onTabChange = tab => {
    this.props.setCurrentTab(tab);
  };

  showContent = (tab, movie, reviews) => {
    switch (tab) {
      case 'Overview':
        return <Overview movie={movie} />;

      case 'Details':
        return <Details movie={movie} />;

      case 'Reviews':
        return <Reviews reviews={reviews} />;
    }
  };
  render() {
    const {
      currentTab,
      movie,
      similarMovies,
      reviews,
      isAuthorizationRequired,
      match
    } = this.props;

    const {
      background,
      poster,
      title,
      genre,
      release,
      color,
      id,
      isFavorite
    } = movie;
    return (
      <>
        {Object.keys(movie).length ? (
          <section
            className='movie-card movie-card--full'
            style={{
              backgroundColor: `${color}`
            }}
          >
            <div className='movie-card__hero'>
              <div className='movie-card__bg'>
                <img src={background} alt={title} />
              </div>

              <h1 className='visually-hidden'>WTW</h1>
              <HeaderWrapped classMod={`movie-card__head`} />
              <div className='movie-card__wrap'>
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
                    <Link
                      to={
                        !isAuthorizationRequired
                          ? `/film/${id}/review`
                          : `/login`
                      }
                      className='btn movie-card__button'
                    >
                      Add review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='movie-card__wrap movie-card__translate-top'>
              <div className='movie-card__info'>
                <div className='movie-card__poster movie-card__poster--big'>
                  <img src={poster} alt={title} width='218' height='327' />
                </div>
                <div className='movie-card__desc'>
                  <TabsList
                    onTabChange={this.onTabChange}
                    currentTab={currentTab}
                  />
                  {this.showContent(currentTab, movie, reviews)}
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <div className='page-content'>
          {similarMovies.length ? (
            <section className='catalog catalog--like-this'>
              <h2 className='catalog__title'>More like this</h2>
              <MoviesList movies={similarMovies} />
            </section>
          ) : null}

          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params;
  return {
    currentTab: getCurrentTab(state),
    movie: getMovie(state, id) || {},
    reviews: getReviews(state),
    isAuthorizationRequired: getAuthorizationStatus(state),
    similarMovies: getSimilarMovies(state, id)
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentTab: tab => dispatch(DataActions.setTab(tab)),
  loadReviews: id => dispatch(ReviewsOperations.loadReviews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
