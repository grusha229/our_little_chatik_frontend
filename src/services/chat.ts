import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsChatListResponse, IChatsCreateChatPayload, IChatsGetChatInfoPayload, IChatsGetChatInfoResponse, IChatsGetChatMessagesPayload, IChatsGetChatMessagesResponse } from '../models/chats'
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
      }),
      getChatInfo: builder.mutation<IChatsGetChatInfoResponse, IChatsGetChatInfoPayload>({
        query: (payload) => ({
          url: `/${payload.id}`,
          method: 'GET',
        }),
      }),
      getChatMessages: builder.mutation<IChatsGetChatMessagesResponse, IChatsGetChatMessagesPayload>({
        query: (payload) => ({
          url: `/${payload.id}/messages`,
          method: 'GET',
        }),
      })
  }),
})
export const {
  useChatsListQuery,
  useCreateMutation,
  useGetChatInfoMutation,
  useGetChatMessagesMutation,
} = chatApi