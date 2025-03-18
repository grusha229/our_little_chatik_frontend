import React, { useEffect, useState } from "react";
import styles from "./ChatSendForm.module.scss";
import Button from "../../../controls/Button/Button";
import Input from "../../../controls/Input/Input";
import { useForm } from "react-hook-form";
import { IChatsFilesLink, IChatsSendMessagePayload } from "../../../../models/chats";
import { useGetAttachmentsUploadUrlsMutation, useSendChatMessageMutation } from "../../../../services/chat";
import { generateNewMessage } from "./ChatSendForm.utils";
import { useAppSelector } from "../../../../store/store";
import { addMessage, updateMessageStatus } from "../../../../store/features/chats";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useUploadAttachmentMutation } from "../../../../services/files";
import UploadFileButton from "../../../controls/UploadFileButton/UploadFileButton";

export interface IProps {
  chat_id: string;
}

export default function ChatSendForm({ chat_id }: IProps) {
  const [ filesToUpload, setFilesToUpload ] = useState<FileList>()
  const [ fileNames, setFileNames] = useState<IChatsFilesLink[]>([]);

  const { register, handleSubmit, formState: { isSubmitting }, reset, setValue, watch } = useForm<IChatsSendMessagePayload>({
    defaultValues: {
      payload: "",
      id: chat_id,
      upload_ids: [], // Добавляем файлы в `defaultValues`
    },
  });
  const dispatch = useDispatch();
  const [ sendMessage ] = useSendChatMessageMutation();
  const [ getAttachmentsUploadLinks, { isSuccess: isLinksSuccessfullyGet, data: linksToUpload, reset: resetUploadLinks }] = useGetAttachmentsUploadUrlsMutation();
  const [ uploadAttachment ] = useUploadAttachmentMutation();

  const current_user = useAppSelector((state) => state.users.current_user);
  const current_id = current_user?.user_id || "";

  const watchPayload = watch("payload");
  const watchUploadIds = watch("upload_ids");
  const isMessageValid = watchPayload.trim().length > 0 || (watchUploadIds && watchUploadIds.length > 0);


  const isSendButtonDisabled = !isMessageValid || isSubmitting;

  useEffect(() => {
    reset({ payload: "", id: chat_id, upload_ids: [] });
  }, [chat_id, reset]);

  // Обработчик загрузки файлов
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files?.length > 0) {
      setFilesToUpload(files)
      const filesArray: IChatsFilesLink[] = Array.from(files).map((file) => {

        return {
          content_type: file.type,
          name: file.name,
        }
      });
      setFileNames(filesArray)

      getAttachmentsUploadLinks({
        id: chat_id,
        links: filesArray,
      }).then((res) => {
        console.log('ссылки на загрузку', res.data)
        setValue('upload_ids', res?.data?.map((file) => file.upload_id || ''));
      })
    }
  };

  useEffect(() => {
    linksToUpload?.forEach((link, index) => {
      const formData = new FormData();
      formData.append('file', filesToUpload?.[index] as Blob);

      uploadAttachment({
        url: link.upload_link,
        file: formData
      })
    })
  }, [isLinksSuccessfullyGet])


    const onSubmit = async (formData: IChatsSendMessagePayload) => {
      console.log(formData)
      const tempId = nanoid();
      const newMessage = generateNewMessage(tempId, formData.payload, current_id );

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
                      chat_id: response.chat_id
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
      reset(); // Очистка формы
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form--container"]}
    >
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
    
      <div>
      {/* Вывод загруженных файлов */}
      {linksToUpload && linksToUpload?.length > 0 && (
        <div>
          <strong>Selected files:</strong>
          <ul>
            {linksToUpload.map((file, index) => (
              <li key={index}>{file.upload_id}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </form>
  );
}
