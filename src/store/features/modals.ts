import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModalsState {
  create_chat: boolean;
}

const initialState: IModalsState  = {
  create_chat: false,
}

export const modalsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof IModalsState>) => {
      state[action.payload] = true;
    },
    closeModal: (state,  action: PayloadAction<keyof IModalsState>) => {
      state[action.payload] = false
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
