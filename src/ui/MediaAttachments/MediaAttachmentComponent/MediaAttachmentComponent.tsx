import React, { useCallback } from 'react'
import { getAttachmentComponent } from './MediaAttachmentComponent.utils'
import IconButton from '../../IconButton/IconButton'
import deleteIcon from './../../../img/icons/icon--x-mark.svg'
import styles from './MediaAttachmentComponent.module.scss'

export type TAttachmentsSize = 'large' | 'small';

export interface IProps {
  size?: TAttachmentsSize;
  onClick?: () => void;
  onDelete?: () => void;
  /** Флаг что файлы загружены */
  isFileUploaded: boolean;
  preview_link: string;
  file_name: string;
  content_type: string;
}

export default function MediaAttachmentComponent({
    preview_link,
    file_name,
    content_type,
    onDelete,
    onClick,
    isFileUploaded,
    size='large',
}: IProps) {
  const handleAttachmentClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  const AttachmentComponent = getAttachmentComponent({content_type, preview_link, isFileUploaded, size, onClick: handleAttachmentClick})

  const handleDeleteFile = useCallback(() => {
    onDelete && onDelete()
  }, [onDelete]);

  const blockClassName = [
    styles['block'],
    styles[`block--${size}`]
  ].join(' ');

  return (
    <div className={blockClassName} >
      {onDelete && (
        <IconButton
          className={styles['button-delete']}
          size="xsmall"
          icon={deleteIcon}
          onClick={handleDeleteFile}
        />
      )}
      {AttachmentComponent}
      {(size !== "large") && (
          <div className={styles['file-name']}>
              {file_name}
          </div>
      )}
    </div>
  )
}
