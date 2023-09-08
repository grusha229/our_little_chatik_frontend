import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages, { Loader } from "./Messages/Messages";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import {pushMessage, setMessages} from "../../store/messagesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";
import Input from "../../components/input/Input.tsx";
import Button from "../../components/button/Button.jsx";
import CreateRoom from "../../components/room/CreateRoom.jsx";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { io } from "socket.io-client";
import store from "../../store";
import JoinRoom from "../../components/room/JoinRoom.jsx";


export default function ChatArea() {

    const params = useParams();
    const CURRENT_USER_DATA = useSelector((state) => state.user.userInfo);
    const CURRENT_CHAT_ID = params.chatId;

    const dispatch = useDispatch();

    const [messageValue, setMessageValue] = useState('');
    const [wsStatus, setwsStatus] = useState(false)


    const containerRef = useRef(null);
    const socket = useRef(null)

    const messageChange = useCallback((event)=>{
        setMessageValue(event.target.value)
    },[])

    const WS_URL = 'ws://'+ window.location.host +'/ws/chat?chat_id='+CURRENT_CHAT_ID+'&user_id='+CURRENT_USER_DATA.user_id;

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
        if (CURRENT_USER_DATA.user_id) {
            wsConnect()
            if (socket.current) {
                gettingMessages()
            }
        }
        
    },[socket,CURRENT_USER_DATA,CURRENT_CHAT_ID])

    useEffect(()=>{
        return () => {
            socket.current.close()
        }
    },[CURRENT_CHAT_ID])

    const gettingMessages = useCallback(() => {
        if (!socket.current) return;
        socket.current.onmessage = (e) => {
            console.log(CURRENT_CHAT_ID);
            console.log('WS message for you: ', e.data)
            console.log('WS message for you: ', JSON.parse(e.data))
            dispatch(pushMessage([JSON.parse(e.data)]))
        }
    })

    const handleAddMessageClick = useCallback(() => {
        if (!messageValue) {
            return;
        }

        let currentMessage = messageValue

        // dispatch(addMessage(currentMessage))
        socket.current.send(currentMessage)
         
        console.log(currentMessage)

        setMessageValue('');

    }, [messageValue]);


    const handleInputKeyPress = ((event) => {
        if (event.key === "Enter") {
            handleAddMessageClick();
        }
    });

        //TODO поправить userID на chatID
    console.log('!!!!HERE', params.name, params)
    return (
        <>
            <div className={s.main}>
                {
                    ((!CURRENT_USER_DATA) && <Loader/>)
                }
                {
                    ((CURRENT_USER_DATA) &&
                    <>
                        <ChatHeader id={params.chatId} isOnline={wsStatus} name={params.name}/>
                        <div className={s.messages} ref={containerRef}>
                            <Messages
                                    chatId={params.chatId}
                                    name={params.chatName}
                                    container={containerRef.current}
                            />
                        </div>
                        <div className={s.inputs}>
                            <Input
                                value={messageValue}
                                onChange={messageChange}
                                placeholder="Type your message"
                                onKeyUp={handleInputKeyPress}
                            />
                            <Button className={s.button} onClick={handleAddMessageClick}>
                                Send
                            </Button>
                            <JoinRoom chatId={params.chatId}>
                                Join Call
                            </JoinRoom>
                        </div>
                    </>
                    )
                }
            </div>
        </>
    );
}
