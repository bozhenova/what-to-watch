export const getAuthorizationStatus = state =>
  state.user.isAuthorizationRequired;
export const getLoginData = state => state.user.loginData;
export const getError = state => state.user.error;
