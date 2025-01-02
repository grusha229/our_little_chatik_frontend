import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsChatListResponse } from '../models/chats'
import createBaseQueryWithReauth from './baseQuery'

export const chatApi = createApi({
  reducerPath: 'chats_api',
  baseQuery: createBaseQueryWithReauth('/chats/'),
  endpoints: (builder) => ({
      /** Get chats list */
      chatsList: builder.query<IChatsChatListResponse, void>({
        query: () => ({
          url: `/`,
          method: 'GET',
        }),
      }),
  }),
})
export const { 
  useChatsListQuery
} = chatApi