import { createSlice } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: {
    open: true,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
