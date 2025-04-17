import { useCallback, useEffect } from 'react';
import styles from './CurrentUserBadge.module.scss';
import { useGetCurrentUserInfoQuery } from '@app/services/users';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';
import Avatar from '@app/ui/Avatar/Avatar';

export default function CurrentUserBadge() {
    const dispatch = useAppDispatch();

    const { refetch } = useGetCurrentUserInfoQuery();
    const currentUser = useAppSelector(state => state.users.current_user);
    const avatarSrc = undefined;

    const isOnline = useAppSelector(state => state.websocket.connected);

    const toggleModalVisibility = useCallback(() => {
        dispatch(
            openModal({
                modal: 'user_info',
                params: {
                    current_id: currentUser?.user_id,
                },
            }),
        );
    }, [currentUser?.user_id, dispatch]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className={styles['block']} onClick={toggleModalVisibility}>
            <Avatar src={avatarSrc} title={`${currentUser?.name} ${currentUser?.surname}`} />
            <div className={styles['personal-info']}>
                <div className={styles['personal-info--name']}>
                    {currentUser?.name} {currentUser?.surname}
                </div>
                <div className={styles['personal-info--status']}>{isOnline ? 'Online' : 'Offline'}</div>
            </div>
        </div>
    );
}
