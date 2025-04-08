import { Middleware } from '@reduxjs/toolkit';
import { usersApi } from '@app/services/users';
import { AppDispatch } from '@app/store/store';
import { setCurrentUser } from '@app/store/features/users';

const usersMiddleware: Middleware = (store) => (next) => async (action) => {

  const dispatch: AppDispatch = store.dispatch;

  if (usersApi.endpoints.getCurrentUserInfo.matchFulfilled(action)) {
    dispatch(setCurrentUser(action.payload));
  }

  if (usersApi.endpoints.patchCurrentUserInfo.matchFulfilled(action)) {
    console.log('agggaaa!', action.payload)
    dispatch(setCurrentUser(action.payload));
  }

  // If there an error - delete tokens
  if (usersApi.endpoints.getCurrentUserInfo.matchRejected(action)) {

    if (action?.payload?.status === 404) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  return next(action);
};

export default usersMiddleware;
