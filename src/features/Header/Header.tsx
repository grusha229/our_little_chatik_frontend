import React from 'react'
import styles from './Header.module.scss'
import { useAppSelector } from '../../store/store';
import LogoutButton from './LogoutButton/LogoutButton';
import CurrentUserBadge from './CurrentUserBadge/CurrentUserBadge';

export default function Header() {
    const isOnline = useAppSelector((state) => state.websocket.connected);

    return (
      <div className={styles['header']}>
        <div className={styles['header--container']}>
            <CurrentUserBadge />
            <LogoutButton />
        </div>
      </div>
  )
}
