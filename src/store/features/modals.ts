import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMediaRefItem } from "@app/models/chats";

export interface IBaseModalState {
  isVisible: boolean;
}

export interface IPersonalInfo extends IBaseModalState {
  current_id: string
}

export interface IImageViewer extends IBaseModalState {
  images: IMediaRefItem[],
  start_image: IMediaRefItem | null,
}

export interface IModalsState {
  create_chat: IBaseModalState;
  user_info: IPersonalInfo;
  image_viewer: IImageViewer;
}

const initialState: IModalsState  = {
  create_chat: {
    isVisible: false
  },
  user_info: {
    isVisible: false,
    current_id: '',
  },
  image_viewer: {
    isVisible: false,
    images: [],
    start_image: null,
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
