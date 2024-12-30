import React from 'react'
import Layout from '../../features/Layout/Layout'
import styles from './MessagesPage.module.scss'
import MessagesSideBar from '../../features/Messages/MessagesSideBar/MessagesSideBar'

export default function MessagesPage() {
  return (
      <div className={styles['page']}>
        <div className={styles['page--sidebar']}>
          <MessagesSideBar />
        </div>
        <div className={styles['page--content']}>
          <div>content</div>
        </div>
      </div>
  )
}
