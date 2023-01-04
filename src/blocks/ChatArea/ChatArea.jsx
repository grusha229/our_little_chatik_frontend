import s from "./ChatArea.module.css"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages from "./Messages/Messages";
import ChatHeader from "./ChatHeader/ChatHeader";
import {addMessage} from "../../store/messagesSlice.js";
import {useDispatch} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838";

export default function ChatArea() {

    const dispatch = useDispatch();

    const [messageValue, setMessageValue] = useState('');

    const params = useParams();

    const containerRef = useRef(null);

    const messageChange = useCallback((event)=>{
        setMessageValue(event.target.value)
    },[])

    const handleAddMessageClick = useCallback(() => {
        if (!messageValue) {
            return;
        }

        let currentMessage = {
            "Payload": messageValue,
            "SenderID": YOUR_ID,
            "CreatedAt": new Date().getTime(),
            "ChatID": params.id,
            "MsgID": createId(),
        }

        dispatch(addMessage(currentMessage))

        setMessageValue('');

    }, [messageValue]);


    const handleInputKeyPress = ((event) => {
            if (event.key === "Enter") {
                handleAddMessageClick();
            }
        });


    return (
        <>
            <div className={s.main}>
                <ChatHeader id={params.userId}/>
                <div className={s.messages} ref={containerRef}>
                    <Messages
                            id={params.userId}
                            container={containerRef.current}
                        />
                </div>
                <div className={s.inputs}>
                    <input
                        value={messageValue}
                        onChange={messageChange}
                        className={s.messageInput}
                        placeholder="сообщение"
                        onKeyUp={handleInputKeyPress}
                    />
                    <button className={s.button} onClick={handleAddMessageClick}>
                        Отправить
                    </button>
                </div>
            </div>
        </>
    );
}
