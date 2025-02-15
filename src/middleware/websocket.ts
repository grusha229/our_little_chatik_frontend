import { Middleware } from '@reduxjs/toolkit';
import { websocketService } from '../services/websocket';
import { addChat, addMessage, updateChatLastMessage } from '../store/features/chats';
import { WsMessageType } from '../models/websocket';
import { setConnectionStatus } from '../store/features/websocket';
import { store } from '../store/store';

const websocketMiddleware: Middleware = (state) => (next) => async (action) => {
  let token;
  switch (action.type) {
    case 'websocket/connect': {
      token = state.getState().auth.token;
      websocketService.connect(action.payload, token);
      break;
    }

    case 'websocket/sendMessage': {
      websocketService.send(action.payload);
      break;
    }

    case 'websocket/disconnect': {
      websocketService.disconnect();
      store.dispatch(setConnectionStatus(false));
      break;
    }

    case 'websocket/receiveMessage': {
      const message = action.payload;

      switch (message.type) {
        case WsMessageType.MESSAGE_CREATED:
          if (message.data.sender_id !== state.getState().users.current_user?.user_id) {
            store.dispatch(addMessage({ chat_id: message.data.chat_id, message: message.data }));
          }
          store.dispatch(updateChatLastMessage(message.data));
          break;

        case WsMessageType.CHAT_CREATED:
          store.dispatch(addChat(message.data));
          break;

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