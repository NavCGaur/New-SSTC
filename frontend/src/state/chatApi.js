import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApiSlice = createApi({
  reducerPath: 'chatApiSlice',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: '/chat',
        method: 'POST',
        body: { message },
      }),
    }),
    getConversationHistory: builder.query({
      query: () => '/conversations',
    }),
  }),
});

export const { 
  useSendMessageMutation,
  useGetConversationHistoryQuery,
} = chatApiSlice;