import { Middleware } from '@reduxjs/toolkit';
import { chatApi } from '../services/chat';
import { setChats } from '../store/features/chats';

const chatsMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (chatApi.endpoints.chatsList.matchFulfilled(action)) {

    store.dispatch(setChats(action.payload));
  }

  return result;
};

export default chatsMiddleware;
