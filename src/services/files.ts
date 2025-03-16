import { createApi } from '@reduxjs/toolkit/query/react'
import { IChatsAttachmentUploadPayload, IChatsUploadFileLinkResponse } from '../models/chats'
import { createBaseQuery } from './baseQuery'

export const filesApi = createApi({
  reducerPath: 'files_api',
  baseQuery: createBaseQuery(''),
  endpoints: (builder) => ({
      uploadAttachment: builder.mutation<IChatsUploadFileLinkResponse, IChatsAttachmentUploadPayload>({
        query: (payload) => {
          const {url, file} = payload
          return {
            url,
            method: 'PUT',
            body: file,
          }
        },
      })
  }),
})
export const {
  useUploadAttachmentMutation
} = filesApi