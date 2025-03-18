import { Skeleton } from "@mui/material";
import styles from "./Message.module.scss"
import { IChatsMessage, IChatsUser } from "../../../../models/chats";
import Avatar from "../../../Users/Avatar/Avatar";
import MediaPhotoAttachments from "../../../controls/MediaAttachments/MediaPhotoAttachments";

export interface IProps {
    data: IChatsMessage;
    isMine?: boolean;
    sender: IChatsUser | null;
};

export const MessageSkeleton = ( { isMine } : { isMine?: boolean} ) => {
    return (
        <>
            <div className={`${styles['messageLine']} ${ isMine ? styles['mine'] : styles['notMine']}`}>
                <div>
                    <p className={styles['messageText']}>
                        <Skeleton variant="text" animation="pulse" width={220}/>
                    </p>
                </div>
                <div className={styles['messageDate']} >
                    <p className={styles['messageDate_time']} >
                        <Skeleton variant="text" animation="pulse" width={30}/>
                    </p>
                </div>
            </div>
        </>
    )
}

export const Message = ({
    data,
    sender,
    isMine,
    ...props
}: IProps) => {

    const messageTime = new Date(data?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const avatarSrc = sender?.avatar ? sender.avatar : `https://ui-avatars.com/api/?name=${sender?.participant_nickname}`;
    const isMediaExists = data.media?.refs && data.media?.refs?.length > 0

    return (
        <div
            className={`${styles['messageLine']} ${ isMine ? styles['mine'] : styles['notMine']}`}
            {...props}
        >
            <Avatar size="small" src={avatarSrc} />
            <div className={styles['messageText']}>
                {isMediaExists && (
                    <MediaPhotoAttachments media={data.media?.refs || []}/>
                )}
                <div>{data.payload}</div>
            </div>
            <p className={styles['messageTime']} >{messageTime}</p>
        </div>
    )
};
