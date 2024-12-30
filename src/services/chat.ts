import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsChatListResponse, IChatsSearchMessagesPayload, IChatsSearchMessagesResponse } from '../models/chats'
import createBaseQueryWithReauth from './baseQuery'

export const chatApi = createApi({
  reducerPath: 'chats_api',
  baseQuery: createBaseQueryWithReauth('/chats/'),
  endpoints: (builder) => ({
    /** Search chats, messages and users */
    chatsSearch: builder.mutation< IChatsSearchMessagesResponse, IChatsSearchMessagesPayload>({
        query: (payload: IChatsSearchMessagesPayload) => ({
          url: `/messages/search`,
          method: 'GET',
          params: payload,
        }),
      }),
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
  useChatsSearchMutation,
  useChatsListQuery
} = chatApi