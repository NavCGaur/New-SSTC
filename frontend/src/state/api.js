import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utility function to get the token from local storage
const getToken = () => {
  console.log("token in getToken api",localStorage.getItem("token"))

  return localStorage.getItem("token")

};


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log("Token in Header:", token); // Log token to confirm it's being set

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Sales"],
  endpoints: (build) => ({
    // Login endpoint
    login: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getAllUsers: build.query({
      
      query: () => ({
        url: "allusers",
        method: "GET",
      }),
    }),

    getUser: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "users",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["UserById"],
    }),

    createUser: build.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    editUser: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getSales: build.query({
      query: () => ({
        url: "/sales",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),

    getPaidServiceCounts: build.query({
      query: () => ({
        url: "/sales/paidservice",
        method: "GET",
      }),
    }),

    getServiceCounts: build.query({
      query: () => ({
        url: "/users/servicecount",
        method: "GET",
      }),
    }),

    sendEmail: build.mutation({ 
      query: (formData) => ({
         url: '/send-email', 
         method: 'POST',
         body: formData,
         }),
       }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetSalesQuery,
  useGetPaidServiceCountsQuery,
  useGetServiceCountsQuery,
  useSendEmailMutation,
} = api;
