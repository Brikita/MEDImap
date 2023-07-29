// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mediserver.onrender.com/api' }),
    tagTypes: ['Blog', 'User'],
    endpoints: builder => ({}),
})


export const { useGetPostsQuery } = apiSlice