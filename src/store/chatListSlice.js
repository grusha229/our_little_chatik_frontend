import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ChatListService from "../service/ChatListService";

export const getChats = createAsyncThunk(
    'chats/get-chatlist', 
    async function (arg,{dispatch}) {
        dispatch(setStatus('Pending'))

        const request = ChatListService.getList()

        const timer = new Promise((resolve, reject) => {
            setTimeout(()=>{
                reject(new Error('Request time is out. Server haven`t responded'));
            }, 3000);
          });

        try {
            Promise.race([request,timer])
                .then((res) => {
                    console.log("список чатов: ",res.data)
                    dispatch(setChats(res.data));
                    dispatch(setStatus('Fulfilled'))
                })
                .catch((e)=>{
                    // console.log(e)
                    dispatch(setError(e));
                    dispatch(setStatus('Rejected'))
                })

        
        } catch(e) {
            // console.log(e);
            dispatch(setError(e));
            dispatch(setStatus('Rejected'))
        }
    });

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
            /* TODO Исправить chat_id на name
            так было сделано пока в списке чатов не приходили имена
            */

            const queryList = state.chats.filter(chat => {
                return chat.chat_id.toUpperCase().includes(action.payload.toUpperCase());
            })

            return {
                ...state,
                searchChats: {
                    query: action.payload,
                    searchedChats: queryList
                }
            }
        },
        setChats(state, action) {
            state.chats = action.payload
            state.searchChats.searchedChats = action.payload
        },
        pushChat(state, action) {
            state.chats.unshift(action.payload);
        },
        setError(state, action) {
            state.error = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
    }
})

export const {searchChats, setChats, setError, setStatus, pushChat} = chatsSlice.actions;

export default chatsSlice.reducer