import styles from "./Messages.module.scss"
import {Message, MessageSkeleton} from "./Message";
import {useEffect, useRef} from "react";
import {scrollToBottom} from "../../../../utils/scrollToBottom";
import { useGetChatMessagesQuery } from "../../../../services/chat.js";
import { useAppSelector } from "../../../../store/store.js";
import { IChatsUser } from "../../../../models/chats.js";
import { getSenderById } from "./Messages.utils.js";

export interface IProps {
    chat_id: string,
    participants: IChatsUser[],
}

export default function Messages ({ chat_id, participants }: IProps) {
    const { isLoading, error }  = useGetChatMessagesQuery({ id: chat_id });

    const chatMessages = useAppSelector((state) => state.chats.messages[chat_id]);
    const YOUR_ID = useAppSelector((state) => state.users.current_user?.user_id) || '0';

    const containerRef = useRef(null);

    useEffect(() => {
        scrollToBottom(containerRef)
    }, [containerRef, chatMessages?.length]);

    if (isLoading) {
        return (
            <div className={styles['messages']} ref={containerRef}>
                <MessageSkeleton isMine /> 
                <MessageSkeleton />
                <MessageSkeleton isMine />
            </div>
        )
    }

    if (error) {
        <div className={styles['messages']} ref={containerRef}>
            <div className='error'>Error</div>
        </div>
    }

    return (
        <div className={styles['messages']} ref={containerRef}>
            {chatMessages?.map((message) => {
                return (
                    <Message
                        key={message.id}
                        text={message.payload}
                        isMine={(message.sender_id === YOUR_ID)}
                        date={message.created_at}
                        sender={getSenderById(message.sender_id, participants)}
                    />
                )
            })}
        </div>
    )
}
