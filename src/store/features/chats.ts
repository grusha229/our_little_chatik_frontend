import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChatsChat, IChatsMessage, IChatsChatListResponse, IChatsGetChatInfoResponse, IChatsGetChatMessagesResponse } from "../../models/chats";

export interface IChatsState {
  chats: Array<IChatsChat>;
  currentChat: IChatsGetChatInfoResponse | null;
  messages: Record<string, Array<IChatsMessage>>
}

const initialState: IChatsState  = {
  chats: [],
  currentChat: null,
  messages: {},
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
    setChatMessages: (state, action: PayloadAction<{ chat_id: string; messages: IChatsGetChatMessagesResponse }>) => {
      state.messages[action.payload.chat_id] = action.payload.messages
    },
    addMessage: (state, action: PayloadAction<{ chat_id: string; message: IChatsMessage }>) => {
      state.messages[action.payload.chat_id].unshift(action.payload.message);
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{
        /** Temporary ID */
        tempId: string;
        chat_id: string;
        id: string;
        status: IChatsMessage['status'] 
      }>
    ) => {
      const targetMessageIndex = state.messages[action.payload.chat_id].findIndex((message) => message.id === action.payload.tempId);

      if (targetMessageIndex !== -1) {
        state.messages[action.payload.chat_id][targetMessageIndex].status = action.payload.status;
        state.messages[action.payload.chat_id][targetMessageIndex].id = action.payload.id
      }

    }
    },
  },
);

export const { setChats, setCurrentChat, addMessage, updateMessageStatus, setChatMessages } = chatsSlice.actions;

export default chatsSlice.reducer;
