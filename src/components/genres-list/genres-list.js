import React from 'react';
const shortid = require('shortid');
import PropTypes from 'prop-types';

const GenresList = ({ currentGenre, onGenreChange, genres }) => {
  const handleClick = e => {
    e.preventDefault();
    onGenreChange(e.target.dataset.genre);
  };

  return (
    <ul className='catalog__genres-list'>
      <li
        className={`catalog__genres-item ${
          currentGenre === `All genres` ? `catalog__genres-item--active` : ``
        }`}
        key={shortid.generate()}
        onClick={handleClick}
      >
        <a href='#' className='catalog__genres-link' data-genre='All genres'>
          All genres
        </a>
      </li>
      {genres.map(genre => {
        return (
          <li
            className={`catalog__genres-item ${
              currentGenre === genre ? `catalog__genres-item--active` : ``
            }`}
            key={shortid.generate()}
            onClick={handleClick}
          >
            <a href='#' className='catalog__genres-link' data-genre={genre}>
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

export default GenresList;
