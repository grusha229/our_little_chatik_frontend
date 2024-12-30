export interface IChatsUser {
    created_at: string,
}

export interface IChatsMessage {
    created_at: string,
}

export interface IChatsPhoto {
    path: string,
    url: string,
}

export interface IChatsChat {
    chat_id: string,
    chat_type: string,
    created_at: string,
    last_message: IChatsMessage,
    last_read_msg_id: number,
    name: string,
    participants: Array<IChatsUser>,
    photo: IChatsPhoto,
    updated_at: string
}

export type IChatsChatListResponse = Array<IChatsChat>

export interface IChatsSearchMessagesResponse {
    chats: Array<IChatsChat>,
    messages: Array<IChatsMessage>,
    users: Array<IChatsUser>
}

export interface IChatsSearchMessagesPayload {
    text: string,
    limit?: number,
    page?: number,
}