import { useCallback } from 'react';
import MediaAttachmentComponent from '@app/ui/MediaAttachments/MediaAttachmentComponent/MediaAttachmentComponent';
import { IChatsGetChatInfoResponse, IChatsUploadFileLink } from '@app//models/chats';
import styles from './MessageFormAttachments.module.scss';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { openModal } from '@app/store/features/modals';
import { isImageFile } from '@app/ui/MediaAttachments/MediaAttachmentComponent/MediaAttachmentComponent.utils';
import { deleteUploadFiles } from '@app/store/features/chats';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
}

export default function MessageFormAttachments({ current_chat }: IProps) {
    const attachments = useAppSelector(state => state.chats.uploads[current_chat?.chat_id]?.list);
    const attachmentsStatus = useAppSelector(state => state.chats.uploads[current_chat?.chat_id]?.status);
    const isAttachmentsReady = attachmentsStatus === 'done';
    const dispatch = useAppDispatch();

    const handleDeleteFile = useCallback(
        (target_id: string) => {
            dispatch(
                deleteUploadFiles({
                    chat_id: current_chat.chat_id,
                    target_id,
                }),
            );
        },
        [current_chat?.chat_id, dispatch],
    );

    const toggleModalVisibility = useCallback(
        (current_media: IChatsUploadFileLink) => {
            if (isImageFile(current_media.content_type)) {
                dispatch(
                    openModal({
                        modal: 'image_viewer',
                        params: {
                            images: [
                                {
                                    url: current_media.preview_link,
                                    path: current_media.upload_file_name,
                                    content_type: current_media.content_type,
                                    file_name: current_media?.upload_file_name,
                                },
                            ],
                            start_image: {
                                url: current_media.preview_link,
                                path: current_media.upload_file_name,
                                content_type: current_media.content_type,
                                file_name: current_media?.upload_file_name,
                            },
                        },
                    }),
                );
            } else {
                window.open(current_media.preview_link, '_blank');
            }
        },
        [dispatch],
    );

    if (!attachments || attachments?.length === 0) {
        return null;
    }

    return (
        <div className={styles['block']}>
            <div>
                <div className={styles['slider']}>
                    {attachments.map(file => (
                        <MediaAttachmentComponent
                            {...file}
                            key={file.upload_id}
                            preview_link={file?.preview_link}
                            onClick={() => toggleModalVisibility(file)}
                            onDelete={() => handleDeleteFile(file.upload_id)}
                            isFileUploaded={isAttachmentsReady}
                            file_name={file?.upload_file_name}
                            size="small"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
