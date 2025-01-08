import styles from "./ChatHeader.module.scss"
import {useSelector} from "react-redux";
import {useEffect} from "react";
import { useGetChatInfoMutation } from "../../../../services/chat";
import Avatar from "../../../Users/Avatar/Avatar";
import { Skeleton } from "@mui/material";

export interface IProps {
    chat_id: string
}

export default function ChatHeader ({ chat_id, ...props }: IProps) {

    const [ getChatInfo, { isLoading, data: currentChat } ] = useGetChatInfoMutation();

    useEffect(() => {
        getChatInfo({ id: chat_id})
    }, [chat_id])

    const avatarSrc = currentChat?.photo?.path || `https://ui-avatars.com/api/?name=${currentChat?.name}`;

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
                        : <>{currentChat?.name}</>
                    }
                </div>
            </div>
        </div>
    )
}
