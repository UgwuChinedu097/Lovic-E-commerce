import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/api/product/all-product',
      providesTags: ['Product'],
    }),

    getProductsByCategory: builder.query({
      query: (category) => `/api/product/category/${category}`,
      providesTags: ['Product'],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/api/product/create-product',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/product/update-product/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/delete-product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
