import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
const shortid = require('shortid');

const MoviesList = ({ movies }) => {
  return (
    <div className='catalog__movies-list'>
      {movies.map(movie => {
        return <MovieCard movie={movie} key={shortid.generate()} />;
      })}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesList;
