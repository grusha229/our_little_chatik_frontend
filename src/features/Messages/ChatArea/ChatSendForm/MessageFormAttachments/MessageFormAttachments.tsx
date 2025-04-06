import React, { useCallback } from 'react'
import MediaAttachmentComponent from '../../../../../ui/MediaAttachments/MediaAttachmentComponent/MediaAttachmentComponent'
import { IChatsUploadFileLink, IChatsUploadFileLinkResponse } from '../../../../../models/chats';
import styles from './MessageFormAttachments.module.scss'
import { useAppDispatch } from '../../../../../store/hooks';
import { openModal } from '../../../../../store/features/modals';
import { isImageFile } from '../../../../../ui/MediaAttachments/MediaAttachmentComponent/MediaAttachmentComponent.utils';

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
    const dispatch = useAppDispatch()

    const toggleModalVisibility = useCallback((current_media: IChatsUploadFileLink)=> {
        if (isImageFile(current_media.content_type)) {
            dispatch(
                openModal({
                    modal: "image_viewer",
                    params: {
                        images: [
                            {
                                url: current_media.preview_link,
                                path: current_media.upload_file_name,
                                content_type: current_media.content_type,
                                file_name: current_media?.upload_file_name,
                            }
                        ],
                        start_image: {
                            url: current_media.preview_link,
                            path: current_media.upload_file_name,
                            content_type: current_media.content_type,
                            file_name: current_media?.upload_file_name
                        }
                    }
                }))
        } else {
            window.open(current_media.preview_link, "_blank");
        }
    },[dispatch])

    if (!linksToUpload || linksToUpload?.length === 0) {
        return null
    }

    return (
        <div className={styles['block']}>
            <div>
                <div className={styles['slider']}>
                    {linksToUpload.map((file) => (
                        <MediaAttachmentComponent
                            {...file}
                            key={file.upload_id}
                            preview_link={file?.preview_link}
                            onClick={() => toggleModalVisibility(file)}
                            onDelete={() => onDelete(file?.upload_id)}
                            isFileUploaded={isFileUploaded}
                            file_name={file?.upload_file_name}
                            size="small"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
