import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { websocketService } from '../services/websocket';
import { addChat, addMessage, updateChatLastMessage, updateMessageStatus } from '../store/features/chats';
import { WsMessageType } from '../models/websocket';
import { setConnectionStatus } from '../store/features/websocket';
import type { RootState } from '../store/types';

const websocketMiddleware: Middleware = (api: MiddlewareAPI<any, RootState>) => (next) => (action: any) => {
  const { dispatch, getState } = api;
  const state = getState();

  switch (action.type) {
    case 'websocket/connect': {
      const token = state.auth.token || '';
      websocketService.connect(action.payload, token);
      break;
    }

    case 'websocket/sendMessage': {
      websocketService.send(action.payload);
      break;
    }

    case 'websocket/disconnect': {
      websocketService.disconnect();
      dispatch(setConnectionStatus(false));
      break;
    }

    case 'websocket/receiveMessage': {
      const message = action.payload;

      switch (message.type) {
        case WsMessageType.MESSAGE_CREATED:
          console.log('Message created', message.data);
          // if (message.data.sender_id !== state.users.current_user?.user_id) {
            dispatch(addMessage({ chat_id: message.data.chat_id, message: message.data }));
          // } else {
            // dispatch(updateMessageStatus({ id: message.data.id, chat_id: message.data.chat_id, status: 'sent'}))
          // }

          dispatch(updateChatLastMessage(message.data));
          break;

        case WsMessageType.CHAT_CREATED: {
          console.log('Chat created', message.data);
          const chatExists = state.chats.chats.find(chat => chat.chat_id === message.data.chat_id);
          if (!chatExists) {
            dispatch(addChat(message.data));
          }

          break;
        }

        case WsMessageType.MESSAGE_READ:
          console.log('Message read', message.data);
          break;

        case WsMessageType.CHAT_UPDATED:
          console.log('Chat updated', message.data);
          break;

        default:
          console.warn('Unknown message type:', message.type);
      }
      break;
    }

    default:
      return next(action);
  }
};

export default websocketMiddleware;