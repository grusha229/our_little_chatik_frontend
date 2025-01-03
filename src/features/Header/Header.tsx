import React, { useCallback, useEffect } from 'react'
import styles from './Header.module.scss'
import { useGetUserInfoQuery } from '../../services/users';
import Button from '../controls/Button/Button';
import { useLogoutUserMutation } from '../../services/auth';
import { useAppDispatch } from '../../store/store';
import { openModal } from '../../store/features/modals';

export default function Header() {
    const { data, isLoading, refetch } = useGetUserInfoQuery();

    const [ logoutUser ] = useLogoutUserMutation();

    const dispatch = useAppDispatch();

    const toggleModalVisibility = useCallback(()=> {
            dispatch(openModal('create_chat'))
        },[dispatch])

    useEffect(() => {
      refetch();
    }, [])

    const handleOpenModalClicked = useCallback(() => {
      toggleModalVisibility()
    }, []);

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
                onClick={handleOpenModalClicked}
              >
                open modal
              </Button>
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
