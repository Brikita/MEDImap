import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";

const fourHoursInMilliseconds = 4 * 60 * 60 * 1000
const usersAdapter = createEntityAdapter({
  keepUnusedDataFor: fourHoursInMilliseconds,
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users/professionals',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ];
        } else return [{ type: 'User', id: 'LIST' }];
      },
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      validateStatus: (response, result) => {
        return response.status === 201 && !result.isError;
      },
      transformResponse: (responseData) => {
        const createdUser = {
          id: responseData._id,
          ...responseData,
        };
        return usersAdapter.addOne(initialState, createdUser);
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)





/* import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";


const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        const response = await fetch("/users/professionals");
        if (!response.ok) {
            throw new Error("Failed to fetch professionals");
        }
        const data = await response.json();
        return data.map((user) => {
            user.id = user._id;
            return user;
        });
    }
);
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                usersAdapter.setAll(state, action.payload);
            });
    },
});
export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state) => state.users);
export const { useGetUsersQuery } = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users/professionals",
            transformResponse: (responseData) => {
                return responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
            },
        }),
    }),
});
export default usersSlice.reducer; */