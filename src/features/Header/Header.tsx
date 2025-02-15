import React, { useCallback, useEffect } from 'react'
import styles from './Header.module.scss'
import { useGetUserInfoQuery } from '../../services/users';
import Button from '../controls/Button/Button';
import { useLogoutUserMutation } from '../../services/auth';
import { useAppSelector } from '../../store/store';

export default function Header() {
    const { data, isLoading, refetch } = useGetUserInfoQuery();
    const isOnline = useAppSelector((state) => state.websocket.connected);

    const [ logoutUser ] = useLogoutUserMutation();

    useEffect(() => {
      refetch();
    }, [])

    const handleLogoutClicked = useCallback(() => {
      logoutUser({});
    }, []);

    return (
      <div className={styles['header']}>
        <div className={styles['header--container']}>
          {(isLoading) && (
            <div>Loading...</div>
          )}

          {(!isLoading) && (
            <>
              <div>
                <div>{data?.name} {data?.surname} – @{data?.nickname}</div>
                <div>{data?.email}</div>
                <div>{isOnline ? 'Online' : 'Offline'}</div>
              </div>
              <Button
                onClick={handleLogoutClicked}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
  )
}
