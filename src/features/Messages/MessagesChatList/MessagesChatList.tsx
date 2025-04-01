import React, { useEffect, useMemo } from 'react'
import { useChatsListQuery } from '../../../services/chat';
import styles from './MessagesChatList.module.scss'
import MessagesChatItem from '../MessagesChatItem/MessagesChatItem';
import { useAppSelector } from '../../../store/store';

export function MessagesChatList() {
    const { refetch } = useChatsListQuery();
    const chats = useAppSelector((state) => state.chats.chats)

    useEffect(() => {
        refetch();
    }, [])

    const sortedChats = useMemo(() => {
        return chats?.slice().sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
    }, [chats])

    if (chats?.length === 0 ) {
        return (
            <div className={styles['list-empty']}>
                no chats for now :(
            </div>
        )
    }


    return (
        <div className={styles['list-results']}>
            {sortedChats?.map((chat) => (
                 <MessagesChatItem 
                    key={chat.chat_id}
                    last_message={chat.last_message?.payload}
                    heading={chat.name}
                    img_src={chat.photo?.path}
                    link={`/messages/${chat.chat_id}`}
                />
            ))}
        </div>
    )
}

export default React.memo(MessagesChatList)
