import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentFilter: "all",
    editingId: null,
  },
  reducers: {
    setFilter(state, action) {
      state.currentFilter = action.payload;
    },
    setEditingId(state, action) {
      state.editingId = action.payload;
    },
    clearEditing(state) {
      state.editingId = null;
    },
  },
});

export const { setFilter, setEditingId, clearEditing } = uiSlice.actions;
export default uiSlice.reducer;
