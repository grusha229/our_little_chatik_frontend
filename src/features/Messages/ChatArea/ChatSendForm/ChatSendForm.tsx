import React, { useEffect, useState } from "react";
import styles from "./ChatSendForm.module.scss";
import Button from "../../../controls/Button/Button";
import Input from "../../../controls/Input/Input";
import { useForm } from "react-hook-form";
import { IChatsFilesLink, IChatsSendMessagePayload } from "../../../../models/chats";
import { useGetAttachmentsUploadUrlsMutation, useSendChatMessageMutation, useUploadAttachmentMutation } from "../../../../services/chat";
import { generateNewMessage } from "./ChatSendForm.utils";
import { useAppSelector } from "../../../../store/store";
import { addMessage, updateMessageStatus } from "../../../../store/features/chats";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export interface IProps {
  chat_id: string;
}

export default function ChatSendForm({ chat_id }: IProps) {
  const [ filesToUpload, setFilesToUpload ] = useState<FileList>(null)
  const [ fileNames, setFileNames] = useState<IChatsFilesLink[]>([]);

  const { register, handleSubmit, formState: { isValid, isSubmitting }, reset, setValue } = useForm<IChatsSendMessagePayload>({
    defaultValues: {
      payload: "",
      id: chat_id,
      upload_ids: [], // Добавляем файлы в `defaultValues`
    },
  });
  const dispatch = useDispatch();
  const [ sendMessage ] = useSendChatMessageMutation();
  const [ getAttachmentsUploadLinks, { isSuccess: isLinksSuccessfullyGet, data: linksToUpload }] = useGetAttachmentsUploadUrlsMutation();
  const [ uploadAttachment, { isSuccess: isFilesUploaded }  ] = useUploadAttachmentMutation();

  const current_user = useAppSelector((state) => state.users.current_user);
  const current_id = current_user?.user_id || "";

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
      })
    }
  };

  useEffect(() => {
    console.log('исходники:', filesToUpload);
    console.log('имена файлов:', fileNames);
    console.log('ссылки:', linksToUpload);
  
    linksToUpload?.forEach((link, index) => {
      const formData = new FormData();
      formData.append('file', filesToUpload[index] )

      uploadAttachment({
        url: link.upload_link,
        file: formData
      })
    })
  }, [isLinksSuccessfullyGet])


  const onSubmit = async (formData: IChatsSendMessagePayload) => {
    const tempId = nanoid();
    const newMessage = generateNewMessage(tempId, formData.payload, current_id);
    dispatch(addMessage({ chat_id, message: newMessage }));

    // Создаем FormData для передачи файлов
    const formDataToSend = new FormData();
    formDataToSend.append("payload", formData.payload);
    formDataToSend.append("id", formData.id);
    
    // if (formData.files && formData.files.length > 0) {
    //   Array.from(formData.files).forEach((file) => {
    //     formDataToSend.append("files", file);
    //   });
    // }

    // try {
    //   const response = await sendMessage(formDataToSend).unwrap();
    //   dispatch(updateMessageStatus({ tempId, id: response.id, status: "sent", chat_id: response.chat_id }));
    // } catch (error) {
    //   dispatch(updateMessageStatus({ tempId, id: newMessage.id, status: "failed", chat_id }));
    //   console.error("Ошибка отправки сообщения:", error);
    // }

    reset(); // Очистка формы
    // setFileNames([]); // Очистка списка файлов
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
          rules={{ required: true }}
          className={styles["input"]}
          placeholder="Enter a message..."
        />

        {/* Кастомная кнопка загрузки файла */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
            // {...register("files")} // Регистрируем файлы
          />
          <label
            htmlFor="fileInput"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Выбрать файл
          </label>
        </div>

        <Button type="submit" disabled={!isValid || isSubmitting}>
          Отправить
        </Button>
      </div>
      
      <div>
      {/* Вывод загруженных файлов */}
      {fileNames.length > 0 && (
        <div>
          <strong>Выбранные файлы:</strong>
          <ul>
            {fileNames.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </form>
  );
}
