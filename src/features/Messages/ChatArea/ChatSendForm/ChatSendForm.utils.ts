import { IChatsMessage } from "../../../../models/chats";

export function generateNewMessage(tempId: string, message: string, userId: string) {

    const newMessage: IChatsMessage = {
              id: tempId,
              status: 'pending',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              sender_id: userId,
              payload: message,
              chat_id: ''
    };

    return newMessage
};