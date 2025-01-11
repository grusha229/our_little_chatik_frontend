import styles from "./ChatArea.module.scss"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Messages from "./Messages/Messages.js";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import ChatSendForm from "./ChatSendForm/ChatSendForm.js";
import { useGetChatInfoMutation } from "../../../services/chat.js";

export default function ChatArea() {

    const params = useParams();
    const chat_id = params.id || '';
    const [ getChatInfo, { isLoading, data: currentChat } ] = useGetChatInfoMutation();

    const chatParticipants = currentChat?.participants || [];

    useEffect(() => {
        getChatInfo({ id: chat_id})
    }, [ chat_id, getChatInfo ])

    return (
        <>
            <div className={styles['block']}>
                <ChatHeader
                    current_chat={currentChat}
                    isLoading={isLoading}
                />
                <Messages
                    chat_id={chat_id}
                    participants={chatParticipants}
                />
                <ChatSendForm chat_id={chat_id} />
            </div>
        </>
    );
}
