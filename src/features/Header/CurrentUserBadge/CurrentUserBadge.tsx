import React, { useCallback, useEffect } from 'react'
import styles from './CurrentUserBadge.module.scss'
import { useGetCurrentUserInfoQuery } from '../../../services/users';
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { openModal } from '../../../store/features/modals';

export default function CurrentUserBadge() {
    const dispatch = useAppDispatch();
    
    const { data, refetch } = useGetCurrentUserInfoQuery();
    const avatarSrc = data?.avatar || `https://ui-avatars.com/api/?name=${data?.name}+${data?.surname}`;

    // const isOnline = useAppSelector((state) => state.websocket.connected);

    const toggleModalVisibility = useCallback(()=> {
        dispatch(
            openModal({
                modal: "user_info",
                params: {
                    current_id: data?.user_id
                }
            }))
        },[data?.user_id, dispatch])

    useEffect(() => {
        refetch();
    }, [])

    return (
        <div className={styles['block']} onClick={toggleModalVisibility}>
            <Avatar src={avatarSrc} />
            <div>{data?.name} {data?.surname} – @{data?.nickname}</div>
            <div>{true ? 'Online' : 'Offline'}</div>
        </div>
    )
}
