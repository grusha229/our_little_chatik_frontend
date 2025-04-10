import { useCallback, useEffect, useState } from "react";
import styles from "./ChatSendForm.module.scss";
import Button from "@app/ui/Button/Button";
import Input from "@app/ui/Input/Input";
import { useForm } from "react-hook-form";
import { IChatsFilesLink, IChatsGetChatInfoResponse, IChatsSendMessagePayload, IMediaRefItem } from "@app/models/chats";
import { useGetAttachmentsUploadUrlsMutation, useSendChatMessageMutation } from "@app/services/chat";
import { generateNewMessage } from "./ChatSendForm.utils";
import { useAppSelector } from "@app/store/hooks";
import { addMessage, addUploadFiles, resetUploadFiles, updateMessageStatus } from "@app/store/features/chats";
import { useDispatch } from "react-redux";
import { useUploadAttachmentMutation } from "@app/services/files";
import UploadFileButton from "@app/ui/UploadFileButton/UploadFileButton";

export interface IProps {
  current_chat: IChatsGetChatInfoResponse;
}

export default function ChatSendForm({ current_chat }: IProps) {
  const [ filesToUpload, setFilesToUpload ] = useState<File[]>([])
  const chat_id = current_chat?.chat_id;
  const [lastMessageId, setLastMessageId] = useState(current_chat.last_message?.id + 1);

  const dispatch = useDispatch();
  const [ sendMessage ] = useSendChatMessageMutation();
  const [ getAttachmentsUploadLinks, { isSuccess: isLinksSuccessfullyGet, data: fetchedLinksToUpload, isUninitialized }] = useGetAttachmentsUploadUrlsMutation();
  const [ uploadAttachment ] = useUploadAttachmentMutation();
  const attachments = useAppSelector((state) => state.chats.uploads[current_chat?.chat_id])

  const upload_ids = attachments?.map((file) => file.upload_id)

  const { register, handleSubmit, formState: { isSubmitting }, reset, watch } = useForm<IChatsSendMessagePayload>({
    defaultValues: {
      payload: "",
      id: chat_id,
      upload_ids: upload_ids, // Добавляем файлы в `defaultValues`
    },
  });

  const current_user = useAppSelector((state) => state.users.current_user);
  const current_id = current_user?.user_id || "";
  const watchPayload = watch("payload");
  const isMessageValid = watchPayload.trim().length > 0 || (attachments?.length > 0);

  const isSendButtonDisabled = !isMessageValid || isSubmitting;

  useEffect(() => {
    reset({ payload: "", id: chat_id, upload_ids: [] });
  }, [chat_id, reset]);

  useEffect(() => {
    if (fetchedLinksToUpload && !isUninitialized && isLinksSuccessfullyGet) {
      dispatch(addUploadFiles({ chat_id, files: fetchedLinksToUpload }))
    }
  }, [chat_id, dispatch, fetchedLinksToUpload, isLinksSuccessfullyGet, isUninitialized, reset]);

  useEffect(() => {
    if (isLinksSuccessfullyGet && !isUninitialized && filesToUpload?.length > 0) {
      attachments?.forEach((link, index) => {
        const current_file = filesToUpload[index];
        uploadAttachment({
          url: link?.upload_link,
          file: current_file,
          content_type: link?.content_type,
        });
      });
    }
  }, [filesToUpload, isUninitialized, isLinksSuccessfullyGet, uploadAttachment, attachments]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files?.length > 0) {
      setFilesToUpload(Array.from(files));

      const filesArray: IChatsFilesLink[] = Array.from(files).map((file) => {
        return {
          content_type: file.type,
          name: file.name,
        }
      });

      getAttachmentsUploadLinks({
        id: chat_id,
        links: filesArray,
      }).then((res) => {
        dispatch(addUploadFiles({ chat_id, files: res.data || []  }))
      })
    }
  }, [chat_id, dispatch, getAttachmentsUploadLinks]);

  const onSubmit = useCallback(async (formData: IChatsSendMessagePayload) => {
      const mediaRefs: IMediaRefItem[] = attachments?.map((link) => (
        {
          url: link.preview_link,
          path: link.upload_file_name,
          file_name: link.upload_file_name,
          content_type: link.content_type
        }
      )) || [];

      const newMessage = generateNewMessage(
        lastMessageId,
        formData.payload,
        current_id,
        mediaRefs
      );

      setLastMessageId((prev) => prev + 1)
      dispatch(addMessage({ chat_id, message: newMessage }));

      try {
        await sendMessage(formData).unwrap()
          .then((response) => {
              console.log('Пришёл ответ', response)
              // Обновляем статус на "sent" и ID на настоящий
              dispatch(
                  updateMessageStatus({
                      id: response.id,
                      status: 'sent',
                      chat_id: response.chat_id,
                  })
              );
          });
      } catch (error) {
        // В случае ошибки обновляем статус на "failed"
        dispatch(
          updateMessageStatus({
              id: newMessage.id,
              status: 'failed',
              chat_id
          })
        );
        console.error('Ошибка отправки сообщения:', error);
      }
      dispatch(resetUploadFiles({ chat_id }));
      reset(); // Очистка формы
  }, [attachments, chat_id, current_id, dispatch, lastMessageId, reset, sendMessage]);

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form"]}
      >
        <Input
          name="payload"
          register={register}
          className={styles["input"]}
          placeholder="Enter a message..."
        />
        <UploadFileButton
          name="upload_ids"
          handleChange={handleFileChange}
          register={register}
        >File</UploadFileButton>

        <Button type="submit" disabled={isSendButtonDisabled}>
          Send
        </Button>
      </form>
  );
}
