import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IBaseModalState {
  isVisible: boolean;
}

export interface IPersonalInfo extends IBaseModalState {
  current_id: string
}
export interface IModalsState {
  create_chat: IBaseModalState;
  user_info: IPersonalInfo;
}

const initialState: IModalsState  = {
  create_chat: {
    isVisible: false
  },
  user_info: {
    isVisible: false,
    current_id: '',
  }
}

export const modalsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openModal: <T extends keyof IModalsState>(
      state: IModalsState,
      action: PayloadAction<{ modal: T; params?: Partial<IModalsState[T]> }>
    ) => {
      console.log(action.payload)
      state[action.payload.modal].isVisible = true;
      if (action.payload.params) {
       state[action.payload.modal] = {
        ...state[action.payload.modal],
        ...action.payload.params
       }
      }
    },
    closeModal: (state,  action: PayloadAction<keyof IModalsState>) => {
      state[action.payload].isVisible = false
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
