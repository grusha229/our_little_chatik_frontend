import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRefreshTokenResponse } from '@app/models/auth';

export interface IAuthState {
    refresh_token: string;
    token: string;
    activated_email?: string;
    activation_timestamp?: string;
}

const initialState: IAuthState = {
    refresh_token: '',
    token: '',
    activated_email: '',
    activation_timestamp: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Partial<IRefreshTokenResponse>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        deleteTokens: state => {
            state.refresh_token = '';
            state.token = '';
            state.activated_email = '';
            state.activation_timestamp = '';
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('activated_email');
            localStorage.removeItem('activation_timestamp');
        },
        setActivatedEmail: (state, action: PayloadAction<string>) => {
            state.activated_email = action.payload;
        },
        setActivationTimestamp: (state, action: PayloadAction<string>) => {
            state.activation_timestamp = action.payload;
            localStorage.setItem('activation_timestamp', action.payload);
        },
        deleteActivatedEmail: state => {
            state.activated_email = '';
        },
        loadTokensFromStorage: state => {
            state.token = localStorage.getItem('access_token') || '';
            state.refresh_token = localStorage.getItem('refresh_token') || '';
            state.activated_email = localStorage.getItem('activated_email') || '';
            state.activation_timestamp = localStorage.getItem('activation_timestamp') || '';
        },
    },
});

export const { setTokens, deleteTokens, loadTokensFromStorage, setActivatedEmail, deleteActivatedEmail, setActivationTimestamp } = authSlice.actions;

export default authSlice.reducer;
