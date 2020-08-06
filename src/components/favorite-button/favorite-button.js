import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Constants } from '../../constants';
import history from '../../history';
import { getAuthorizationStatus } from '../../redux/reducer/user/selectors';
import { Operations as FavoritesOperations } from '../../redux/reducer/favorites/actions';
import { Operations as DataOperations } from '../../redux/reducer/data/actions';

const FavoriteButton = ({ id, isFavorite, match }) => {
  const isAuthorizationRequired = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const updateFavoriteMovies = (id, isFavorite, match) => {
    dispatch(FavoritesOperations.updateFavorites(id, isFavorite));
    updateMovies(match, id);
  };

  const onMyListButtonClick = () => {
    if (isAuthorizationRequired) {
      history.push(Constants.LOGIN_PATH);
      return;
    }
    updateFavoriteMovies(id, isFavorite, match);
  };

  const updateMovies = (match, id) => {
    switch (match.path) {
      case '/':
        dispatch(DataOperations.loadPromoMovie(id));
        return;
      case '/film/:id':
        dispatch(DataOperations.loadMovies());
        return;
    }
  };

  return (
    <button
      className='btn btn--list movie-card__button'
      type='button'
      onClick={onMyListButtonClick}
    >
      <svg viewBox='0 0 19 20' width='19' height='20'>
        {!isAuthorizationRequired && isFavorite ? (
          <use xlinkHref='#in-list' />
        ) : (
          <use xlinkHref='#add' />
        )}
      </svg>
      <span>My list</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  match: PropTypes.object.isRequired
};

export default FavoriteButton;
