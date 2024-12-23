import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
      getUser: build.query({
        query: ({ page, pageSize, sort, search }) => ({
            url: "users",
            method: "GET",
            params: { page, pageSize, sort, search },
          }),      
        providesTags: ["User"],
        }),

      getUserById: build.query({
        query: ({id}) => ({
            url: `users/${id}`,
            method: "GET",
         }),
        providesTags: ["UserById"],

      }),
      createUser: build.mutation({
        query: (userData) => ({
          url: 'users',
          method: 'POST',
          body: userData,
        }),
        invalidatesTags: ["User"], 
      }),

      editUser: build.mutation({
        query: ({ id, ...updatedData }) => {
          console.log("Edit User Request Data:", { id, updatedData }); // Log the incoming data
          return {
            url: `/users/${id}`, // The endpoint
            method: 'PUT',      // The HTTP method
            body: updatedData   // The body of the request
          };
        },
        invalidatesTags: ['User']
      }),
      
      deleteUser: build.mutation({
        query: (id) => ({
          url: `/users/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['User'],
      }),

    }),
   

  });
  
  export const {
    useGetUserQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useEditUserMutation,
    useDeleteUserMutation
  } = api;
  

 