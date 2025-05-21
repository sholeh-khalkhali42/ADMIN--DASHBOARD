import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
// Fetch all products
    getProducts: builder.query({
      query: () => 'products?limit=100',// Increase limit for client-side pagination
      providesTags: ['Products'],
    }),

// Fetch a specific product
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

   // Fetch the list of categories
    getCategories: builder.query({
      query: () => 'products/categories',
    }),

   // Add a new product
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    // Edit product
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Products'],
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
