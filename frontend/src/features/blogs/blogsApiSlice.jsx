import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";

const blogsAdapter = createEntityAdapter({})

const initialState = blogsAdapter.getInitialState()

export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => '/blogs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: responseData => {
                const loadedBlogs = responseData.map(blog => {
                    blog.id = blog._id;
                    return blog;
                });
                return blogsAdapter.setAll(initialState, loadedBlogs);
            },
            providesTags: (result, error, arg) => {
                if (result.ids) {
                    return [
                        { type: 'Blog', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Blog', id })),
                    ];
                } else return [{ type: 'Blog', id: 'LIST' }];
            },
        }),
        createBlog: builder.mutation({
            query: blog => ({
                url: '/blogs',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
        deleteBlog: builder.mutation({
            query: blogId => ({
                url: `/blogs/${blogId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
        }),
    }),
});

export const { 
    useGetBlogsQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
 } = blogsApiSlice

export const selectblogsResult = blogsApiSlice.endpoints.getBlogs.select()

const selectBlogsData = createSelector(
    selectblogsResult,
    blogsResult => blogsResult.data
)

export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogsById,
    selectIds: selectBlogsIds,
} = blogsAdapter.getSelectors(state => selectBlogsData(state) ?? initialState)








/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 // Create a thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    const response = await fetch("/api/blogs");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await response.json();
    return data;
  }
);
 // Create the blog slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
 // Export the blog actions and reducer
export const { selectAll: selectAllBlogs } = blogSlice.adapter.getSelectors(
  (state) => state.blogs
);
export const { fetchBlogs } = blogSlice.actions;
export default blogSlice.reducer; */