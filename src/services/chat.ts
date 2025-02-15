import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsChatListResponse, IChatsCreateChatPayload, IChatsGetChatInfoPayload, IChatsGetChatInfoResponse, IChatsGetChatMessagesPayload, IChatsGetChatMessagesResponse, IChatsSendMessagePayload, IChatsSendMessageResponse } from '../models/chats'
import createBaseQueryWithReauth from './baseQuery'
import { skipToken } from '@reduxjs/toolkit/query'

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
        query: (payload) => {
          const { participants, ...rest } = payload
          return {
            url: `/`,
            method: 'POST',
            body: rest,
          }
        },
      }),
      getChatInfo: builder.mutation<IChatsGetChatInfoResponse, IChatsGetChatInfoPayload>({
        query: (payload) => ({
          url: `/${payload.id}`,
          method: 'GET',
        }),
      }),
      getChatMessages: builder.query<IChatsGetChatMessagesResponse, IChatsGetChatMessagesPayload>({
        query: (payload) => {
          const { 
            isFirstMessagesFetching,
            ...apiPayload } = payload;

          // if (isFirstMessagesFetching  && payload.start_with_id === 0 && payload.finish_with_id === 0) {
          //   return skipToken
          // }

          return {
            url: `/${payload.id}/messages`,
            method: 'GET',
            params: payload,
          }
        },
      }),
      sendChatMessage: builder.mutation<IChatsSendMessageResponse, IChatsSendMessagePayload>({
        query: (payload) => ({
          url: `/${payload.id}/messages`,
          method: 'POST',
          body: payload,
        }),
      })
  }),
})
export const {
  useChatsListQuery,
  useCreateMutation,
  useGetChatInfoMutation,
  useGetChatMessagesQuery,
  useSendChatMessageMutation
} = chatApi