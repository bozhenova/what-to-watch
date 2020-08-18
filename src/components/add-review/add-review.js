import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderWrapped from '../header';
import { getMovieById } from '../../redux/reducer/data/selectors';
import {
  Operations as ReviewsOperations,
  ActionCreator
} from '../../redux/reducer/reviews/actions';
import {
  getReviewSendingStatus,
  getReviewSendingProcessStatus
} from '../../redux/reducer/reviews/selectors';
import { Constants } from '../../constants';

const AddReview = () => {
  const form = useRef();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);

  const isSent = useSelector(getReviewSendingStatus);
  const isSending = useSelector(getReviewSendingProcessStatus);

  const { id } = useParams();
  const movie = useSelector(state => getMovieById(state, id)) || {};

  const handleTextareaChange = e => {
    setComment(e.target.value);
  };

  const handleRatingChange = e => {
    setRating(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(ReviewsOperations.postReview(id, { comment, rating }));
    dispatch(ActionCreator.lockForm(true));
  };

  useEffect(() => {
    const hasText =
      comment.length >= Constants.MIN_TEXT_LENGTH &&
      comment.length <= Constants.MAX_TEXT_LENGTH;
    const hasRating = rating > 0;
    setIsValid(hasText && hasRating);

    if (isSent) {
      setIsValid(false);
      setRating(0);
      setComment('');
      dispatch(ActionCreator.setSendingStatus(false));
      form.current.reset();
    }
  }, [comment, rating, isSent]);

  const { title, poster, color, background } = movie;
  return (
    <section
      className='movie-card movie-card--full'
      style={{
        backgroundColor: `${color}`
      }}
    >
      <div className='movie-card__header'>
        <div className='movie-card__bg'>
          <img src={background} alt={title} />
        </div>
        <h1 className='visually-hidden'>WTW</h1>
        <HeaderWrapped title={title} />
        <div className='movie-card__poster movie-card__poster--small'>
          <img src={poster} alt={title} width='218' height='327' />
        </div>
      </div>

      <div className='add-review'>
        <form
          action='#'
          className='add-review__form'
          onSubmit={handleFormSubmit}
          ref={form}
        >
          <div className='rating'>
            <div className='rating__stars' onChange={handleRatingChange}>
              <input
                className='rating__input'
                id='star-1'
                type='radio'
                name='rating'
                value='1'
              />
              <label className='rating__label' htmlFor='star-1'>
                Rating 1
              </label>

              <input
                className='rating__input'
                id='star-2'
                type='radio'
                name='rating'
                value='2'
              />
              <label className='rating__label' htmlFor='star-2'>
                Rating 2
              </label>

              <input
                className='rating__input'
                id='star-3'
                type='radio'
                name='rating'
                value='3'
              />
              <label className='rating__label' htmlFor='star-3'>
                Rating 3
              </label>

              <input
                className='rating__input'
                id='star-4'
                type='radio'
                name='rating'
                value='4'
              />
              <label className='rating__label' htmlFor='star-4'>
                Rating 4
              </label>

              <input
                className='rating__input'
                id='star-5'
                type='radio'
                name='rating'
                value='5'
              />
              <label className='rating__label' htmlFor='star-5'>
                Rating 5
              </label>
            </div>
          </div>

          <div className='add-review__text'>
            <textarea
              className='add-review__textarea'
              name='review-text'
              id='review-text'
              placeholder='Review text'
              value={comment}
              onChange={handleTextareaChange}
              minLength={Constants.MIN_TEXT_LENGTH}
              maxLength={Constants.MAX_TEXT_LENGTH}
            />
            <div className='add-review__submit'>
              <button
                className='add-review__btn'
                type='submit'
                disabled={!isValid || isSending}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
