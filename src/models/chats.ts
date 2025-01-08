import { ICurrentUserInfoResponse } from "./users";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChatsUser {
    avatar: string,
    email: string,
    name: string,
    nickname: string,
    surname: string,
    user_id: string,
}

export interface IChatsMessage {
    chat_id: string;
    created_at: string;
    id: string;
    is_edited?: boolean;
    is_read?: boolean;
    media?: unknown;
    payload: string;
    reactions?: any;
    sender_id: string;
    updated_at?: string;
    status?: 'pending' | 'sent' | 'failed';
}

export interface IChatsPhoto {
    path?: string,
    url?: string,
}

export interface IChatsChat {
    chat_id: string,
    chat_type: string,
    created_at: string,
    last_message: IChatsMessage,
    last_read_msg_id: number,
    name: string,
    participants?: Array<IChatsUser>,
    photo: IChatsPhoto,
    updated_at: string
}

export type IChatsChatListResponse = Array<IChatsChat>

export enum ChatType {
    PRIVATE = 'private',
    GROUP = 'group',
}

export interface IChatsCreateChatPayload {
    participants_ids: Array<ICurrentUserInfoResponse["user_id"]>,
    participants: Array<ICurrentUserInfoResponse>,
    chat_type: ChatType,
    name: string,
    photo_upload_id?: string,
}

export interface IChatsGetChatInfoPayload {
    id: string
}

export interface IChatsGetChatInfoResponse extends IChatsChat {}

export interface IChatsGetChatMessagesPayload {
    id: string,
    limit?: number,
    start_with_id?: number,
    finish_with_id?: number,
}

export type IChatsGetChatMessagesResponse = Array<IChatsMessage> 

export interface IChatsSendMessagePayload {
    /** Chat id */
    id: string,
    payload: string,
    upload_ids?: Array<string>,
}

export interface IChatsSendMessageResponse extends IChatsMessage {}