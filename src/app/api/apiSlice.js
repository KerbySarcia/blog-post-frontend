import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (header, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      header.set("authorization", `Bearer ${token}`);
    }
    return header;
  },
});

const baseQueryReAuth = async (args, api, options) => {
  const result = await baseQuery(args, api, options);

  if (result?.error?.status === 403) {
    const refresh = await baseQuery("/auth/refresh", api, options);
    if (refresh?.data) {
      api.dispatch(setCredentials({ ...refresh.data }));
      result = await baseQuery(args, api, options);
    } else {
      if (refresh?.error?.status === 401) {
        refresh.error.message = "Login Expired";
        return refresh;
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryReAuth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({}),
});
