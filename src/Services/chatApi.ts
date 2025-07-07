import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://jxzpensbifvqjsumlhyt.supabase.co/rest/v1/";

export interface Message {
  id: number;
  sender: string;
  username: string;
  text: string;
  created_at: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Message"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_SUPABASE_KEY;
      if (apiKey) {
        headers.set("apikey", apiKey);
        headers.set("Authorization", `Bearer ${apiKey}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => ({
        url: "messages",
        params: {
          select: "*",
          order: "created_at.asc",
        },
      }),
      providesTags: ["Message"],
    }),
    addMessage: builder.mutation<void, Omit<Message, "id" | "created_at">>({
      query: (body) => ({
        url: "messages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),
    deleteMasseges: builder.mutation<void, number>({
      query: (id) => ({
        url: `messages?id=eq.${id}`,
        method: "DELETE",
        id,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMassegesMutation,
} = chatApi;
