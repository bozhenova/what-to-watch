import MockAdapter from 'axios-mock-adapter';

import { reducer } from './user';
import configureAPI from '../../../services/api';
import { Operations } from './actions';
import { ActionTypes as types } from '../../ActionTypes';
import { Constants } from '../../../constants';
import { loginData } from '../../../mocks';
import { adaptLoginResponse } from '../../../adapter';

describe('Reducer works correctly', () => {
  it('Should set login data', () => {
    const loginData = {
      avatarUrl: '/static/avatar/6.jpg',
      email: 'name@gmail.com',
      id: 1,
      name: 'name'
    };

    expect(
      reducer(
        {
          isAuthorizationRequired: true,
          loginData: {}
        },
        { type: types.SET_USER_DATA, payload: loginData }
      )
    ).toEqual({
      isAuthorizationRequired: true,
      loginData: loginData
    });
  });

  it('Should change authorization status', () => {
    expect(
      reducer(
        {
          isAuthorizationRequired: true,
          loginData: {}
        },
        { type: types.SET_AUTHORIZATION_REQUIRED, payload: false }
      )
    ).toEqual({
      isAuthorizationRequired: false,
      loginData: {}
    });
  });

  it('Should make a correct API call POST to /login', () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const formData = { email: '', password: '' };
    const authorizer = Operations.authorize(formData);

    apiMock.onPost(Constants.LOGIN_PATH).reply(Constants.STATUS_OK, loginData);

    return authorizer(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: types.SET_USER_DATA,
        payload: adaptLoginResponse(loginData)
      });
    });
  });
});
