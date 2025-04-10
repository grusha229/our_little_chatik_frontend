import styles from './ChatHeader.module.scss';
import Avatar from '@app/features/Users/Avatar/Avatar';
import { Skeleton } from '@mui/material';
import { IChatsGetChatInfoResponse } from '@app/models/chats';
import { isDesktop, useWindowSize } from '@app/utils/responsives';
import { useNavigate } from 'react-router-dom';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
    isLoading?: boolean;
}

export default function ChatHeader({ current_chat, isLoading }: IProps) {
    const navigate = useNavigate();

    const { width: windowWidth } = useWindowSize();
    const isDesktopView = isDesktop(windowWidth);
    const avatarSrc = current_chat?.photo?.path;

    return (
        <div className={styles['header']}>
            <div className={styles['content']}>
                {!isDesktopView && (
                    <div onClick={() => navigate(-1)} className={styles['back']}>
                        Back
                    </div>
                )}
                <div className={styles['info']}>
                    {isLoading ? (
                        <>
                            <Skeleton variant="circular" animation="pulse" width={40} height={40} />
                            <Skeleton variant="text" animation="pulse" width={120} />
                        </>
                    ) : (
                        <>
                            <Avatar src={avatarSrc} />
                            <>{current_chat?.name}</>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
