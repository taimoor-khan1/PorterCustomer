import {createSlice} from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {isVisible: false},
  reducers: {
    show: state => {
      state.isVisible = true;
    },
    hide: state => {
      state.isVisible = false;
    },
  },
});

export const {show, hide} = loaderSlice.actions;
export default loaderSlice.reducer;
