import React, { useCallback } from 'react'
import styles from './MediaFileAttachmentsItem.module.scss'
export type TAttachmentsSize = 'small' | 'large';

export interface IProps {
    src: string;
    size?: TAttachmentsSize;
    onClick?: () => void;
    onDelete?: () => void;
}

export default function MediaFileAttachmentsItem({
  src,
  size = "large",
  onClick
}: IProps) {

  const wrapperClassName = [
    styles['image-wrapper'],
    styles[`image-wrapper--${size}`]
  ].join(' ');

  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <div className={wrapperClassName} onClick={handleClick}>
        <img
          className={styles['image']}
          src={src}
          alt=""
      />
    </div>
  )
}