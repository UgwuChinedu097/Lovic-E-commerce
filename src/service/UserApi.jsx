import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL; 

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product'],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => ({
        url: '/api/user/signup',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    getAllUsers: builder.query({
      query: () => '/api/user/all-user',
      providesTags: ['User'],
    }),

    getOneProduct: builder.query({
      query: (productId) => `/api/user/one-product/${productId}`,
      providesTags: ['Product'],
    }),

    getUserCart: builder.query({
      query: () => '/api/user/user-cart',
      providesTags: ['Cart']
    })
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetOneProductQuery,
  useGetUserCartQuery,
} = userApi;
