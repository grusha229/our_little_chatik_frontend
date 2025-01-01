import React, { useCallback } from 'react'
import styles from './Header.module.scss'
import { useGetUserInfoQuery } from '../../services/users';
import Button from '../controls/Button/Button';
import { useLogoutUserMutation } from '../../services/auth';

export default function Header() {
    const { data, isLoading } = useGetUserInfoQuery();

    const [ logoutUser ] = useLogoutUserMutation();


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
