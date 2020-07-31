import React, { PureComponent } from 'react';
import Footer from '../../components/footer';
import HeaderWrapper from '../../components/header';
import MoviesList from '../../components/movies-list';
import { movies } from '../../mocks';

class MyList extends PureComponent {
  render() {
    return (
      <div className='user-page'>
        <HeaderWrapper classModPrefix={`user-page`} />
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>
          <MoviesList movies={movies} />
        </section>
        <Footer />
      </div>
    );
  }
}

export default MyList;
