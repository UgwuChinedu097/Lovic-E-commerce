import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift({ id: Date.now(), text: action.payload });
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
