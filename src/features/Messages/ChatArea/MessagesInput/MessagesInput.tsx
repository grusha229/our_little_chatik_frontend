import React from "react";
import styles from "./MessagesInput.module.scss";
import { IChatsGetChatInfoResponse,  } from "@app/models/chats";
import MessageFormAttachments from "@app/features/Messages/ChatArea/MessageFormAttachments/MessageFormAttachments";
import ChatSendForm from "@app/features/Messages/ChatArea/ChatSendForm/ChatSendForm";

export interface IProps {
  current_chat: IChatsGetChatInfoResponse;
}

export default function MessagesInput({ current_chat }: IProps) {

  return (
    <div className={styles["form--container"]} >
      <MessageFormAttachments current_chat={current_chat} />
      <ChatSendForm current_chat={current_chat} />
    </div>
  );
}
