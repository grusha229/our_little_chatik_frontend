import { IChatsChat, IChatsMessage, IChatsUser } from "./chats";

export interface ISearchResponse {
    chats: Array<IChatsChat>,
    messages: Array<IChatsMessage>,
    users: Array<IChatsUser>
}

export interface ISearchPayload {
    text: string,
    limit?: number,
    page?: number,
}