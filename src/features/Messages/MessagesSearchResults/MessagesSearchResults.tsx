import React from 'react'
import { useAppSelector } from '../../../store/store';
import styles from './MessagesSearchResults.module.scss';
import MessagesChatItem from '../MessagesChatItem/MessagesChatItem';
import { IChatsMessage } from '../../../models/chats';
import { useSearchMutation } from '../../../services/search';


const MOCK_MESSAGE: IChatsMessage = {
    created_at: 'Message 1',
    id: 124,
    chat: {
        id: '124124',
        name: 'Suii chat',
        type: 'private',
        photo: {
            path: 'https://ss.sport-express.ru/userfiles/materials/207/2075330/volga.jpg',
            url: 'https://ss.sport-express.ru/userfiles/materials/207/2075330/volga.jpg'
        }
    },
    is_edited: false,
    is_read: false,
    media: null,
    payload: 'SUUUIIII 1f sd fsf sdf sdf sffsdfdsfdsfdf sdfsdfdsfdsfsd',
    reactions: null,
    sender_id: '124124',
    updated_at: 'fasfas'
}

const MOCK_PHOTO = {
  path: 'https://ss.sport-express.ru/userfiles/materials/207/2075330/volga.jpg',
  url: 'https://ss.sport-express.ru/userfiles/materials/207/2075330/volga.jpg'
}

const MOCK_USER = {
  user_id: '124124',
  surname: 'Suii',
  name: 'Suii',
  nickname: 'Suii007',
  email: 'Suii@su.i',
  avatar: '',
}

const MOCK_CHAT = {
  chat_id: '124124',
  chat_type: 'private',
  created_at: 'Chat 1',
  last_read_msg_id: 124,
  name: 'Suii chat',
  participants: [],
  updated_at: 'Chat 1',
  last_message: MOCK_MESSAGE,
  photo: MOCK_PHOTO,
};

export default function MessagesSearchResults() {
    const searchResults = useAppSelector((state) => state.search.search_results);
    const [ _, { isLoading: isSearchLoading } ] = useSearchMutation();

    const chatsResults = searchResults.chats;
    const messagesResults = searchResults.messages;
    const usersResults = searchResults.users;

    const chatsResultsExists = (chatsResults && chatsResults.length > 0)
    const usersResultsExists = (usersResults && usersResults.length > 0)
    const messagesResultsExists = (messagesResults && messagesResults.length > 0)

    if (isSearchLoading) {
         return (
        <div className={styles['search-empty']}>
          <div>No results</div>
        </div>
      )
    }

    if (!chatsResultsExists && !usersResultsExists && !messagesResultsExists) {
      return (
        <div className={styles['search-empty']}>
          <div>No results</div>
        </div>
      )
    }

    return (
      <div className={styles['search-results']}>
        {chatsResultsExists && (
          <div className={styles['search-results--block']}>
            <div className={styles['search-results--header']}>
              Founded chats:
            </div>
            {chatsResults.map((chat) => (
              <MessagesChatItem 
                key={chat.chat_id}
                heading={chat.name}
                img_src={chat.photo?.path}
                link={`/messages/${chat.chat_id}`} 
              />
            ))}
          </div>
        )}

        {messagesResultsExists && (
          <div className={styles['search-results--block']}>
            <div className={styles['search-results--header']}>
              Founded messages:
            </div>
            {messagesResults.map((message) => (
              <MessagesChatItem
                key={message.id}
                heading={message.chat.name}
                last_message={message.payload}
                img_src={message.chat.photo.url}
                link={`/messages/${message.chat.id}?message_id=${message.id}`} 
              />
            ))}
          </div>
        )}

        {usersResultsExists && (
          <div className={styles['search-results--block']}>
            <div className={styles['search-results--header']}>
              Founded users:
            </div>
            {usersResults.map((user) => (
              <MessagesChatItem
                key={user.user_id}
                heading={`${user.name} ${user.surname}`}
                img_src={user.avatar}
                link={`#user_id=${user.user_id}`} 
              />
            ))}
          </div>
        )}
      </div>
    )
}
