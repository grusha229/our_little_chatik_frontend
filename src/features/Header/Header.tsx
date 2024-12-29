import React, { useCallback } from 'react'
import styles from './Header.module.scss'
import { useGetUserInfoQuery } from '../../services/users';
import Button from '../controls/button/Button';
import { useLogoutUserMutation } from '../../services/auth';

export default function Header() {
    const { data, isLoading, isError, error } = useGetUserInfoQuery();

    const [ logoutUser, { isLoading: isLogoutLoading, isError: isLogoutError, error: logoutError } ] = useLogoutUserMutation();


    const handleLogoutClicked = useCallback(() => {
      logoutUser({});
    }, []);

    console.log(data)

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles['header']}>
        <div className={styles['header--container']}>
          {(isLoading) && (
            <div>Loading...</div>
          )}

          {(!isLoading) && (
            <>
              <div>{data?.name} {data?.surname} – {data?.nickname}</div>
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
