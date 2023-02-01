import { apiSlice } from "../../api/apiSlice.js";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        let formdata = new FormData();
        formdata.append("email", "admin3123@mail.com");
        formdata.append("password", "qwerty");
        return {
          url: "/api/auth/login",
          method: "POST",
          body: formdata,
        };
      },

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setCredentials(data));
      //     dispatch(apiSlice.util.resetApiState());
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
    }),
    sendLogout: builder.mutation({
      query: (credentials) => {
        let formdata = new FormData();
        formdata.append("email", "admin3123@mail.com");
        formdata.append("password", "qwerty");
        return {
          url: "/api/auth/login",
          method: "POST",
          body: formdata,
        };
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
          //console.log(data)
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/api/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
