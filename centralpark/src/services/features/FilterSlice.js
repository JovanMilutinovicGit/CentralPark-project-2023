import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { filterData: {} },
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
});

export const { openModal, closeModal } = filterSlice.actions;

export default filterSlice.reducer;

export const selectCurrentState = (state) => state.filterData.setFilterData;
