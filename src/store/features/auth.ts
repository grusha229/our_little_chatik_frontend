import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRefreshTokenResponse } from "../../models/auth";

export interface IAuthState {
  refresh_token: string | null;
  token: string | null;
  activated_email?: string | null;
}

const initialState: IAuthState  = {
  refresh_token: null,
  token: null,
  activated_email: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<IRefreshTokenResponse>) => {
      state.refresh_token = action.payload.refresh_token;
      state.token = action.payload.token;
    },
    deleteTokens: (state) => {
      state.refresh_token = null;
      state.token = null;
    },
    setActivatedEmail: (state, action: PayloadAction<string>) => {
      state.activated_email = action.payload;
    },
    deleteActivatedEmail: (state) => {
      state.activated_email = null;
    },
    loadTokensFromStorage: (state) => {
      state.token = localStorage.getItem('access_token');
      state.refresh_token = localStorage.getItem('refresh_token');
    },
  },
});

export const { setTokens, deleteTokens, loadTokensFromStorage, setActivatedEmail, deleteActivatedEmail } = authSlice.actions;

export default authSlice.reducer;
