import { Middleware } from '@reduxjs/toolkit';
import { usersApi } from '../services/users';
import { AppDispatch } from '../store/store';
import { setCurrentUser } from '../store/features/users';

const usersMiddleware: Middleware = (store) => (next) => async (action) => {

  const dispatch: AppDispatch = store.dispatch;

  if (usersApi.endpoints.getUserInfo.matchFulfilled(action)) {
    dispatch(setCurrentUser(action.payload));
  }

  // If there an error - delete tokens
  if (usersApi.endpoints.getUserInfo.matchRejected(action)) {

    if (action?.payload?.status === 404) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  return next(action);
};

export default usersMiddleware;
