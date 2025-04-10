import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReauth } from './baseQuery';
import {
    ICurrentUserInfoResponse,
    IUsersPatchCurrentUserPayload,
    IUsersPatchCurrentUserResponse,
    IUsersSearchPayload,
    IUsersSearchResponse,
    IUsersUploadAvatarLinkPayload,
    IUsersUploadAvatarLinkResponse,
} from '@app/models/users';

export const usersApi = createApi({
    reducerPath: 'users_api',
    baseQuery: createBaseQueryWithReauth('/users/'),
    endpoints: builder => ({
        /** Get current user info */
        getCurrentUserInfo: builder.query<ICurrentUserInfoResponse, void>({
            query: () => ({
                url: `/me`,
                method: 'GET',
            }),
        }),
        patchCurrentUserInfo: builder.mutation<IUsersPatchCurrentUserResponse, IUsersPatchCurrentUserPayload>({
            // query: (payload) => ({
            //   const {avatar, ...data} = payload;

            //   return {
            //     url: `/me`,
            //     method: 'PATCH',
            //     body: data,
            //   }
            // }),
            query: payload => {
                const { avatar_upload_id, email: _email, ...data } = payload;

                // Добавляем avatar_upload_id в запрос, только если он существует
                const requestBody = avatar_upload_id ? { ...data, avatar_upload_id } : data;

                return {
                    url: '/me',
                    method: 'PATCH',
                    body: requestBody,
                };
            },
        }),
        getAvatarUploadUrl: builder.mutation<IUsersUploadAvatarLinkResponse, IUsersUploadAvatarLinkPayload>({
            query: payload => {
                return {
                    url: '/me/avatar',
                    method: 'POST',
                    body: payload,
                };
            },
        }),
        getUserInfoById: builder.query<ICurrentUserInfoResponse, { user_id: string }>({
            query: payload => ({
                url: `/${payload.user_id}`,
                method: 'GET',
            }),
        }),
        search: builder.query<IUsersSearchResponse, IUsersSearchPayload>({
            query: payload => ({
                url: `/search`,
                method: 'GET',
                params: payload,
                keepUnusedDataFor: 0,
            }),
        }),
    }),
});

export const { useGetCurrentUserInfoQuery, usePatchCurrentUserInfoMutation, useGetAvatarUploadUrlMutation, useGetUserInfoByIdQuery, useSearchQuery } =
    usersApi;
