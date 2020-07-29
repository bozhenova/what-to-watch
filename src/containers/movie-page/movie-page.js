import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header';
import Footer from '../../components/footer';
import MoviesList from '../../components/movies-list';
import TabsList from '../../components/tabs-list';
import Overview from '../../components/overview/';
import Details from '../../components/details';
import Reviews from '../../components/reviews';
import { movies, reviews } from '../../mocks';
import { Constants } from '../../constants';
import { ActionCreator } from '../../redux/reducer/data/actions';
import { getCurrentTab } from '../../redux/reducer/data/selectors';

class MoviePage extends PureComponent {
  onTabChange = tab => {
    this.props.setCurrentTab(tab);
  };

  showContent = tab => {
    switch (tab) {
      case 'Overview':
        return <Overview movie={movies[0]} />;

      case 'Details':
        return <Details movie={movies[0]} />;

      case 'Reviews':
        return <Reviews reviews={reviews} />;
    }
  };
  render() {
    const { background, poster, title, genre, release } = movies[0];

    return (
      <>
        <section className='movie-card movie-card--full'>
          <div className='movie-card__hero'>
            <div className='movie-card__bg'>
              <img src={background} alt={title} />
            </div>

            <h1 className='visually-hidden'>WTW</h1>
            <Header classModPrefix={`movie-card`} />
            <div className='movie-card__wrap'>
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
                  <a href='add-review.html' className='btn movie-card__button'>
                    Add review
                  </a>
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
                  currentTab={this.props.currentTab}
                />
                {this.showContent(this.props.currentTab)}
              </div>
            </div>
          </div>
        </section>
        <div className='page-content'>
          <section className='catalog catalog--like-this'>
            <h2 className='catalog__title'>More like this</h2>
            <MoviesList
              movies={movies.slice(0, Constants.MAX_SIMILAR_MOVIES)}
            />
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentTab: tab => dispatch(ActionCreator.setTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
