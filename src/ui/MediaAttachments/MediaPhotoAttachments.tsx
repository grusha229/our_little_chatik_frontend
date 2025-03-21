import React, { useCallback } from 'react'
import styles from './MediaPhotoAttachments.module.scss'
import { IMediaRefItem } from '../../models/chats'
import { openModal } from '../../store/features/modals';
import { useAppDispatch } from '../../store/store';
import { isImageFile } from './MediaAttachmentComponent/MediaAttachmentComponent.utils';
import MediaAttachmentComponent from './MediaAttachmentComponent/MediaAttachmentComponent';
export type TAttachmentsSize = 'small' | 'large' | 'xsmall'

export interface IProps {
    media: IMediaRefItem[],
    size?: TAttachmentsSize
}

export default function MediaAttachments({
    media,
} : IProps) {
    const dispatch = useAppDispatch()

    const imagesRefs = media.filter((file) => isImageFile(file.content_type || ''))
    const otherFilesRefs = media.filter((file) => !isImageFile(file.content_type || ''))

    const toggleModalVisibility = useCallback((current_media: IMediaRefItem)=> {
        dispatch(
            openModal({
                modal: "image_viewer",
                params: {
                    images: imagesRefs,
                    start_image: current_media
                }
            }))
    },[dispatch, imagesRefs])

    const handleDownloadFile = useCallback((url: string) => {
        window.open(url, "_blank");
    }, [])

    return (
        <div className={styles['block']}>
            <div className={styles['photos-grid']}>
                {
                    imagesRefs.map((media) => (
                        <MediaAttachmentComponent
                            {...media}
                            key={media.path}
                            preview_link={media.url}
                            content_type={media.content_type}
                            isFileUploaded
                            size="large"
                            file_name=''
                            onClick={() => toggleModalVisibility(media)}
                        />
                    ))
                }
            </div>
            <div className={styles['files-grid']}>
                {
                    otherFilesRefs.map((media) => (
                        <MediaAttachmentComponent
                            {...media}
                            onClick={() => handleDownloadFile(media.url)}
                            key={media.path}
                            preview_link={media.url}
                            content_type={media.content_type}
                            isFileUploaded
                            size="xsmall"
                            file_name={media?.file_name || "file"}
                        />
                    ))
                }
            </div>
        </div>
    )
}
