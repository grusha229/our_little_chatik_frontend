import styles from "./ChatArea.module.scss"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Messages from "./Messages/Messages.js";
import ChatHeader from "./ChatHeader/ChatHeader.js";
import ChatSendForm from "./ChatSendForm/ChatSendForm.js";
import { useGetChatInfoMutation } from "../../../services/chat.js";
import Loader from "../../../ui/Loader/Loader.js";
import { useAppSelector } from "../../../store/hooks.js";

export default function ChatArea() {

    const params = useParams();
    const chat_id = params.id || '';
    const [ getChatInfo, { isLoading } ] = useGetChatInfoMutation();
    const currentChat = useAppSelector((state) => state.chats.currentChat)
    console.warn(currentChat?.last_message.id)

    useEffect(() => {
        getChatInfo({ id: chat_id})
    }, [chat_id, getChatInfo])

    if (isLoading || !currentChat) {
        return (
            <>
                <div className={styles['block']}>
                    <Loader size="large" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles['block']}>
                <ChatHeader
                    current_chat={currentChat}
                    isLoading={isLoading}
                />
                <Messages current_chat={currentChat} />
                <ChatSendForm current_chat={currentChat} />
            </div>
        </>
    );
}
