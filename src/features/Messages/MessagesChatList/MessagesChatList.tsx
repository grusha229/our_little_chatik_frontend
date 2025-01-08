import React, { useEffect } from 'react'
import { useChatsListQuery } from '../../../services/chat';
import styles from './MessagesChatList.module.scss'
import MessagesChatItem from '../MessagesChatItem/MessagesChatItem';

export function MessagesChatList() {
    const { data, refetch } = useChatsListQuery();

    useEffect(() => {
        refetch();
    }, [])

    if (data?.length === 0 ) {
        return (
            <div className={styles['list-empty']}>
                no chats for now :(
            </div>
        )
    }

    return (
        <div className={styles['list-results']}>
            {data?.map((chat) => (
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
