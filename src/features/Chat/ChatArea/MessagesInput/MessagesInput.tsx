import styles from './MessagesInput.module.scss';
import { IChatsGetChatInfoResponse } from '@app/models/chats';
import MessageFormAttachments from '@app/features/Chat/ChatAttachments/ChatAttachments';
import ChatSendForm from '@app/features/Chat/ChatSendForm/ChatSendForm';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
}

export default function MessagesInput({ current_chat }: IProps) {
    return (
        <div className={styles['form--container']}>
            <MessageFormAttachments current_chat={current_chat} />
            <ChatSendForm current_chat={current_chat} />
        </div>
    );
}
