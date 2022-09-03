import {createSlice} from '@reduxjs/toolkit';

export const HomeSlice = createSlice({
  name: 'Home',
  initialState: {
    SelectedSection: '',
    PickupData: [],
    DelieverData: [],
    GroceryData: [],
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.SelectedSection = action.payload;
    },
  },
});

export const {setSelectedSection} = HomeSlice.actions;
export default HomeSlice.reducer;
