import React from 'react'
import { useChatsListQuery } from '../../../services/chat';
import styles from './MessagesChatList.module.scss'

export function MessagesChatList() {
     const { data } = useChatsListQuery();

    if (data?.length === 0 ) {
        return (
            <div className={styles['list-empty']}>
                no chats for now :(
            </div>
        )
    }

    return (
        <div className={styles['list-results']}>
            {data?.map((element) => (
                <div key={element.chat_id}>
                    {element.name}
                </div>
            ))}
        </div>
    )
}

export default React.memo(MessagesChatList)
