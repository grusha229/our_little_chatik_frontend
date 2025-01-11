import styles from "./ChatHeader.module.scss"
import Avatar from "../../../Users/Avatar/Avatar";
import { Skeleton } from "@mui/material";
import { IChatsGetChatInfoResponse } from "../../../../models/chats";

export interface IProps {
    current_chat: IChatsGetChatInfoResponse | undefined,
    isLoading?: boolean
}

export default function ChatHeader ({current_chat, isLoading }: IProps) {

    const avatarSrc = current_chat?.photo?.path || `https://ui-avatars.com/api/?name=${current_chat?.name}`;

    return (
        <div className={styles['header']}>
            <div className={styles['content']}>
                {isLoading ?
                    <Skeleton variant="circular" animation="pulse" width={40} height={40} />
                    : <Avatar src={avatarSrc} />
                }
                <div className={styles['info']}>
                    {isLoading ?
                        <Skeleton variant="text" animation="pulse" width={120} />
                        : <>{current_chat?.name}</>
                    }
                </div>
            </div>
        </div>
    )
}
