import { Skeleton } from "@mui/material";
import styles from "./Message.module.scss"
import { IChatsUser } from "../../../../models/chats";
import Avatar from "../../../Users/Avatar/Avatar";

export interface IProps {
    text: string;
    date: string;
    isMine?: boolean;
    sender: IChatsUser | null;
};

export const MessageSkeleton = ( { isMine } : { isMine?: boolean} ) => {
    return (
        <>
import styles from "./Message.module.scss"
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

export const Message = ({ date, isMine, text, sender }: IProps) => {
    console.log(sender)

    const messageTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const avatarSrc = sender?.avatar ? sender.avatar : `https://ui-avatars.com/api/?name=${sender?.participant_nickname}`;

    return (
        <>
            <div className={`${styles['messageLine']} ${ isMine ? styles['mine'] : styles['notMine']}`}>
                <Avatar size="small" src={avatarSrc} />
                <p className={styles['messageText']}>{text}</p>
                <p className={styles['messageTime']} >{messageTime}</p>
            </div>
        </>
    )
};
