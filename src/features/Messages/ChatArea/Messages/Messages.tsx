import styles from "./Messages.module.scss";
import { Message, MessageSkeleton } from "./Message";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useGetChatMessagesQuery } from "../../../../services/chat.js";
import { useAppSelector } from "../../../../store/hooks";
import { IChatsGetChatInfoResponse } from "../../../../models/chats.js";
import { getSenderById } from "./Messages.utils.js";
import throttle from "../../../../utils/throttle.js";
import { scrollToBottom } from "../../../../utils/scrollToBottom.js";
import Loader from "../../../../ui/Loader/Loader.js";

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
    isLoading?: boolean;
}

const MESSAGES_AMOUNT = 15;

export default function Messages({ 
    current_chat,
}: IProps) {
    const [messagesCounter, setMessagesCounter] = useState<number>(0);
    const [isFirstMessagesFetching, setIsFirstMessagesFetching] = useState<boolean>(true);
    const hasMore = messagesCounter - MESSAGES_AMOUNT - 1 >= 0;

    const { ref, inView } = useInView({
        threshold: .5,
    });

    const chat_id = current_chat?.chat_id || '';
    const total_messages = current_chat?.last_message?.id;
    const participants = current_chat?.participants || [];

    const { isLoading, error, isFetching } = useGetChatMessagesQuery({ 
        id: chat_id,
        isFirstMessagesFetching: isFirstMessagesFetching,
        finish_with_id: Math.max(0, messagesCounter),
        // start_with_id: Math.max(0, messagesCounter - MESSAGES_AMOUNT + 1),
        limit: MESSAGES_AMOUNT,
    }, {
        skip: (isFirstMessagesFetching && messagesCounter === 0),
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (total_messages) {
            setMessagesCounter(total_messages);
        }

        return () => {
            setMessagesCounter(0);
        }
    }, [total_messages])

    const chatMessages = useAppSelector((state) => state.chats.messages[chat_id]);
    const YOUR_ID = useAppSelector((state) => state.users.current_user?.user_id) || "0";

    const sortedMessages = useMemo(() => {
        return chatMessages?.slice().sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })
    }, [chatMessages])

    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceFromBottom < 100) {
            scrollToBottom(containerRef);
        }
    }, [chatMessages?.length]);

    // Функция для подгрузки сообщений при скролле вверх
    const handleScroll = useCallback(() => {
        if (!inView || isFetching) return;

        setIsFirstMessagesFetching(false);

        if (inView && hasMore) {
            setMessagesCounter((prev) => {
                return prev - MESSAGES_AMOUNT
            });
        }
    }, [hasMore, inView, isFetching]);

    const throttledScrollHandler = throttle(handleScroll, 500);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener("scroll", throttledScrollHandler);
        }

        return () => {
            containerRef.current?.removeEventListener("scroll", throttledScrollHandler);
        };
    }, [throttledScrollHandler]);

    if (isLoading) {
        return (
            <div className={styles["messages"]} ref={containerRef}>
                <MessageSkeleton isMine />
                <MessageSkeleton />
                <MessageSkeleton isMine />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["messages"]} ref={containerRef}>
                <div className={styles["system_message"]}>Error</div>
            </div>
        );
    }

    if (sortedMessages?.length === 0) {
        return (
            <div className={styles["messages"]} ref={containerRef}>
                <div className={styles["system_message"]}>No messages</div>
            </div>
        );
    }

    return (
        <div className={styles["messages"]} ref={containerRef}>
            {isFetching && (
                <div className={styles["loading"]}>
                    <Loader/>
                    Loading...
                </div>
            )}

            {sortedMessages?.map((message, index) => (
                <Message
                    data={message}
                    data-index={index}
                    key={message.id}
                    isMine={message.sender_id === YOUR_ID}
                    sender={getSenderById(message.sender_id, participants)}
                />
            ))}
            {hasMore && (
                <div ref={ref} className={styles["system_message"]}>
                    <Loader />
                </div>
            )}
        </div>
    );
}
