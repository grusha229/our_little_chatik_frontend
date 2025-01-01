import { Middleware } from '@reduxjs/toolkit';
import { chatApi } from '../services/chat';
import { setChats, setSearchResults } from '../store/features/chats';

const chatsMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (chatApi.endpoints.chatsSearch.matchFulfilled(action)) {

    store.dispatch(setSearchResults(action.payload));
  }

  if (chatApi.endpoints.chatsList.matchFulfilled(action)) {

    store.dispatch(setChats(action.payload));
  }

  return result;
};

export default chatsMiddleware;
