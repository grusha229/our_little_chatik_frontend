import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatsChat, IChatsChatListResponse, IChatsSearchMessagesResponse } from "../../models/chats";

export interface IAuthState {
  chats: Array<IChatsChat>;
  search_results: IChatsSearchMessagesResponse;
}

const initialState: IAuthState  = {
  chats: [],
  search_results: {
    chats: [],
    messages: [],
    users: [],
  }
}

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChatsChatListResponse>) => {
      state.chats = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IChatsSearchMessagesResponse>) => {
      state.search_results = action.payload;
    },
    deleteSearchResults: (state) => {
      state.search_results = initialState.search_results;
    },
  },
});

export const { setChats, setSearchResults, deleteSearchResults } = chatsSlice.actions;

export default chatsSlice.reducer;
