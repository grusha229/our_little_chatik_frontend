import styles from './ChatMessagesList.module.scss';
import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetChatMessagesQuery } from '@app/services/chat.js';
import { useAppSelector } from '@app/store/hooks';
import { IChatsGetChatInfoResponse } from '@app/models/chats.js';
import { getSenderById } from './ChatMessagesList.utils.js';
import throttle from '@app/utils/throttle.js';
import { scrollToBottom } from '@app/utils/scrollToBottom.js';
import Loader from '@app/ui/Loader/Loader.js';
import AlertBlock from '@app/ui/AlertBlock/AlertBlock.js';
import emojiHand from '@app/img/emoji/emoji-hand.png';
import emojiMonkey from '@app/img/emoji/emoji-monkey.png';
import { IErrorResponse } from '@app/services/baseQuery.js';
import { ChatMessageItem, ChatMessageItemSkeleton } from '../ChatMessagesItem/ChatMessagesItem.js';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
    isLoading?: boolean;
}

const MESSAGES_AMOUNT = 15;

export default function ChatMessagesList({ current_chat }: IProps) {
    const [messagesCounter, setMessagesCounter] = useState<number>(0);
    const [isFirstMessagesFetching, setIsFirstMessagesFetching] = useState<boolean>(true);
    const hasMore = messagesCounter - MESSAGES_AMOUNT - 1 >= 0;

    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    const chat_id = current_chat?.chat_id || '';
    const total_messages = current_chat?.last_message?.id;
    const participants = current_chat?.participants || [];

    const { isLoading, error, isFetching } = useGetChatMessagesQuery(
        {
            id: chat_id,
            isFirstMessagesFetching: isFirstMessagesFetching,
            finish_with_id: Math.max(0, messagesCounter),
            // start_with_id: Math.max(0, messagesCounter - MESSAGES_AMOUNT + 1),
            limit: MESSAGES_AMOUNT,
        },
        {
            skip: isFirstMessagesFetching && messagesCounter === 0,
            refetchOnMountOrArgChange: true,
        },
    );

    const apiError = error as IErrorResponse;

    useEffect(() => {
        if (total_messages) {
            setMessagesCounter(total_messages);
        }

        return () => {
            setMessagesCounter(0);
        };
    }, [total_messages]);

    const chatMessages = useAppSelector(state => state.chats.messages[chat_id]);
    const YOUR_ID = useAppSelector(state => state.users.current_user?.user_id) || '0';

    const sortedMessages = useMemo(() => {
        if (!chatMessages || chatMessages?.length === 0) {
            return [];
        }
        return chatMessages?.slice().sort((a, b) => {
            return b.id - a.id;
        });
    }, [chatMessages]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current as HTMLDivElement;

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
            setMessagesCounter(prev => {
                return prev - MESSAGES_AMOUNT;
            });
        }
    }, [hasMore, inView, isFetching]);

    const throttledScrollHandler = throttle(handleScroll, 500);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            container.addEventListener('scroll', throttledScrollHandler);
        }

        return () => {
            container?.removeEventListener('scroll', throttledScrollHandler);
        };
    }, [throttledScrollHandler]);

    if (isLoading) {
        return (
            <div className={styles['messages']} ref={containerRef}>
                <ChatMessageItemSkeleton isMine />
                <ChatMessageItemSkeleton />
                <ChatMessageItemSkeleton isMine />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles['messages']} ref={containerRef}>
                <AlertBlock title="Error" description={apiError.data?.message} img_src={emojiMonkey} />
            </div>
        );
    }

    if (sortedMessages?.length === 0) {
        return (
            <div className={styles['messages']} ref={containerRef}>
                <AlertBlock title="There is nothing here yet" description="You can send a message first" img_src={emojiHand} />
            </div>
        );
    }

    return (
        <div className={styles['messages']} ref={containerRef}>
            {isFetching && (
                <div className={styles['system_message']}>
                    <Loader />
                    <div>Loading...</div>
                </div>
            )}

            {sortedMessages?.map((message, index) => (
                <ChatMessageItem
                    data={message}
                    data-index={index}
                    key={message.id}
                    isMine={message?.sender_id === YOUR_ID}
                    sender={getSenderById(message?.sender_id, participants)}
                />
            ))}
            {hasMore && (
                <div ref={ref} className={styles['system_message']}>
                    <Loader />
                    <div>Loading...</div>
                </div>
            )}
        </div>
    );
}
