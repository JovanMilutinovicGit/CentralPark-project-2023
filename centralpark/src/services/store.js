import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { brokerData } from "../services/brokerData";
import authReducer from "../services/features/authSlice";
import brokerReducer from "../services/features/NewBrokerSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import editBrokerReducer from "./features/EditModalSlice";
import editDataReducer from "./features/EditDataSlice";
import filterSliceReducer from "./features/FilterSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [brokerData.reducerPath]: brokerData.reducer,
    auth: authReducer,
    newBroker: brokerReducer,
    modal: editBrokerReducer,
    editData: editDataReducer,
    filterData: filterSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(brokerData.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
