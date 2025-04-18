import styles from './ChatHeader.module.scss';
import Avatar from '@app/ui/Avatar/Avatar';
import { Skeleton } from '@mui/material';
import { IChatsGetChatInfoResponse } from '@app/models/chats';
import { isDesktop, useWindowSize } from '@app/utils/responsives';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAppDispatch } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
    isLoading?: boolean;
}

export default function ChatHeader({ current_chat, isLoading }: IProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { width: windowWidth } = useWindowSize();
    const isDesktopView = isDesktop(windowWidth);
    const avatarSrc = current_chat?.photo?.path;

    const toggleModalVisibility = useCallback(() => {
        dispatch(
            openModal({
                modal: 'conversation_info',
                params: {
                    chat_id: current_chat.chat_id,
                },
            }),
        );
    }, [dispatch, current_chat.chat_id]);

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
                        <div className={styles['badge']} onClick={toggleModalVisibility}>
                            <Avatar src={avatarSrc} title={current_chat?.name} />
                            <>{current_chat?.name}</>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
