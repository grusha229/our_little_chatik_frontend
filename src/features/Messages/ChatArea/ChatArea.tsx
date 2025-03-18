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

    useEffect(() => {
        getChatInfo({ id: chat_id})
        // getInfo({ id: chat_id, links: [{
        //     content_type: 'photo',
        //     name: 'image.png'
        // }] })
    }, [chat_id, getChatInfo])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles['block']}>
                <ChatHeader
                    current_chat={currentChat}
                    isLoading={isLoading}
                />
                <Messages current_chat={currentChat} />
                <ChatSendForm chat_id={chat_id} />
            </div>
        </>
    );
}
