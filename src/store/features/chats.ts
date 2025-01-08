import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatsChat, IChatsChatListResponse, IChatsGetChatInfoResponse } from "../../models/chats";

export interface IChatsState {
  chats: Array<IChatsChat>;
  currentChat: IChatsGetChatInfoResponse | null
}

const initialState: IChatsState  = {
  chats: [],
  currentChat: null,
}

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChatsChatListResponse>) => {
      state.chats = action.payload;
    },
    setCurrentChat: (state, action: PayloadAction<IChatsGetChatInfoResponse>) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setChats, setCurrentChat } = chatsSlice.actions;

export default chatsSlice.reducer;
