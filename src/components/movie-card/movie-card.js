import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, selectCard }) => {
  const { title, image, id } = movie;
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
        <Link to={`/film/${id}`} className='small-movie-card__link'>
          {title}
        </Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  selectCard: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};
export default MovieCard;
