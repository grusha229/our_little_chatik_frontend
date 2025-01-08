import styles from "./Messages.module.scss"
import {Message, MessageSkeleton} from "./Message";
import {useEffect, useRef} from "react";
import {scrollToBottom} from "../../../../utils/scrollToBottom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages} from "../../../store/messagesSlice.js";
import { useGetChatMessagesQuery } from "../../../../services/chat.js";
import { Skeleton } from "@mui/material";
import { useAppSelector } from "../../../../store/store.js";
import { addMessage } from "../../../../store/features/chats.js";

export interface IProps {
    chat_id: string
}

export default function Messages ({ chat_id }: IProps) {
    const dispatch = useDispatch();
    const { data: messages, isLoading, error } = useGetChatMessagesQuery({ id: chat_id });

    const chatMessages = useAppSelector((state) => state.chats.messages[chat_id]);
    const YOUR_ID = useAppSelector((state) => state.users.current_user?.user_id) || '0';

    console.log()

    const containerRef = useRef(null);

    // useEffect(() => {
    //     if (currentMessages) {
    //         currentMessages.forEach((message) => dispatch(addMessage({
    //             chat_id,
    //             message
    //         })));
    //     }
    //   }, [currentMessages, dispatch]);

    useEffect(() => {
        scrollToBottom(containerRef)
    }, [containerRef]);

    if (isLoading) {
        return (
            <div className={styles['messages']} ref={containerRef}>
                <MessageSkeleton isMine />
                <MessageSkeleton />
                <MessageSkeleton isMine />
            </div>
        )
    }

    return (
        <div className={styles['messages']} ref={containerRef}>
            {chatMessages?.map((message, index) => {
                return <Message key={index} text={message.payload} isMine={(message.sender_id === YOUR_ID)} date={message.created_at}/>
            })}
        </div>
    )
}
