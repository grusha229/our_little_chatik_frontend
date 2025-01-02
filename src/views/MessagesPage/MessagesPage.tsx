import React from 'react'
import Layout from '../../features/Layout/Layout'
import styles from './MessagesPage.module.scss'
import MessagesSideBar from '../../features/Messages/MessagesSideBar/MessagesSideBar'
import { useParams } from 'react-router-dom';

export default function MessagesPage() {
  const params = useParams();

  return (
      <div className={styles['page']}>
        <div className={styles['page--sidebar']}>
          <MessagesSideBar />
        </div>
        <div className={styles['page--content']}>
          <div>{params.id}</div>
        </div>
      </div>
  )
}
