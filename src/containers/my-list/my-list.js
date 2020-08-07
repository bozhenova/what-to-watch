import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getFavorites } from '../../redux/reducer/favorites/selectors';
import { Operations } from '../../redux/reducer/favorites/actions';
import Footer from '../../components/footer';
import HeaderWrapper from '../../components/header';
import MoviesList from '../../components/movies-list';

class MyList extends PureComponent {
  static propTypes = {
    loadFavorites: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const { favorites } = this.props;

    return (
      <div className='user-page'>
        <HeaderWrapper classMod={`user-page__head`} />
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <MoviesList movies={favorites} />
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: getFavorites(state)
});

const mapDispatchToProps = dispatch => ({
  loadFavorites: () => dispatch(Operations.loadFavorites())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
