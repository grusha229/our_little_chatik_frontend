export enum WsMessageType {
    MESSAGE_CREATED = "message_created",
    CHAT_CREATED = "chat_created",
    MESSAGE_READ = "message_read",
    CHAT_UPDATED = "chat_updated",
}

export interface WSResponse<T> {
    created_at: string,
    data: T,
    description: string,
    key: string,
    outbox_id: number,
    type: WsMessageType,
}