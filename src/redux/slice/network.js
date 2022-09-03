import {createSlice} from '@reduxjs/toolkit';

export const networkSlice = createSlice({
  name: 'network',
  initialState: {networkState: {}},
  reducers: {
    updateNeworkState: (state, actions) => {
      state.networkState = actions.payload;
    },
  },
});

export const {updateNeworkState} = networkSlice.actions;
export default networkSlice.reducer;
