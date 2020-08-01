import { ActionTypes as types } from '../../ActionTypes';

const initialState = {
  isAuthorizationRequired: true,
  loginData: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return { ...state, loginData: action.payload };
    case types.SET_AUTHORIZATION_REQUIRED:
      return { ...state, isAuthorizationRequired: action.payload };
  }
  return state;
};
