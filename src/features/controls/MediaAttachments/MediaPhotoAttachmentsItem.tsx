import React from 'react'
import styles from './MediaPhotoAttachmentsItem.module.scss'
export type TAttachmentsSize = 'small' | 'large';

export interface IProps {
    src: string;
    size: TAttachmentsSize;
    onClick?: () => void;
    onDelete?: () => void;
}

export default function MediaPhotoAttachmentsItem({ src }: IProps) {
  return (
    <div className={styles['image-wrapper']}>
      <img
        className={styles['image']}
        src={src}
        alt=""
    />
    </div>
  )
}