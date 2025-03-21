import React from 'react'
import styles from './Header.module.scss'
import CurrentUserBadge from './CurrentUserBadge/CurrentUserBadge';

export default function Header() {
    // const isOnline = useAppSelector((state) => state.websocket.connected);

    return (
      <div className={styles['header']}>
        <div className={styles['header--container']}>
            <CurrentUserBadge />
        </div>
      </div>
  )
}
