import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchMessages  = createAsyncThunk(
    'messages/fetch-messages',
    async function (id) {
        const response = await fetch('http://localhost:3003/Messages');

        const data = await response.json();

        return data[id]
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: [],
        status: null,
        error: null
    },
    reducers: {
        searchMessages(state, action) {
            const querySearch = action.payload
            const queryList = state.chats.filter(chat => {
                return chat.name.toUpperCase().includes(querySearch.toUpperCase());
            })

            return {
                ...state,
                searchChats: {
                    query: action.payload,
                    searchedChats: queryList
                }
            }
        },
        addMessage(state, action) {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
    },
    extraReducers: {
        [fetchMessages.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [fetchMessages.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.messages = action.payload;
        },
        [fetchMessages.rejected]: (state) => {
            state.status = "error";
            state.error = true;
        },
    }
})

export const {addMessage,searchChats} = messagesSlice.actions;

export default messagesSlice.reducer
