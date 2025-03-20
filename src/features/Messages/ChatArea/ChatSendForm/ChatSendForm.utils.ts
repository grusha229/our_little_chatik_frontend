import { IChatsMessage, IMediaRefItem } from "../../../../models/chats";

export function generateNewMessage(tempId: string, message: string, userId: string, mediaRefs?: IMediaRefItem[]) {

    const newMessage: IChatsMessage = {
              id: tempId,
              status: 'pending',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              sender_id: userId,
              payload: message,
              media: {
                refs: mediaRefs || [],
              },
              chat_id: ''
    };

    return newMessage
};