import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {CONSTANTS} from '../../constants';
import categoriesService from '../services/categories.service';
import utils from '../../utils';

export const getAllCategoriesForRestaurant = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CATEGORIES,
  async (token, thunk) => {
    try {
      //   // console.log('sadsadsadsada ==== >>>>> check');
      const response = await categoriesService.getCategoriesRestaurant(token);
      // // console.log('getAllCategoriesForRestaurant resp:  ==== >>>>> ', response);
      thunk.dispatch(categoriesSlice.actions.saveCategories_R(response.data));
      return response;
    } catch (error) {
      //   // console.log('sadsadsadsada ==== >>>>> check', error);
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const getAllCategoriesForGrocery = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CATEGORIES,
  async (token, thunk) => {
    try {
      //   // console.log('sadsadsadsada ==== >>>>> check');
      const response = await categoriesService.getCategoriesGrocery(token);
      // // console.log('getAllCategoriesForGrocery resp:  ==== >>>>> ', response);
      thunk.dispatch(categoriesSlice.actions.saveCategories_G(response.data));
      return response;
    } catch (error) {
      //   // console.log('sadsadsadsada ==== >>>>> check', error);
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {RestaurantCategories: [], GroceryCategories: []},
  reducers: {
    saveCategories_R: (state, action) => {
      state.RestaurantCategories = action.payload;
    },
    saveCategories_G: (state, action) => {
      state.GroceryCategories = action.payload;
    },
  },
  extraReducers: {
    [getAllCategoriesForRestaurant.fulfilled]: (state, action) => {},
    [getAllCategoriesForRestaurant.rejected]: (state, action) => {},
    [getAllCategoriesForGrocery.fulfilled]: (state, action) => {},
    [getAllCategoriesForGrocery.rejected]: (state, action) => {},
  },
});

export const {saveCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
