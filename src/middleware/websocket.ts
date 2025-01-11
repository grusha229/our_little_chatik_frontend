import { AppDispatch, store } from './../store/store';
// middleware/websocketMiddleware.ts
import { Action, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { websocketService } from '../services/websocket';
import { addMessage } from '../store/features/chats';
import { WsMessageType } from '../models/websocket';
const websocketMiddleware: Middleware = (state) => (next) => async (action) => {
  let token;
  switch (action.type) {
    case 'websocket/connect':
      token = state.getState().auth.token;
      websocketService.connect(action.payload, token);
      break;

    case 'websocket/sendMessage':
      websocketService.send(action.payload);
      break;

    case 'websocket/disconnect':
      websocketService.disconnect();
      break;

    case 'websocket/receiveMessage': {
      const message = action.payload;

      // Проверяем описание сообщения
      if (message.type === WsMessageType.MESSAGE_CREATED) {
        if (message.data.sender_id !== state.getState().users.current_user?.user_id) {
          store.dispatch(addMessage({
            chat_id: message.data.chat_id,
            message: message.data
          }));
        }
      }

      break;
    }

    default:
      return next(action);
  }
};

export default websocketMiddleware;