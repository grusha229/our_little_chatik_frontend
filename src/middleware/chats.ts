import { Middleware } from '@reduxjs/toolkit';
import { chatApi } from '../services/chat';
import { setChats, setCurrentChat } from '../store/features/chats';
import { AppDispatch } from '../store/store';

const chatsMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);
  // Выполнение дополнительного вызова API
  const dispatch: AppDispatch = store.dispatch; // Явное приведение для TypeScript

  if (chatApi.endpoints.create.matchFulfilled(action)) {
    console.log('created:')
    dispatch(chatApi.endpoints.chatsList.initiate({}, { forceRefetch: true }))
    .unwrap()
    .then((response) => {
      console.log('Список чатов обновлён:', response);
      store.dispatch(setChats(response));
    })
    .catch((error) => {
      console.error('Ошибка при обновлении списка чатов:', error);
    });
  }

  if (chatApi.endpoints.chatsList.matchFulfilled(action)) {
    store.dispatch(setChats(action.payload));
  }

  if (chatApi.endpoints.getChatInfo.matchFulfilled(action)) {
    store.dispatch(setCurrentChat(action.payload));
  }

  return result;
};

export default chatsMiddleware;
