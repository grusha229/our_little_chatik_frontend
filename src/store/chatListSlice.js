import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchChats = createAsyncThunk(
    'chats/fetch-chatlist',
    async function () {
        const response = await fetch('http://localhost:3003/Chats');

        const data = await response.json();

        return data
    }
);

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        searchChats: {
            query: '',
            searchedChats: []
        },
        status: null,
        error: null
    },
    reducers: {
        searchChats(state, action) {
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
        }
    },
    extraReducers: {
        [fetchChats.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [fetchChats.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.chats = action.payload;
            state.searchChats.searchedChats = action.payload;
        },
        [fetchChats.rejected]: (state, action) => {
            state.status = "error";
            state.error = true;
        },
    }
})

export const {toggleChats, searchChats} = chatsSlice.actions;

export default chatsSlice.reducer
