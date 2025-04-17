import styles from './ChatArea.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader.js';
import { useGetChatInfoMutation } from '@app/services/chat.js';
import Loader from '@app/ui/Loader/Loader.js';
import { useAppSelector } from '@app/store/hooks.js';
import MessagesInput from './MessagesInput/MessagesInput.js';
import useDocumentTitle from '@app/utils/useDocumentTitle.js';
import ChatMessagesList from '../ChatMessages/ChatMessagesList/ChatMessagesList.js';

export default function ChatArea() {
    const params = useParams();
    const chat_id = params.id || '';
    const [getChatInfo, { isLoading }] = useGetChatInfoMutation();
    const currentChat = useAppSelector(state => state.chats.currentChat);
    useDocumentTitle(currentChat?.name ?? 'Messages');

    useEffect(() => {
        getChatInfo({ id: chat_id });
    }, [chat_id, getChatInfo]);

    if ((currentChat && isLoading) || !currentChat) {
        return (
            <>
                <div className={styles['block']}>
                    <Loader size="large" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles['block']}>
                <ChatHeader current_chat={currentChat} isLoading={isLoading} />
                <ChatMessagesList current_chat={currentChat} />
                <MessagesInput current_chat={currentChat} />
            </div>
        </>
    );
}
