import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
const shortid = require('shortid');

const MoviesList = ({ movies }) => {
  const [activeCard, setActiveCard] = useState(movies[0]);

  const selectCard = movie => {
    setActiveCard(movie);
    console.log(activeCard);
  };

  return (
    <div className='catalog__movies-list'>
      {movies.map(movie => {
        return (
          <MovieCard
            movie={movie}
            key={shortid.generate()}
            selectCard={selectCard}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
