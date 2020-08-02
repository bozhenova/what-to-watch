import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { adaptComments } from '../../../adapter';

export const ActionCreator = {
  loadReviews: reviews => ({
    type: types.LOAD_REVIEWS,
    payload: reviews
  }),
  postReview: reviews => ({
    type: types.POST_REVIEW,
    payload: reviews
  }),
  setSendingStatus: isSent => ({
    type: types.SET_IS_SENT_STATUS,
    payload: isSent
  }),
  lockForm: isSending => ({
    type: types.SET_IS_SENDING_STATUS,
    payload: isSending
  }),
  setError: error => ({
    type: types.SET_ERROR,
    payload: error
  })
};

export const Operations = {
  loadReviews: id => {
    return (dispatch, _getState, api) => {
      return api
        .get(`${Constants.COMMENTS_PATH}/${id}`)
        .then(response => adaptComments(response))
        .then(data => {
          dispatch(ActionCreator.loadReviews(data));
        });
    };
  },
  postReview: (id, review) => {
    return (dispatch, _getState, api) => {
      return api
        .post(`${Constants.COMMENTS_PATH}/${id}`, {
          comment: review.comment,
          rating: review.rating
        })
        .then(response => adaptComments(response))
        .then(data => {
          dispatch(ActionCreator.postReview(data));
          dispatch(ActionCreator.lockForm(false));
          dispatch(ActionCreator.setSendingStatus(true));
          dispatch(ActionCreator.setError(''));
        })
        .catch(error => {
          dispatch(ActionCreator.setError(error));
          dispatch(ActionCreator.lockForm(false));
        });
    };
  }
};
