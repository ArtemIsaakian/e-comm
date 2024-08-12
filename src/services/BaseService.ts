import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: fetchBaseQuery({ baseUrl: "https://60f3d09d675b8729.mokky.dev/" }),
  tagTypes: ['Catalog', 'Cart', 'Favorites'],
  endpoints: (builder) => ({
    getCatalog: builder.query({
     query: ({ page = 1 }) => `catalog?page=${page}&limit=8`,
      providesTags: ['Catalog', 'Favorites']
    })
  })
})
