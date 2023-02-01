import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

export const brokerData = createApi({
  reducerPath: "data",

  tagTypes: ["visit"],
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
  mode: "no-cors",
  endpoints: (builder) => ({
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
    }),
    GetBrokerData: builder.query({
      query: ({ cp, sv }) => `/api/visit?page=${cp}&per_page=${sv}`,
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "visit", id })),
              { type: "visit", id: "PARTIAL-LIST" },
            ]
          : [{ type: "visit", id: "PARTIAL-LIST" }],
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
      invalidatesTags: ["visit"],
    }),
    deleteOneBroker: builder.mutation({
      query: (id) => {
        return {
          url: `/api/visit/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["visit"],
    }),
    update: builder.mutation({
      query: ({
        id: visit_id,
        first_visitt: first_visit,
        broker_company,
        broker_name: broker,
        client_detail: client,
        office_type_id,
        office_size_id,
        introduced_via_maill: introduced_via_mail,
      }) => {
        let formdata = new FormData();
        formdata.append("id", visit_id);
        formdata.append("broker_company[title]", broker_company);
        formdata.append("broker[name]", broker);
        formdata.append("client[name]", client);
        formdata.append("office_size[id]", office_size_id);
        formdata.append("office_type[title]", office_type_id);
        formdata.append("introduced_via_mail", introduced_via_mail);
        formdata.append("first_visit", first_visit);

        return {
          url: "/api/visit",
          method: "POST",
          body: {
            visit_id,
            broker_company,
            broker,
            client,
            office_size_id,
            office_type_id,
            introduced_via_mail,
            first_visit,
          },
        };
      },
      invalidatesTags: ["visit"],
    }),
  }),
});

export const {
  useGetBrokerDataQuery,
  useNewBrokerMutation,
  useDeleteBrokerMutation,
  useDeleteOneBrokerMutation,
  useUpdateMutation,
} = brokerData;
