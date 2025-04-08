import React, { useCallback } from 'react'
import styles from './MediaFileAttachmentsItem.module.scss'
import { TAttachmentsSize } from '@app/ui/MediaAttachments/MediaPhotoAttachments';
import { buildClassName } from '@app/utils/styles';

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

  const wrapperClassName = buildClassName(
    styles['image-wrapper'],
    styles[`image-wrapper--${size}`]
  );

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