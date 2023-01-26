import { createSlice } from "@reduxjs/toolkit";

const newBroker = createSlice({
  name: "broker",
  initialState: { name_company: "", broker_name: "" },
  reducers: {
    createNewBroker: (state, action) => {
      const { broker_company, broker_name } = action.payload;
      state.name_company = broker_company;
      state.broker_name = broker_name;
    },
  },
});

export const { createNewBroker } = newBroker.actions;

export default newBroker.reducer;
