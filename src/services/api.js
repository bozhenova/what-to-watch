import axios from 'axios';
import { Constants } from '../constants';

const configureAPI = onLoginFail => {
  const api = axios.create({
    baseURL: Constants.BASE_URL,
    timeout: Constants.TIMEOUT,
    withCredentials: true
  });

  const onSuccess = response => response.data;

  const onFail = ({ response }) => {
    if (response.status && response.status === Constants.ACCESS_DENIED) {
      onLoginFail();
      return response;
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
