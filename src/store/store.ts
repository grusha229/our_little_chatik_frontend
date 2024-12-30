import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authSlice, { loadTokensFromStorage } from './features/auth';
import { authApi } from '../services/auth';
import authMiddleware from '../middleware/auth';
import { usersSlice } from './features/users';
import { usersApi } from '../services/users';
import usersMiddleware from '../middleware/users';

// Объединение редукторов
const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  users: usersSlice,
  [usersApi.reducerPath]: usersApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(authApi.middleware, usersApi.middleware)
      .concat(authMiddleware, usersMiddleware)
  )
});

// Загрузка токенов из localStorage при запуске приложения
store.dispatch(loadTokensFromStorage());

// Типы для состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создание хуков для типизированных dispatch и selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;