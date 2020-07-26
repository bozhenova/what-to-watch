import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player';

const MovieCard = ({ movie, selectCard }) => {
  const { title, image } = movie;
  const [isActive, setIsActive] = useState(false);

  const onMouseEnter = () => {
    selectCard(movie);
    setIsActive(true);
  };

  const onMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <article
      className='small-movie-card catalog__movies-card'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isActive ? (
        <VideoPlayer movie={movie} isActive={isActive} />
      ) : (
        <div className='small-movie-card__image'>
          <img src={image} alt={title} width='280' height='175' />
        </div>
      )}
      <h3 className='small-movie-card__title'>
        <a className='small-movie-card__link' href='movie-page.html'>
          {title}
        </a>
      </h3>
    </article>
  );
};

export default MovieCard;
