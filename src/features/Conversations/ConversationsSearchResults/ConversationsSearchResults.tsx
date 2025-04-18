import { useAppSelector } from '@app/store/hooks';
import styles from './ConversationsSearchResults.module.scss';
import { useSearchMutation } from '@app/services/search';
import AlertBlock from '@app/ui/AlertBlock/AlertBlock';
import ConversationsItem from '../ConversationsItem/ConversationsItem';

export default function ConversationsSearchResults() {
    const searchResults = useAppSelector(state => state.search.search_results);
    const [_, { isLoading: isSearchLoading }] = useSearchMutation();

    const chatsResults = searchResults.chats;
    const messagesResults = searchResults.messages;
    const usersResults = searchResults.users;

    const chatsResultsExists = chatsResults && chatsResults.length > 0;
    const usersResultsExists = usersResults && usersResults.length > 0;
    const messagesResultsExists = messagesResults && messagesResults.length > 0;

    if (isSearchLoading) {
        return (
            <div className={styles['search-empty']}>
                <AlertBlock title="No results" />
            </div>
        );
    }

    if (!chatsResultsExists && !usersResultsExists && !messagesResultsExists) {
        return (
            <div className={styles['search-empty']}>
                <AlertBlock title="No results" />
            </div>
        );
    }

    return (
        <div className={styles['search-results']}>
            {chatsResultsExists && (
                <div className={styles['search-results--block']}>
                    <div className={styles['search-results--header']}>Found chats:</div>
                    {chatsResults.map(chat => (
                        <ConversationsItem key={chat.chat_id} heading={chat.name} img_src={chat.photo?.path} link={`/messages/${chat.chat_id}`} />
                    ))}
                </div>
            )}

            {messagesResultsExists && (
                <div className={styles['search-results--block']}>
                    <div className={styles['search-results--header']}>Found messages:</div>
                    {messagesResults.map(message => (
                        <ConversationsItem
                            key={message.id}
                            heading={message.payload}
                            last_message={message}
                            img_src={message.sender_id}
                            link={`/messages/${message.chat_id}?message_id=${message.id}`}
                        />
                    ))}
                </div>
            )}

            {usersResultsExists && (
                <div className={styles['search-results--block']}>
                    <div className={styles['search-results--header']}>Found users:</div>
                    {usersResults.map(user => (
                        <ConversationsItem
                            key={user.participant_id}
                            heading={`${user.name} ${user.surname}`}
                            img_src={user.participant_avatar}
                            link={`#user_id=${user.participant_id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
