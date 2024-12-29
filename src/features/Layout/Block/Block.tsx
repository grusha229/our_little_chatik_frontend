import React from 'react'
import styles from './Block.module.scss';

export interface IProps {
    children: React.ReactNode,
    className?: string,
    width?: string | number
}

export default function Block({ children, className, width}: IProps) {
  const containerClassName = [styles['block'], className].join(' ');
  const containerStyle = { maxWidth: width };

  return (
    <div 
      className={containerClassName}
      style={containerStyle}
    >
      {children}
    </div>
  )
}
