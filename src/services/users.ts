import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQueryWithReauth from './baseQuery'
import { ICurrentUserInfoResponse } from '../models/users'

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
  }),
})

export const { 
  useGetUserInfoQuery,
} = usersApi