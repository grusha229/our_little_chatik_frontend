import { createApi } from '@reduxjs/toolkit/query/react';
import { IChatsAttachmentUploadPayload, IChatsUploadFileLinkResponse } from '@app/models/chats';
import { createBaseQuery } from './baseQuery';

export const filesApi = createApi({
    reducerPath: 'files_api',
    baseQuery: createBaseQuery(''),
    endpoints: builder => ({
        uploadAttachment: builder.mutation<
            IChatsUploadFileLinkResponse,
            IChatsAttachmentUploadPayload
        >({
            query: payload => {
                const { url, file, content_type } = payload;

                // const {...fileData} = file;
                console.log(file, content_type);
                return {
                    url,
                    method: 'PUT',
                    headers: {
                        'Content-Type': content_type || file.type || 'application/octet-stream',
                    },
                    body: file,
                };
            },
        }),
    }),
});
export const { useUploadAttachmentMutation } = filesApi;
