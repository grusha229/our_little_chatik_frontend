import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatsChat, IChatsChatListResponse } from "../../models/chats";

export interface IAuthState {
  chats: Array<IChatsChat>;
}

const initialState: IAuthState  = {
  chats: [],
}

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChatsChatListResponse>) => {
      state.chats = action.payload;
    },
  },
});

export const { setChats } = chatsSlice.actions;

export default chatsSlice.reducer;
