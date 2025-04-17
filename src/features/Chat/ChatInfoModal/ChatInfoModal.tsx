import UserBadge from '@app/features/Users/UserBadge/UserBadge';
import { useAppSelector } from '@app/store/hooks';
import Modal from '@app/ui/Modal/Modal';
import styles from './ChatInfoModal.module.scss';
import Avatar from '@app/ui/Avatar/Avatar';

export default function ChatInfoModal() {
    const current_chat = useAppSelector(state => state.chats.currentChat);
    const isParticipantsExists = current_chat?.participants && current_chat?.participants.length > 0;
    const creationTime = new Date(current_chat?.created_at ?? '').toLocaleDateString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <Modal name="conversation_info">
            <div className={styles['block']}>
                <Avatar src={current_chat?.photo.url ?? ''} size="xlarge" title={current_chat?.name ?? ''} />
                <h2>{current_chat?.name}</h2>
                {isParticipantsExists && (
                    <div>
                        <div className={styles['block__title']}>Participants:</div>
                        <div className={styles['block__content']}>
                            {current_chat.participants?.map(user => (
                                <UserBadge
                                    avatar={user?.participant_avatar}
                                    name={user?.participant_name}
                                    surname={user?.participant_surname}
                                    nickname={user?.participant_nickname}
                                    id={user?.participant_id}
                                    key={user?.participant_id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles['block__title']}>Created at: {creationTime}</div>
            </div>
            <div className={styles['block__id']}>{current_chat?.chat_id}</div>
        </Modal>
    );
}
