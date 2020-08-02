import { ActionTypes as types } from '../../ActionTypes';

const initialState = {
  reviews: [],
  isSent: false,
  isSending: false,
  error: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_REVIEWS:
      return { ...state, reviews: action.payload };
    case types.POST_REVIEW:
      return { ...state, reviews: action.payload };
    case types.SET_ERROR:
      return { ...state, error: action.payload };
    case types.SET_IS_SENT_STATUS:
      return { ...state, isSent: action.payload };
    case types.SET_IS_SENDING_STATUS:
      return { ...state, isSending: action.payload };
  }

  return state;
};
