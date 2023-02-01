import { createSlice } from "@reduxjs/toolkit";

const editDataSlice = createSlice({
  name: "editDataSlice",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = editDataSlice.actions;

export default editDataSlice.reducer;

export const selectEditData = (state) => state.editData.data;
