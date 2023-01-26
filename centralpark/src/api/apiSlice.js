import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://central-park.doniraj-krv.w3lab.cloud",
  }),
  mode: "no-cors",
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
