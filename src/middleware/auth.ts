import { Middleware } from '@reduxjs/toolkit';
import { authApi } from '@app/services/auth';
import { setTokens, deleteTokens, setActivatedEmail, deleteActivatedEmail } from '@app/store/features/auth';

const authMiddleware: Middleware = store => next => async action => {
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
        const params = action.meta.arg.originalArgs;

        const timestamp = new Date().getTime().toString();

        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('activated_email', params.email);
        localStorage.setItem('activation_timestamp', timestamp);

        store.dispatch(setActivatedEmail(params.email));
        store.dispatch(setTokens({ token, refresh_token }));
    }

    // If there an error - delete tokens
    if (authApi.endpoints.logoutUser.matchFulfilled(action)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        store.dispatch(deleteActivatedEmail());
        store.dispatch(deleteTokens());
    }

    // If there an error - delete tokens
    if (authApi.endpoints.activateUser.matchFulfilled(action)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('activated_email');
        localStorage.removeItem('activation_timestamp');

        store.dispatch(deleteTokens());
    }

    return result;
};

export default authMiddleware;
