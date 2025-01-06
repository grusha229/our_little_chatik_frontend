import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsChatListResponse, IChatsCreateChatPayload } from '../models/chats'
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
      create: builder.mutation<void, IChatsCreateChatPayload>({
        query: (payload) => ({
          url: `/`,
          method: 'POST',
          body: payload,
        }),
      })
  }),
})
export const { 
  useChatsListQuery,
  useCreateMutation,
} = chatApi