import {configureStore} from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice.js"
import messageListReducer from "./messagesSlice.js"
import modalReducer from "./modalSlice.js"

export default configureStore({
    reducer:{
        chatList: chatListReducer,
        messageList: messageListReducer,
        modal: modalReducer
    },
})
