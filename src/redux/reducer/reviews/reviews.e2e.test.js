import MockAdapter from 'axios-mock-adapter';

import { reducer } from './reviews';
import configureAPI from '../../../services/api';
import { Operations } from './actions';
import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { reviews } from '../../../mocks';
import { adaptComments } from '../../../adapter';

describe('Reducer works correctly', () => {
  it('Should change sending status', () => {
    expect(
      reducer(
        {
          reviews: [],
          isSent: false,
          isSending: false,
          error: null
        },
        { type: types.SET_IS_SENT_STATUS, payload: true }
      )
    ).toEqual({
      reviews: [],
      isSent: true,
      isSending: false,
      error: null
    });
  });

  it('Should lock form', () => {
    expect(
      reducer(
        {
          reviews: [],
          isSent: false,
          isSending: false,
          error: null
        },
        { type: types.SET_IS_SENDING_STATUS, payload: true }
      )
    ).toEqual({
      reviews: [],
      isSent: false,
      isSending: true,
      error: null
    });
  });

  it('Should make a correct API call to /comments/id', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const id = 1;
    const reviewsLoader = Operations.loadReviews(id);

    apiMock
      .onGet(`${Constants.COMMENTS_PATH}/${id}`)
      .reply(Constants.STATUS_OK, reviews);

    return reviewsLoader(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.LOAD_REVIEWS,
        payload: adaptComments(reviews)
      });
    });
  });

  it('Should make a correct API call POST to /comments/id', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const id = 1;
    const review = { comment: 'Comment', rating: 5 };
    const reviewPost = Operations.postReview(id, review);

    apiMock
      .onPost(`${Constants.COMMENTS_PATH}/${id}`)
      .reply(Constants.STATUS_OK, reviews);

    return reviewPost(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.POST_REVIEW,
        payload: adaptComments(reviews)
      });
    });
  });
});
