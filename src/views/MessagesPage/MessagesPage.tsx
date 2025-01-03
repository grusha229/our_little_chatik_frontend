import React from 'react'
import styles from './MessagesPage.module.scss'
import MessagesSideBar from '../../features/Messages/MessagesSideBar/MessagesSideBar'
import { useParams } from 'react-router-dom';
import CreateChatModal from '../../features/Messages/CreateChatModal/CreateChatModal';

export default function MessagesPage() {
  const params = useParams();

  return (
      <>
        <div className={styles['page']}>
          <div className={styles['page--sidebar']}>
            <MessagesSideBar />
          </div>
          <div className={styles['page--content']}>
            <div>{params.id}</div>
          </div>
        </div>
        <CreateChatModal />
      </>
  )
}
