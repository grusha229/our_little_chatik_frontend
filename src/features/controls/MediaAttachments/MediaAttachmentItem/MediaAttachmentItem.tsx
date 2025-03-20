import React, { useCallback } from 'react'
import { IChatsUploadFileLink } from '../../../../models/chats'
import { getAttachmentComponent } from './MediaAttachmentItem.utils'
import IconButton from '../../IconButton/IconButton'
import deleteIcon from './../../../../img/icons/icon--x-mark.svg'
import styles from './MediaAttachmentItem.module.scss'

export interface IProps extends IChatsUploadFileLink {
  onClick?: () => void;
  onDelete?: (upload_id: string) => void;
  /** Флаг что файлы загружены */
  isFileUploaded: boolean;
}

export default function MediaAttachmentItem({
    preview_link,
    upload_link,
    upload_id,
    upload_file_name,
    content_type,
    onDelete,
    isFileUploaded
}: IProps) {
  const AttachmentComponent = getAttachmentComponent({content_type, preview_link, upload_id, upload_file_name, upload_link, isFileUploaded})

  const handleDeleteFile = useCallback(() => {
    onDelete && onDelete(upload_id)
  }, [onDelete, upload_id])

  return (
    <div className={styles['block']} >
      <IconButton
        className={styles['button-delete']}
        size="xsmall"
        icon={deleteIcon}
        onClick={handleDeleteFile}
      />
      {AttachmentComponent}
      <div className={styles['file-name']}>
        {upload_file_name}
      </div>
    </div>
  )
}
