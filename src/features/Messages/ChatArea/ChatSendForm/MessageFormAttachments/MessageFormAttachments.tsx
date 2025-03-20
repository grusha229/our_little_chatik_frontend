import React from 'react'
import MediaAttachmentItem from '../../../../controls/MediaAttachments/MediaAttachmentItem/MediaAttachmentItem'
import { IChatsUploadFileLinkResponse } from '../../../../../models/chats';
import styles from './MessageFormAttachments.module.scss'

export interface IProps {
    /** Список файлов */
    linksToUpload: IChatsUploadFileLinkResponse;
    /** Флаг что файлы загружены */
    isFileUploaded: boolean;
    /** Удаление вложения */
    onDelete: (upload_id: string) => void;
}

export default function MessageFormAttachments({
    linksToUpload,
    isFileUploaded,
    onDelete,
}: IProps) {
    if (!linksToUpload || linksToUpload?.length === 0) {
        return null
    }

    return (
        <div className={styles['block']}>
            <div>
                <div className={styles['slider']}>
                    {linksToUpload.map((file) => (
                        <MediaAttachmentItem
                            {...file}
                            key={file.upload_id}
                            preview_link={file.preview_link}
                            onDelete={onDelete}
                            isFileUploaded={isFileUploaded}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
