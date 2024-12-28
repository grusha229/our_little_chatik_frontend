import { Middleware } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { setTokens, deleteTokens } from '../store/features/auth';

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);

  // If get tokens - save to store
  if (authApi.endpoints.refreshToken.matchFulfilled(action)) {
    const { token, refresh_token } = action.payload;
    store.dispatch(setTokens({ token, refresh_token }));
  }

  // If get tokens - save to store
  if (authApi.endpoints.loginUser.matchFulfilled(action)) {
    const { token, refresh_token } = action.payload;
    store.dispatch(setTokens({ token, refresh_token }));
  }

    // If get tokens - save to store
    if (authApi.endpoints.signupUser.matchFulfilled(action)) {
      const { token, refresh_token } = action.payload;
      store.dispatch(setTokens({ token, refresh_token }));
    }

  // If there an error - delete tokens
  if (authApi.endpoints.refreshToken.matchRejected(action)) {
    store.dispatch(deleteTokens());
  }

  return result;
};

export default authMiddleware;
