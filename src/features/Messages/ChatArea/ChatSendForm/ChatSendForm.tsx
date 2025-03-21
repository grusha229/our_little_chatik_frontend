import React, { useCallback, useEffect, useState } from "react";
import styles from "./ChatSendForm.module.scss";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import { useForm } from "react-hook-form";
import { IChatsFilesLink, IChatsSendMessagePayload, IChatsUploadFileLinkResponse, IMediaRefItem } from "../../../../models/chats";
import { useGetAttachmentsUploadUrlsMutation, useSendChatMessageMutation } from "../../../../services/chat";
import { generateNewMessage } from "./ChatSendForm.utils";
import { useAppSelector } from "../../../../store/store";
import { addMessage, updateMessageStatus } from "../../../../store/features/chats";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useUploadAttachmentMutation } from "../../../../services/files";
import UploadFileButton from "../../../../ui/UploadFileButton/UploadFileButton";
import MessageFormAttachments from "./MessageFormAttachments/MessageFormAttachments";

export interface IProps {
  chat_id: string;
}

export default function ChatSendForm({ chat_id }: IProps) {
  const [ filesToUpload, setFilesToUpload ] = useState<File[]>([])
  const [ linksToUpload, setLinksToUpload ] = useState<IChatsUploadFileLinkResponse>([])

  const { register, handleSubmit, formState: { isSubmitting }, reset, setValue, watch } = useForm<IChatsSendMessagePayload>({
    defaultValues: {
      payload: "",
      id: chat_id,
      upload_ids: [], // Добавляем файлы в `defaultValues`
    },
  });
  const dispatch = useDispatch();
  const [ sendMessage ] = useSendChatMessageMutation();
  const [ getAttachmentsUploadLinks, { isSuccess: isLinksSuccessfullyGet, data: fetchedLinksToUpload, reset: resetUploadLinks, isUninitialized }] = useGetAttachmentsUploadUrlsMutation();
  const [ uploadAttachment, { isLoading: isFilesUploading, isUninitialized: isFilesUploadingUninitialized } ] = useUploadAttachmentMutation();
  const isFileUploaded = !isFilesUploadingUninitialized && !isFilesUploading

  const current_user = useAppSelector((state) => state.users.current_user);
  const current_id = current_user?.user_id || "";

  const watchPayload = watch("payload");
  const watchUploadIds = watch("upload_ids");
  const isMessageValid = watchPayload.trim().length > 0 || (watchUploadIds && watchUploadIds.length > 0);


  const isSendButtonDisabled = !isMessageValid || isSubmitting;

  useEffect(() => {
    reset({ payload: "", id: chat_id, upload_ids: [] });
  }, [chat_id, reset]);

  useEffect(() => {
    if (fetchedLinksToUpload && !isUninitialized && isLinksSuccessfullyGet) {
      setLinksToUpload(fetchedLinksToUpload)
    }
  }, [chat_id, fetchedLinksToUpload, isLinksSuccessfullyGet, isUninitialized, reset]);

  useEffect(() => {
    if (isLinksSuccessfullyGet && !isUninitialized && filesToUpload?.length > 0) {
      linksToUpload?.forEach((link, index) => {
        const current_file = filesToUpload[index];
  
        uploadAttachment({
          url: link?.upload_link,
          file: current_file,
          content_type: current_file?.type,
        });
      });
    }
  }, [filesToUpload, isUninitialized, isLinksSuccessfullyGet, linksToUpload, uploadAttachment]);


  // Обработчик загрузки файлов
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
        setValue('upload_ids', res?.data?.map((file) => file.upload_id || ''));
      })
    }
  }, [chat_id, getAttachmentsUploadLinks, setValue]);

  const handleDeleteFile = useCallback((upload_id: string) => {

    const filetedLinksToUpload = linksToUpload?.filter((value) => value.upload_id !== upload_id)
    const filteredUploadIds = filetedLinksToUpload.map((value) => value.upload_id);

    setValue('upload_ids', filteredUploadIds);
    setLinksToUpload(filetedLinksToUpload)
  }, [linksToUpload, setValue])

    const onSubmit = async (formData: IChatsSendMessagePayload) => {
      const mediaRefs: IMediaRefItem[] = linksToUpload?.map((link) => (
        {
          url: link.preview_link,
          path: link.upload_file_name,
        }
      )) || [];

      const tempId = nanoid();
      const newMessage = generateNewMessage(
        tempId,
        formData.payload,
        current_id,
        mediaRefs
      );

      dispatch(addMessage({ chat_id, message: newMessage }));
      console.log('добавляем сообщение в стор', chat_id,  newMessage)

      try {
        await sendMessage(formData).unwrap()
          .then((response) => {
              console.log('Пришёл ответ', response)
              // Обновляем статус на "sent" и ID на настоящий
              dispatch(
                  updateMessageStatus({
                      tempId,
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
              tempId,
              id: newMessage.id,
              status: 'failed',
              chat_id
          })
        );
        console.error('Ошибка отправки сообщения:', error);
      }
      resetUploadLinks();
      setLinksToUpload([]);
      reset(); // Очистка формы
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form--container"]}
    >
      <MessageFormAttachments
        linksToUpload={linksToUpload}
        onDelete={handleDeleteFile}
        isFileUploaded={isFileUploaded}
      />
      <div className={styles["form"]}>
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
      </div>
    </form>
  );
}
