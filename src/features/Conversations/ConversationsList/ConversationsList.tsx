import React, { useEffect, useMemo } from 'react';
import { useChatsListQuery } from '@app/services/chat';
import styles from './ConversationsList.module.scss';
import { useAppSelector } from '@app/store/hooks';
import ConversationsItem from '../ConversationsItem/ConversationsItem';
import { getSenderById } from '@app/features/Chat/ChatMessages/ChatMessagesList/ChatMessagesList.utils';

export function ConversationsList() {
    const { refetch } = useChatsListQuery();
    const chats = useAppSelector(state => state.chats.chats);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const sortedChats = useMemo(() => {
        return chats?.slice().sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    }, [chats]);

    if (chats?.length === 0) {
        return <div className={styles['list-empty']}>no chats for now :(</div>;
    }

    return (
        <div className={styles['list-results']}>
            {sortedChats?.map(chat => (
                <ConversationsItem
                    key={chat.chat_id}
                    last_message={chat.last_message}
                    heading={chat.name}
                    img_src={chat.photo?.path}
                    link={`/messages/${chat.chat_id}`}
                    last_sender={getSenderById(chat.last_message?.sender_id, chat.participants)}
                />
            ))}
        </div>
    );
}

export default React.memo(ConversationsList);
