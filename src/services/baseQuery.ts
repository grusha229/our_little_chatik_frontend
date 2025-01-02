// services/baseQueryWithReauth.ts
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setTokens, deleteTokens } from '../store/features/auth';
import { RootState } from '../store/store'; // Типизация корневого состояния
import { authApi } from './auth';

const TEST_URL = '/api/v1';

const createBaseQueryWithReauth = (prefix: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: TEST_URL + prefix, // Пустой базовый URL, он будет передаваться в query
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Получаем accessToken из состояния
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // Если получили ошибку 401 (неавторизован)
    if (result.error?.status === 401) {
        
      const { refresh_token } = (api.getState() as RootState).auth;

      if (refresh_token) {
        // Используем refreshToken для обновления токенов
        const refreshResult = await api.dispatch(authApi.endpoints.refreshToken.initiate({ refresh_token }));

        if (refreshResult.data) {
          // Если обновление прошло успешно, сохраняем новые токены
          api.dispatch(setTokens(refreshResult.data));

          // Повторно выполняем запрос с новыми токенами
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Если обновление не удалось, разлогиниваем пользователя
          api.dispatch(deleteTokens());
        }
      } else {
        // Если нет refreshToken, разлогиниваем пользователя
        api.dispatch(deleteTokens());
      }
    }

    return result;
  };

  return baseQueryWithReauth;
};

export default createBaseQueryWithReauth;
