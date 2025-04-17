import { createApi } from '@reduxjs/toolkit/query/react';
import {
    IChatsChatListResponse,
    IChatsCreateChatPayload,
    IChatsGetChatInfoPayload,
    IChatsGetChatInfoResponse,
    IChatsGetChatMessagesPayload,
    IChatsGetChatMessagesResponse,
    IChatsSendMessagePayload,
    IChatsSendMessageResponse,
    IChatsUploadFileLinkResponse,
    IChatsUploadFilePayload,
} from '@app/models/chats';
import { createBaseQueryWithReauth } from './baseQuery';

export const chatApi = createApi({
    reducerPath: 'chats_api',
    baseQuery: createBaseQueryWithReauth('/chats/'),
    endpoints: builder => ({
        /** Get chats list */
        chatsList: builder.query<IChatsChatListResponse, void>({
            query: () => ({
                url: `/`,
                method: 'GET',
            }),
        }),
        create: builder.mutation<void, IChatsCreateChatPayload>({
            query: payload => {
                const { participants: _, ...rest } = payload;
                return {
                    url: `/`,
                    method: 'POST',
                    body: rest,
                };
            },
        }),
        getChatInfo: builder.mutation<IChatsGetChatInfoResponse, IChatsGetChatInfoPayload>({
            query: payload => ({
                url: `/${payload.id}`,
                method: 'GET',
            }),
        }),
        getChatMessages: builder.query<IChatsGetChatMessagesResponse, IChatsGetChatMessagesPayload>({
            query: payload => {
                return {
                    url: `/${payload.id}/messages`,
                    method: 'GET',
                    params: payload,
                };
            },
        }),
        sendChatMessage: builder.mutation<IChatsSendMessageResponse, IChatsSendMessagePayload>({
            query: payload => {
                const { chat_id, id: _id, ...data } = payload;
                return {
                    url: `/${chat_id}/messages`,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        getAttachmentsUploadUrls: builder.mutation<IChatsUploadFileLinkResponse, IChatsUploadFilePayload>({
            query: payload => {
                const { id, links } = payload;
                return {
                    url: `/${id}/messages/files/link`,
                    method: 'POST',
                    body: links,
                };
            },
        }),
    }),
});
export const {
    useChatsListQuery,
    useCreateMutation,
    useGetChatInfoMutation,
    useGetChatMessagesQuery,
    useSendChatMessageMutation,
    useGetAttachmentsUploadUrlsMutation,
} = chatApi;
