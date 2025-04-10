import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IChatsChat,
    IChatsMessage,
    IChatsChatListResponse,
    IChatsGetChatInfoResponse,
    IChatsGetChatMessagesResponse,
    IChatsUploadFileLink,
} from '@app/models/chats';

export interface IChatsState {
    chats: Array<IChatsChat>;
    currentChat: IChatsGetChatInfoResponse | null;
    /**
     * Cache of loaded messages
     * @key chat_id
     * @value array of messages {@link IChatsMessage}
     */
    messages: Record<string, Array<IChatsMessage>>;
    /**
     * Cache of uploads
     * @key chat_id
     * @value array of files {@link IChatsUploadFileLink}
     */
    uploads: Record<string, Array<IChatsUploadFileLink>>;
}

const initialState: IChatsState = {
    chats: [],
    currentChat: null,
    messages: {},
    uploads: {},
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<IChatsChatListResponse>) => {
            state.chats = action.payload;
        },
        setCurrentChat: (state, action: PayloadAction<IChatsGetChatInfoResponse>) => {
            state.currentChat = action.payload;
        },
        setChatMessages: (
            state,
            action: PayloadAction<{
                chat_id: string;
                messages: IChatsGetChatMessagesResponse;
            }>,
        ) => {
            state.messages[action.payload.chat_id] = action.payload.messages;
        },
        addMessage: (state, action: PayloadAction<{ chat_id: string; message: IChatsMessage }>) => {
            if (
                state.messages[action.payload.chat_id]?.some(
                    saved_message => saved_message.id === action.payload.message.id,
                )
            ) {
                return;
            } else {
                state.messages[action.payload.chat_id]?.unshift(action.payload.message);
            }
        },
        addUploadFiles: (
            state,
            action: PayloadAction<{
                chat_id: string;
                files: Array<IChatsUploadFileLink>;
            }>,
        ) => {
            state.uploads[action.payload.chat_id] = [...action.payload.files];
        },
        deleteUploadFiles: (
            state,
            action: PayloadAction<{ chat_id: string; target_id: string }>,
        ) => {
            state.uploads[action.payload.chat_id] = state.uploads[action.payload.chat_id].filter(
                file => file.upload_id !== action.payload.target_id,
            );
        },
        resetUploadFiles: (state, action: PayloadAction<{ chat_id: string }>) => {
            state.uploads[action.payload.chat_id] = [];
        },
        addMoreMessages: (
            state,
            action: PayloadAction<{
                chat_id: string;
                messages: IChatsGetChatMessagesResponse;
            }>,
        ) => {
            state.messages[action.payload.chat_id] = [
                ...state.messages[action.payload.chat_id],
                ...action.payload.messages,
            ];
        },
        addChat: (state, action: PayloadAction<IChatsGetChatInfoResponse>) => {
            state.chats.unshift(action.payload);
            state.messages[action.payload.chat_id] = [];
        },
        updateChatLastMessage: (state, action: PayloadAction<IChatsChat>) => {
            const current_chat_id = action.payload.chat_id;

            //@ts-expect-error TODO Fix typings of chat messages
            state.chats = state.chats.map(chat => {
                if (chat.chat_id === current_chat_id) {
                    return {
                        ...chat,
                        last_message: action?.payload || null,
                        updated_at: action?.payload.created_at,
                    };
                }
                return chat;
            });
        },
        updateMessageStatus: (
            state,
            action: PayloadAction<{
                chat_id: string;
                id: number;
                status: IChatsMessage['status'];
            }>,
        ) => {
            const targetMessageIndex =
                state.messages[action.payload.chat_id]?.findIndex(
                    message => message.id === action.payload.id,
                ) ?? 0;

            if (targetMessageIndex !== -1) {
                state.messages[action.payload.chat_id][targetMessageIndex].status =
                    action.payload.status;
                state.messages[action.payload.chat_id][targetMessageIndex].id = action.payload.id;
            }
        },
    },
});

export const {
    setChats,
    setCurrentChat,
    addMessage,
    addMoreMessages,
    updateMessageStatus,
    setChatMessages,
    addChat,
    updateChatLastMessage,
    addUploadFiles,
    resetUploadFiles,
    deleteUploadFiles,
} = chatsSlice.actions;

export default chatsSlice.reducer;
