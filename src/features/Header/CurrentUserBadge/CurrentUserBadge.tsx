import React, { useCallback, useEffect } from 'react'
import styles from './CurrentUserBadge.module.scss'
import { useGetCurrentUserInfoQuery } from '@app/services/users';
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';

export default function CurrentUserBadge() {
    const dispatch = useAppDispatch();
    
    const { refetch } = useGetCurrentUserInfoQuery();
    const currentUser = useAppSelector((state) => state.users.current_user)
    const avatarSrc = currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}+${currentUser?.surname}`;

    const isOnline = useAppSelector((state) => state.websocket.connected);

    const toggleModalVisibility = useCallback(()=> {
        dispatch(
            openModal({
                modal: "user_info",
                params: {
                    current_id: currentUser?.user_id
                }
            }))
        },[currentUser?.user_id, dispatch])

    useEffect(() => {
        refetch();
    }, [])

    return (
        <div className={styles['block']} onClick={toggleModalVisibility}>
            <Avatar src={avatarSrc} />
            <div className={styles['personal-info']}>
                <div className={styles['personal-info--name']}>
                    {currentUser?.name} {currentUser?.surname}
                </div>
                <div className={styles['personal-info--status']}>
                    {isOnline ? 'Online' : 'Offline'}
                </div>
            </div>
        </div>
    )
}
