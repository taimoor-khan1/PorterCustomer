import {createSlice} from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {isVisible: false, message: ''},
  reducers: {
    show: (state, action) => {
      state.isVisible = true;
      state.message = action.payload || action;
    },
    hide: state => {
      state.isVisible = false;
      state.message = '';
    },
  },
});

export const {show, hide} = errorSlice.actions;
export default errorSlice.reducer;
