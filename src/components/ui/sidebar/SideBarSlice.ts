import { createSlice } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: {
    currentTitle: '',
    open: false,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.open = !state.open;
    },
    onSetNewCurrentTitle: (state, action) => {
      state.currentTitle = action.payload.title;
    },
  },
});

export const { toggleSideBar, onSetNewCurrentTitle } = sideBarSlice.actions;

export default sideBarSlice.reducer;
