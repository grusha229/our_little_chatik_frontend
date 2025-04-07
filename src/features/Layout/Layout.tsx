import React from 'react'
import styles from './Layout.module.scss';
import { buildClassName } from '../../utils/styles';

export interface IProps {
    children: React.ReactNode
}

export default function Layout({children}: IProps) {

  const layoutClassName = buildClassName(
    styles['page-container'],
    'container'
  );

  return (
    <div className={layoutClassName}>
        {children}
    </div>
  )
}
