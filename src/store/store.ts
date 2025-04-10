import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice, { loadTokensFromStorage } from './features/auth';
import { authApi } from '@app/services/auth';
import authMiddleware from '@app/middleware/auth';
import usersSlice from './features/users';
import { usersApi } from '@app/services/users';
import usersMiddleware from '@app/middleware/users';
import chatsSlice from './features/chats';
import { chatApi } from '@app/services/chat';
import chatsMiddleware from '@app/middleware/chats';
import searchMiddleware from '@app/middleware/search';
import searchSlice from './features/search';
import { searchApi } from '@app/services/search';
import modalsSlice from './features/modals';
import websocketMiddleware from '@app/middleware/websocket';

import websocketSlice from './features/websocket';
import { filesApi } from '@app/services/files';

// Объединение редукторов
const rootReducer = combineReducers({
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    users: usersSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    chats: chatsSlice,
    [chatApi.reducerPath]: chatApi.reducer,
    search: searchSlice,
    [searchApi.reducerPath]: searchApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    modals: modalsSlice,
    websocket: websocketSlice,
});

export const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware, usersApi.middleware, chatApi.middleware)
            .concat(
                authMiddleware,
                usersMiddleware,
                chatsMiddleware,
                searchMiddleware,
                websocketMiddleware,
            ),
});

// Загрузка токенов из localStorage при запуске приложения
store.dispatch(loadTokensFromStorage());

// Типы для состояния и dispatch
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
