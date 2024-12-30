import React from 'react'
import Layout from '../../features/Layout/Layout'
import styles from './MessagesPage.module.scss'

export default function MessagesPage() {
  return (
      <div className={styles['page']}>
        <div className={styles['page--sidebar']}>
          <div>chat list</div>
        </div>
        <div className={styles['page--content']}>
          <div>content</div>
        </div>
      </div>
  )
}
