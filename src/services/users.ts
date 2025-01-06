import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQueryWithReauth from './baseQuery'
import { ICurrentUserInfoResponse, IUsersSearchPayload, IUsersSearchResponse } from '../models/users'

export const usersApi = createApi({
  reducerPath: 'users_api',
  baseQuery: createBaseQueryWithReauth('/users/'),
  endpoints: (builder) => ({
    /** Get current user info */
    getUserInfo: builder.query<ICurrentUserInfoResponse, void>({
        query: () => ({
          url: `/me`,
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
  useGetUserInfoQuery,
  useSearchQuery,
} = usersApi