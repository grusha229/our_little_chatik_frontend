import { Middleware } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { setTokens, deleteTokens } from '../store/features/auth';

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);

  // If get tokens - save to store
  if (authApi.endpoints.refreshToken.matchFulfilled(action)) {
    const { token, refresh_token } = action.payload;

    // Сохраняем токены в localStorage
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh_token);


    store.dispatch(setTokens({ token, refresh_token }));
  }

  // If there an error - delete tokens
  if (authApi.endpoints.refreshToken.matchRejected(action)) {
  
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    store.dispatch(deleteTokens());
  }

  // If get tokens - save to store
  if (authApi.endpoints.loginUser.matchFulfilled(action)) {
    const { token, refresh_token } = action.payload;

    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh_token);

    store.dispatch(setTokens({ token, refresh_token }));
  }

  // If get tokens - save to store
  if (authApi.endpoints.signupUser.matchFulfilled(action)) {
    const { token, refresh_token } = action.payload;

    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh_token);

    store.dispatch(setTokens({ token, refresh_token }));
  }

  // If there an error - delete tokens
  if (authApi.endpoints.logoutUser.matchFulfilled(action)) {

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    store.dispatch(deleteTokens());
  }

  // If there an error - delete tokens
  if (authApi.endpoints.activateUser.matchFulfilled(action)) {

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    store.dispatch(deleteTokens());
  }

  return result;
};

export default authMiddleware;
