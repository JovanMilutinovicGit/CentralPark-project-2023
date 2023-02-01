import { createSlice } from "@reduxjs/toolkit";

const editModal = createSlice({
  name: "modal",
  initialState: { open: false },
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = editModal.actions;

export default editModal.reducer;

export const selectCurrentState = (state) => state.modal.open;
