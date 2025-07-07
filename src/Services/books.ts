import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://jxzpensbifvqjsumlhyt.supabase.co/rest/v1/";

interface Book {
  id: string;
  title: string;
  image_url: string;
  price: number;
  description?: string;
  is_best_seller?: boolean;
}

interface WishlistItem {
  id: string;
  user_id: string;
  book_id: string;
  books: Book;
}

interface CartItem {
  id: string;
  user_id: string;
  book_id: string;
  quantity: number;
  books: Book;
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  tagTypes: ["Wishlist", "Cart"],
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

    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "books",
        params: { select: "*" },
      }),
    }),


    getBestSellers: builder.query<Book[], void>({
      query: () => ({
        url: "books",
        params: {
          select: "*",
          is_best_seller: "eq.true",
        },
      }),
    }),


    getBookDetails: builder.query<Book, string>({
      query: (id) => ({
        url: "books",
        params: {
          id: `eq.${id}`,
          select: "*",
        },
      }),
      transformResponse: (res: Book[]) => res[0],
    }),

   getWishlist: builder.query<Book[], string>({
  query: (userId) => ({
    url: 'wishlist',
    params: {
      select: '*,books(*)',
      user_id: `eq.${userId}`,
    },
  }),
  transformResponse: (response: WishlistItem[]) =>
    response.map((item) => item.books),
  providesTags:  ["Wishlist"],
}),


addToWishlist: builder.mutation<void, { user_id: string; book_id: string }>({
  query: ({ user_id, book_id }) => ({
    url: "wishlist",
    method: "POST",
    body: { user_id, book_id },
  }),
  invalidatesTags: [ "Wishlist"],
}),


removeFromWishlist: builder.mutation<void, { user_id: string; book_id: string }>({
  query: ({ user_id, book_id }) => ({
    url: `wishlist?user_id=eq.${user_id}&book_id=eq.${book_id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Wishlist"],
}),

addToCart: builder.mutation({
  query: ({ user_id, book_id, quantity }) => ({
    url: "cart",
    method: "POST",
    body: { user_id, book_id, quantity },
  }),
  invalidatesTags: ["Cart"],
}),

getCart: builder.query<CartItem[], string>({
  query: (userId) => ({
    url: "cart",
    params: {
      select: "*,books(*)",
      user_id: `eq.${userId}`,
    },
  }),
  providesTags:  ["Cart"],
}),

    removeFromCart: builder.mutation<void, { user_id: string; book_id: string }>({
      query: ({ user_id, book_id }) => ({
        url: `cart?user_id=eq.${user_id}&book_id=eq.${book_id}`,
        method: "DELETE",
      }),
      invalidatesTags:[ "Cart"],
    }),

getBooksByPrice: builder.query<Book[], number>({
  query: (maxPrice) => ({
    url: "books",
    params: {
      select: "*",
      price: `lte.${maxPrice}`,
    },
  }),
}),


  }),
});

export const {
  useGetBooksQuery,
  useGetBestSellersQuery,
  useGetBookDetailsQuery,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation, 
  useGetBooksByPriceQuery
} = booksApi;
