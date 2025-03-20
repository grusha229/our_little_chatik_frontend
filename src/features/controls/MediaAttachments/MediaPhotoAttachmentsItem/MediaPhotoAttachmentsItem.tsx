import React from 'react'
import styles from './MediaPhotoAttachmentsItem.module.scss'
export type TAttachmentsSize = 'small' | 'large';

export interface IProps {
    src: string;
    size?: TAttachmentsSize;
    onClick?: () => void;
    onDelete?: () => void;
}

export default function MediaPhotoAttachmentsItem({
  src,
  size = "large",
}: IProps) {

  const wrapperClassName = [
    styles['image-wrapper'],
    styles[`image-wrapper--${size}`]
  ].join(' ');

  return (
    <div className={wrapperClassName}>
        <img
          className={styles['image']}
          src={src}
          alt=""
      />
    </div>
  )
}