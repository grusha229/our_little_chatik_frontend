import React from 'react'
import { useChatsListQuery } from '../../../services/chat';

export function MessagesChatList() {
     const { data } = useChatsListQuery();

    if (data?.length === 0 ) {
        return (
            <div>no chats for now :(</div>
        )
    }

    return (
        <div>
            {data?.map((element) => (
                <div key={element.chat_id}>
                    {element.name}
                </div>
            ))}
        </div>
    )
}

export default React.memo(MessagesChatList)
