import { configureStore } from "@reduxjs/toolkit";
import { tableDataApi } from "./brokerData";
import { apiSlice } from "../api/apiSlice";
import { brokerData } from "../services/brokerData";
import authReducer from "../services/features/authSlice";
import brokerReducer from "../services/features/NewBrokerSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [brokerData.reducerPath]: brokerData.reducer,
    auth: authReducer,
    newBroker: brokerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(brokerData.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
