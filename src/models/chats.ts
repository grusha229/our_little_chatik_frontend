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
    chat: {
        id: string,
        name: string,
        type: string;
        photo: IChatsPhoto;
    }
    created_at: string;
    id: number;
    is_edited: boolean;
    is_read: boolean;
    media: unknown;
    payload: string;
    reactions: any;
    sender_id: string;
    updated_at: string;
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