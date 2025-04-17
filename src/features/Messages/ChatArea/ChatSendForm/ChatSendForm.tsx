import { useCallback, useEffect, useState } from 'react';
import styles from './ChatSendForm.module.scss';
import Button from '@app/ui/Button/Button';
import Input from '@app/ui/Input/Input';
import { useForm } from 'react-hook-form';
import { IChatsFilesLink, IChatsGetChatInfoResponse, IChatsSendMessagePayload, IMediaRefItem } from '@app/models/chats';
import { useGetAttachmentsUploadUrlsMutation, useSendChatMessageMutation } from '@app/services/chat';
import { generateNewMessage } from './ChatSendForm.utils';
import { useAppSelector } from '@app/store/hooks';
import { addMessage, addUploadFiles, editUploadFilesStatus, resetUploadFiles } from '@app/store/features/chats';
import { useDispatch } from 'react-redux';
import { useUploadAttachmentMutation } from '@app/services/files';
import UploadFileButton from '@app/ui/UploadFileButton/UploadFileButton';

export interface IProps {
    current_chat: IChatsGetChatInfoResponse;
}

export default function ChatSendForm({ current_chat }: IProps) {
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    const chat_id = current_chat?.chat_id;
    const [lastMessageId, setLastMessageId] = useState(current_chat.last_message?.id ? current_chat.last_message?.id + 1 : 1);

    const dispatch = useDispatch();
    const [sendMessage] = useSendChatMessageMutation();
    const [getAttachmentsUploadLinks, { isSuccess: isLinksSuccessfullyGet, data: fetchedLinksToUpload, isUninitialized }] =
        useGetAttachmentsUploadUrlsMutation();
    const [uploadAttachment] = useUploadAttachmentMutation();

    const { list: attachments, status: attachmentsStatus } = useAppSelector(state => state.chats.uploads[current_chat.chat_id]);

    const isAttachmentsReady = attachmentsStatus === 'done';
    const upload_ids = attachments?.map(file => file.upload_id);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        reset,
        watch,
    } = useForm<IChatsSendMessagePayload>({
        defaultValues: {
            payload: '',
            chat_id,
            id: lastMessageId,
            upload_ids: upload_ids, // Добавляем файлы в `defaultValues`
        },
    });

    const current_user = useAppSelector(state => state.users.current_user);
    const current_id = current_user?.user_id || '';
    const watchPayload = watch('payload');
    const isMessageValid = watchPayload.trim().length > 0 || attachments?.length > 0;

    const isSendButtonDisabled = !isMessageValid || isSubmitting;

    useEffect(() => {
        reset({
            payload: '',
            chat_id,
            id: lastMessageId,
            upload_ids,
        });
    }, [lastMessageId, chat_id, reset]);

    useEffect(() => {
        setValue('upload_ids', upload_ids);
    }, [upload_ids, setValue]);

    useEffect(() => {
        if (fetchedLinksToUpload && !isUninitialized && isLinksSuccessfullyGet) {
            dispatch(addUploadFiles({ chat_id, files: fetchedLinksToUpload, status: 'pending' }));
        }
    }, [chat_id, dispatch, fetchedLinksToUpload, isLinksSuccessfullyGet, isUninitialized, reset]);

    useEffect(() => {
        if (isLinksSuccessfullyGet && !isUninitialized && filesToUpload?.length > 0) {
            const uploadPromises = attachments?.map((link, index) => {
                const current_file = filesToUpload[index];
                return new Promise((resolve, reject) => {
                    uploadAttachment({
                        url: link?.upload_link,
                        file: current_file,
                        content_type: link?.content_type,
                    })
                        .then(() => resolve('completed')) // Если загрузка успешна
                        .catch(error => reject(error)); // Если ошибка загрузки
                });
            });

            // Ожидаем выполнения всех загрузок
            Promise.all(uploadPromises)
                .then(() => {
                    dispatch(editUploadFilesStatus({ chat_id, status: 'done' }));
                })
                .catch(() => {
                    dispatch(editUploadFilesStatus({ chat_id, status: 'rejected' }));
                });
        }
    }, [filesToUpload, isUninitialized, isLinksSuccessfullyGet, uploadAttachment, attachments, chat_id, dispatch]);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;

            if (files && files?.length > 0) {
                setFilesToUpload(Array.from(files));

                const filesArray: IChatsFilesLink[] = Array.from(files).map(file => {
                    return {
                        content_type: file.type,
                        name: file.name,
                    };
                });

                getAttachmentsUploadLinks({
                    id: chat_id,
                    links: filesArray,
                }).then(res => {
                    dispatch(addUploadFiles({ chat_id, files: res.data || [], status: 'pending' }));
                });
            }
        },
        [chat_id, dispatch, getAttachmentsUploadLinks],
    );

    const onSubmit = async (formData: IChatsSendMessagePayload) => {
        const mediaRefs: IMediaRefItem[] =
            attachments?.map(link => ({
                url: link.preview_link,
                path: link.preview_link,
                file_name: link.upload_file_name,
                content_type: link.content_type,
            })) || [];

        const newMessage = generateNewMessage(lastMessageId, formData.payload, current_id, mediaRefs);

        setLastMessageId(prev => prev + 1);
        dispatch(addMessage({ chat_id, message: newMessage }));
        await sendMessage(formData);
        isAttachmentsReady && dispatch(resetUploadFiles({ chat_id }));
        reset(); // Очистка формы
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
            <Input name="payload" register={register} className={styles['input']} placeholder="Enter a message..." />
            <UploadFileButton name="upload_ids" handleChange={handleFileChange} register={register}>
                File
            </UploadFileButton>

            <Button type="submit" disabled={isSendButtonDisabled}>
                Send
            </Button>
        </form>
    );
}
