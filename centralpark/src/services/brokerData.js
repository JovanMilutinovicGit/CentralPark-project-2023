import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

export const brokerData = createApi({
  reducerPath: "data",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const cookies = new Cookies(headers.cookie);
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["broker", "visit"],
  endpoints: (builder) => ({
    data: builder.mutation({
      query: () => "/api/broker-company",
    }),
    newBroker: builder.mutation({
      query: ({ broker_company, broker_name }) => {
        let formdata = new FormData();
        formdata.append("broker_company", broker_company);
        formdata.append("broker", broker_name);
        return {
          url: "/api/broker-company",
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["name"],
    }),
    BrokerData: builder.query({
      query: () => "/api/visit",
    }),
    deleteBroker: builder.mutation({
      query: (id) => {
        return {
          url: `/api/visits`,
          method: "DELETE",
          body: {
            visits: id,
          },
        };
      },
      invalidatesTags: ["name"],
    }),
  }),
});

export const {
  useBrokerDataQuery,
  useNewBrokerMutation,
  useDeleteBrokerMutation,
} = brokerData;
