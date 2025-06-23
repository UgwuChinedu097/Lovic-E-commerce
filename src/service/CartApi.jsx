import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; 

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Cart', 'Order'],
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => '/api/user/user-cart',
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation({
      query: ({ productId, qty }) => ({
        url: '/api/cart/add-to-cart',
        method: 'POST',
        body: { productId, qty },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation({
      query: ({ productId }) => ({
        url: '/api/cart/remove-from-cart',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Cart'],
    }),

    addOrder: builder.mutation({
      query: (orderData) => ({
        url: '/api/order/create-order',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order', 'Cart'],
    }),

    getAllOrders: builder.query({
      query: () => '/api/order/all-order',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useGetUserCartQuery, 
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useAddOrderMutation,
  useGetAllOrdersQuery,
} = cartApi;
