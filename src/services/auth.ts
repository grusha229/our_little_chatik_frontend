import { createApi } from '@reduxjs/toolkit/query/react'
import { IActivationPayload, IRefreshTokenResponse, ILoginPayload, IRefreshTokenPayload, IRenewPasswordPayload, ISignupPayload } from '../models/auth'
import createBaseQueryWithReauth from './baseQuery'

export const authApi = createApi({
  reducerPath: 'auth_api',
  baseQuery: createBaseQueryWithReauth('/auth/'),
  endpoints: (builder) => ({
    /** Activate a user */
    activateUser: builder.mutation< unknown, IActivationPayload>({
        query: (payload: IActivationPayload) => ({
          url: `/activation`,
          method: 'POST',
          body: payload,
        }),
      }),

    /** Renew activation code */
    renewActivation: builder.mutation({
      query: () => ({
        url: `/activation/new`,
        method: 'POST',
      }),
    }),

    /** Login a user */
    loginUser: builder.mutation<IRefreshTokenResponse, ILoginPayload>({
      query: (payload: ILoginPayload) => ({
        url: `/login`,
        method: 'POST',
        body: payload,
      }),
    }),

    /** Logout a user */
    logoutUser: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: 'POST',
      }),
    }),

    /** Delete a user */
    deleteUser: builder.mutation({
      query: () => ({
        url: `/me`,
        method: 'DELETE',
      }),
    }),

    /** Register a user */
    signupUser: builder.mutation<IRefreshTokenResponse, ISignupPayload>({
      query: (payload) => ({
        url: `/signup`,
        method: 'POST',
        body: payload,
      }),
    }),

    /** Edit password a user */
    editPassword: builder.mutation<unknown, IRenewPasswordPayload>({
      query: (payload) => ({
        url: `/password/new`,
        method: 'POST',
        body: payload,
      }),
    }),

    /** Refresh tokens */
    refreshToken: builder.mutation<IRefreshTokenResponse, IRefreshTokenPayload>({
      query: (payload) => ({
        url: `/refresh`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})
export const { 
  useActivateUserMutation,
  useRefreshTokenMutation,
  useRenewActivationMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useSignupUserMutation,
  useEditPasswordMutation,
} = authApi