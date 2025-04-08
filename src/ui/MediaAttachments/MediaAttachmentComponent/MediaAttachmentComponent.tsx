import React, { SyntheticEvent, useCallback } from 'react'
import { getAttachmentComponent, getFileType } from './MediaAttachmentComponent.utils'
import IconButton from '@app/ui/IconButton/IconButton'
import deleteIcon from '@app/img/icons/icon--x-mark.svg'
import styles from './MediaAttachmentComponent.module.scss'
import { TAttachmentsSize } from '@app/ui/MediaAttachments/MediaPhotoAttachments';
import { buildClassName } from '@app/utils/styles'

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

  const AttachmentComponent = getAttachmentComponent({content_type, preview_link, isFileUploaded, size})

  const handleDeleteFile = useCallback((event: SyntheticEvent) => {
    event.stopPropagation()
    onDelete && onDelete()
  }, [onDelete]);

  const blockClassName = buildClassName(
    styles['block'],
    styles[`block--${size}`]
  )

  const fileNameClassName = buildClassName(
    styles['file'],
    styles[`file--${size}`]
  );

  return (
    <div
      className={blockClassName}
      onClick={handleAttachmentClick}
    >
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
          <div className={fileNameClassName}>
              <div
                className={styles['file-name']}
              >
                {file_name}
              </div>
              <div
                className={styles['file-type']}
              >
                {getFileType(content_type)}
              </div>
          </div>
      )}
    </div>
  )
}
