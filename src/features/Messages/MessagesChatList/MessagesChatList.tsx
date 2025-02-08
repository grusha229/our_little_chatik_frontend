import React, { useEffect } from 'react'
import { useChatsListQuery } from '../../../services/chat';
import styles from './MessagesChatList.module.scss'
import MessagesChatItem from '../MessagesChatItem/MessagesChatItem';
import { useAppSelector } from '../../../store/store';

export function MessagesChatList() {
    const { _, refetch } = useChatsListQuery();
    const chats = useAppSelector((state) => state.chats.chats)

    useEffect(() => {
        refetch();
    }, [])

    if (chats?.length === 0 ) {
        return (
            <div className={styles['list-empty']}>
                no chats for now :(
            </div>
        )
    }

    return (
        <div className={styles['list-results']}>
            {chats?.map((chat) => (
                 <MessagesChatItem 
                    key={chat.chat_id}
                    heading={chat.name}
                    img_src={chat.photo?.path}
                    link={`/messages/${chat.chat_id}`}
                />
            ))}
        </div>
    )
}

export default React.memo(MessagesChatList)
