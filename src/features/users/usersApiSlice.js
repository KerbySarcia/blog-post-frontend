import { apiSlice } from "../../app/api/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: { ...body },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = usersApiSlice;
