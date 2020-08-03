import React from 'react';
import { parseDate } from '../../utils';
const shortid = require('shortid');
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => {
  return (
    <div className='movie-card__reviews movie-card__row'>
      <div className='movie-card__reviews-col'>
        {reviews.map(review => {
          return (
            <div className='review' key={shortid.generate()}>
              <blockquote className='review__quote'>
                <p className='review__text'>{review.comment}</p>
                <footer className='review__details'>
                  <cite className='review__author'>{review.user.name}</cite>
                  <time className='review__date' dateTime={review.date}>
                    {parseDate(review.date)}
                  </time>
                </footer>
              </blockquote>
              <div className='review__rating'>{review.rating}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default Reviews;
