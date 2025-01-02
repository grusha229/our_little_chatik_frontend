import { createApi } from '@reduxjs/toolkit/query/react'
import createBaseQueryWithReauth from './baseQuery'
import { ISearchPayload, ISearchResponse } from '../models/search'

export const searchApi = createApi({
  reducerPath: 'search_api',
  baseQuery: createBaseQueryWithReauth('/search'),
  endpoints: (builder) => ({
    /** Search chats, messages and users */
    search: builder.mutation<ISearchResponse, ISearchPayload>({
        query: (payload) => ({
          url: ``,
          method: 'GET',
          params: payload,
        }),
      }),
  }),
})
export const { 
  useSearchMutation,
} = searchApi