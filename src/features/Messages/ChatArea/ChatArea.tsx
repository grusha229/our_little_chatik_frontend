import styles from "./ChatArea.module.scss"
import { useParams } from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import { v4 as createId } from "uuid"
import Messages from "./Messages/Messages.js";
import ChatHeader from "./ChatHeader/ChatHeader.js";
// import {addMessage} from "../../store/messagesSlice.js";
import {useDispatch} from "react-redux";
import Modal from "../../components/modal/Modal.jsx";
import ChatSendForm from "./ChatSendForm/ChatSendForm.js";

const YOUR_ID = "337295eb-cbde-479c-a4ee-683019adc838";

export default function ChatArea() {

    const params = useParams();
    const chat_id = params.id || '';

    return (
        <>
            <div className={styles['block']}>
                <ChatHeader chat_id={chat_id}/>
                <Messages
                    chat_id={chat_id}
                />
                <ChatSendForm chat_id={chat_id} />
            </div>
        </>
    );
}
