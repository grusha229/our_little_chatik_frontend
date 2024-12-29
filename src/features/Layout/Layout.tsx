import React from 'react'
import styles from './Layout.module.scss';

export interface IProps {
    children: React.ReactNode
}

export default function Layout({children}: IProps) {
  const layoutClassName = [styles['page-container'], 'container'].join(' ');
  return (
    <div className={layoutClassName}>
        {children}
    </div>
  )
}
