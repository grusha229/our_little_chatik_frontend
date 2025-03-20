import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQueryWithReauth } from './baseQuery'
import { ICurrentUserInfoResponse, IUsersSearchPayload, IUsersSearchResponse } from '../models/users'

export const usersApi = createApi({
  reducerPath: 'users_api',
  baseQuery: createBaseQueryWithReauth('/users/'),
  endpoints: (builder) => ({
    /** Get current user info */
    getCurrentUserInfo: builder.query<ICurrentUserInfoResponse, void>({
        query: () => ({
          url: `/me`,
          method: 'GET',
        }),
    }),
    getUserInfoById: builder.query<ICurrentUserInfoResponse, { user_id: string }>({
        query: (payload) => ({
          url: `/${payload.user_id}`,
          method: 'GET',
        }),
    }),
    search: builder.query<IUsersSearchResponse, IUsersSearchPayload>({
      query: (payload) => ({
        url: `/search`,
        method: 'GET',
        params: payload,
        keepUnusedDataFor: 0,
      }),
    }),
  }),
})

export const { 
  useGetCurrentUserInfoQuery,
  useGetUserInfoByIdQuery,
  useSearchQuery,
} = usersApi