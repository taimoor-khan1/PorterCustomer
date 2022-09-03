import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import filterService from '../services/filter.service';

export const getLatestOffers = createAsyncThunk(
  CONSTANTS.API_URLS.GET_FILTERS,
  async ({dummyData}, thunk) => {
    try {
      const response = await filterService.getFilterOptions();
      thunk.dispatch(filterSlice.actions.saveFilterOptions(response.data));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const applyFilters = createAsyncThunk(
  CONSTANTS.API_URLS.GET_FILTERS,
  async (filters, thunk) => {
    try {
      const response = await filterService.applyFilters(filters);
      thunk.dispatch(filterSlice.actions.applyFilters(response.data));
      thunk.dispatch();
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filters: {},
    filteredData: [],
    appliedFilters: null,
    isApplied: false,
  },
  reducers: {
    saveFilterOptions: (state, action) => {
      state.isVisible = true;
      state.message = action.payload || action;
    },
    applyFilters: state => {
      state.isApplied = true;
    },

    appliedFilters: state => {
      state.appliedFilters = action.payload;
    },

    clearFilters: state => {
      state.isApplied = false;
      state.appliedFilters = null;
    },
  },
});

export const {show, hide} = filterSlice.actions;
export default filterSlice.reducer;
