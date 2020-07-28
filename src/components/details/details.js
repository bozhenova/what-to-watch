import React from 'react';
import { parseRuntime } from '../../utils';
const shortid = require('shortid');

const Details = ({ movie }) => {
  const { crew, runtime, genre, release } = movie;
  const actors = crew.starring.map((actor, index) => {
    return (
      <li key={shortid.generate()} style={{ listStyle: `none` }}>
        {actor}
        {index === crew.starring.length - 1 ? `` : `,`}{' '}
      </li>
    );
  });

  return (
    <div className='movie-card__text movie-card__row'>
      <div className='movie-card__text-col'>
        <p className='movie-card__details-item'>
          <strong className='movie-card__details-name'>Director</strong>
          <span className='movie-card__details-value'>{crew.director}</span>
        </p>
        <p className='movie-card__details-item'>
          <strong className='movie-card__details-name'>Starring</strong>
          <span className='movie-card__details-value'>{actors}</span>
        </p>
      </div>

      <div className='movie-card__text-col'>
        <p className='movie-card__details-item'>
          <strong className='movie-card__details-name'>Runtime</strong>
          <span className='movie-card__details-value'>
            {parseRuntime(runtime)}
          </span>
        </p>
        <p className='movie-card__details-item'>
          <strong className='movie-card__details-name'>Genre</strong>
          <span className='movie-card__details-value'>{genre}</span>
        </p>
        <p className='movie-card__details-item'>
          <strong className='movie-card__details-name'>Released</strong>
          <span className='movie-card__details-value'>{release}</span>
        </p>
      </div>
    </div>
  );
};

export default Details;
