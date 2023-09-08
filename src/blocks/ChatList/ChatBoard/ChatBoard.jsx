import {ChatItem, LoadingChatItem} from "../ChatItem/ChatItem.jsx";
import s from "./ChatBoard.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {getChats, pushChat} from "../../../store/chatListSlice.js";
import {pushMessage} from "../../../store/messagesSlice.js";

const Loader = () => (
    <>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
        <LoadingChatItem/>
    </>
)

export default function ChatBoard () {

    const dispatch = useDispatch()

    const chatListParsed = useSelector((state) => state.chatList.searchChats.searchedChats);

    const chatList = useSelector((state) => state.chatList.chats);

    const chatListStatus = useSelector((state) => state.chatList.status);
    const chatListError = useSelector((state) => state.chatList.error);

    const CURRENT_USER_DATA = useSelector((state) => state.user.userInfo);

    const [wsStatus, setwsStatus] = useState(false)
    const socket = useRef(null)

    const WS_URL = 'ws://'+ window.location.host +'/ws/diff?user_id='+CURRENT_USER_DATA.user_id;

    socket.onmessage = function (e) {
        console.log(e.data);
        console.log(JSON.parse(e.data));
    }

    const wsConnect = () => {
        console.log('Try to connect..')
        socket.current = new WebSocket(WS_URL);

        socket.current.onopen = () => {
            console.log('WS connected');
            setwsStatus(true);
        }

        socket.current.onclose = () => {
            console.log('WS disconnected');
            setwsStatus(false);

            // console.log('Try to reconnect..')
            // wsConnect();
        }
    }

    useEffect(()=> {
        wsConnect()
        if (socket.current) {
            gettingDiff()
        }
    },[socket,CURRENT_USER_DATA])

    useEffect(()=>{
        return () => {
            socket.current.close()
        }
    },[CURRENT_USER_DATA])

    const gettingDiff = useCallback(() => {
        if (!socket.current) return;
        socket.current.onmessage = (e) => {
            console.log('WS message for you: ', e.data)
            console.log('WS message for you: ', JSON.parse(e.data))
            dispatch(pushChat([JSON.parse(e.data)]))
        }
    })

    useEffect(()=>{
        dispatch(getChats());
    },[dispatch])

    return (
        <div className={s.board}>
            {
                (((chatListStatus === "Fulfilled") && (chatList.length === 0)) &&
                    <div className={s.error}>
                        <b>You don`t have any chats</b>
                        <br/>
                        <br/>
                        Click to button on the right of input to add new chats
                    </div>
                )
            }

            {
                ((chatListStatus === "Fulfilled") && (!chatListError)) &&
                    chatListParsed.map((element) => {
                        return (
                            <ChatItem
                                avatar={element.avatar}
                                name={element.name}
                                surname={element.name}
                                lastMessage={element.lastMessage}
                                chatId={element.chat_id}
                                key={element.chat_id}
                                type={'Chatboard'}
                            />
                        )
                    }
                )
            }

            {
                (((chatListStatus === "Pending") && (!chatListError)) &&
                        <Loader/>
                )
            }

            {
                (((chatListStatus === "Rejected") || (chatListError)) &&
                    <div className={s.error}>
                        <b>Ops! There is an error:
                        <br/>{chatListError.message}</b>
                        <br/>
                        <br/>
                        Try to reload this page
                    </div>
                )
            }
        </div>
    );
}
