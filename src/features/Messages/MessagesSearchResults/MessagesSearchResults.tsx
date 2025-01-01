import React from 'react'
import { useAppSelector } from '../../../store/store';
import styles from './MessagesSearchResults.module.scss';

export default function MessagesSearchResults() {
    const searchResults = useAppSelector((state) => state.chats.search_results);

    const chatsResults = searchResults.chats;
    const messagesResults = searchResults.messages;
    const usersResults = searchResults.users;

    if (!chatsResults && !messagesResults && !usersResults) {
      return (
        <div className={styles['search-empty']}>
          <div>No results</div>
        </div>
      )
    }

    return (
      <div className={styles['search-results']}>
        {(chatsResults && chatsResults.length > 0) && (
          <div>
            <div>Chats:</div>
            {chatsResults.map((chat) => (
              <div key={chat.chat_id}>{chat.name}</div>
            ))}
          </div>
        )}

        {(messagesResults && messagesResults.length > 0) && (
          <div>
            <div>Messages:</div>
            {messagesResults.map((message) => (
              <div key={message.created_at}>{message.created_at}</div>
            ))}
          </div>
        )}

        {(usersResults && usersResults.length > 0) && (
          <div>
            <div>Users:</div>
            {usersResults.map((user) => (
              <div key={user.created_at}>{user.created_at}</div>
            ))}
          </div>
        )}
      </div>
    )
}
