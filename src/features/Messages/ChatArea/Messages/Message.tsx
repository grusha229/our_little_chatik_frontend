import { Skeleton } from '@mui/material';
import styles from './Message.module.scss';
import { IChatsMessage, IChatsUser } from '@app/models/chats';
import Avatar from '@app/features/Users/Avatar/Avatar';
import MediaPhotoAttachments from '@app/ui/MediaAttachments/MediaPhotoAttachments';
import Loader from '@app/ui/Loader/Loader';

export interface IProps {
    data: IChatsMessage;
    isMine?: boolean;
    sender: IChatsUser | null;
}

export const MessageSkeleton = ({ isMine }: { isMine?: boolean }) => {
    return (
        <>
            <div className={`${styles['messageLine']} ${isMine ? styles['mine'] : styles['notMine']}`}>
                <div>
                    <p className={styles['messageText']}>
                        <Skeleton variant="text" animation="pulse" width={220} />
                    </p>
                </div>
                <div className={styles['messageDate']}>
                    <p className={styles['messageDate_time']}>
                        <Skeleton variant="text" animation="pulse" width={30} />
                    </p>
                </div>
            </div>
        </>
    );
};

export const Message = ({ data, sender, isMine, ...props }: IProps) => {
    const messageTime = new Date(data?.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const avatarSrc = sender?.participant_avatar;
    const isMediaExists = data.media?.refs && data.media?.refs?.length > 0;

    const isMessagePending = data?.status === 'pending';

    return (
        <div className={`${styles['message']} ${isMine ? styles['mine'] : styles['notMine']}`} {...props}>
            <Avatar size="small" src={avatarSrc} />
            <div className={styles['message-content']}>
                {isMediaExists && <MediaPhotoAttachments media={data.media?.refs || []} />}
                <div className={styles['message--text']}>{data.payload}</div>
            </div>
            {isMessagePending ? <Loader size="xsmall" /> : <p className={styles['message--time']}>{messageTime}</p>}
        </div>
    );
};
