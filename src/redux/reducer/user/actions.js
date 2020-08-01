import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { adaptLoginResponse } from '../../../adapter';
import history from '../../../history';

export const ActionCreator = {
  setUserData: user => ({
    type: types.SET_USER_DATA,
    payload: user
  }),
  requiredAuthorization: status => ({
    type: types.SET_AUTHORIZATION_REQUIRED,
    payload: status
  })
};

export const Operations = {
  loadLoginData: () => (dispatch, _getState, api) => {
    api.get(Constants.LOGIN_PATH).then(({ status }) => {
      if (status === Constants.STATUS_OK) {
        const loginData = adaptLoginResponse(response);
        dispatch(ActionCreator.setUserData(loginData));
        dispatch(ActionCreator.requiredAuthorization(false));
      }
    });
  },
  authorize: formData => (dispatch, _getState, api) => {
    return api.post(Constants.LOGIN_PATH, formData).then(response => {
      const loginData = adaptLoginResponse(response);
      dispatch(ActionCreator.setUserData(loginData));
      dispatch(ActionCreator.requiredAuthorization(false));
      history.push(`/`);
    });
  }
};
