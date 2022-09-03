import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import latestOfferService from '../services/latestOffers.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  latestOffers: [],
};

export const getLatestOffers = createAsyncThunk(
  CONSTANTS.API_URLS.COUPONS,
  async ({dummyData}, thunk) => {
    try {
      const response = await latestOfferService.getLatestOffers();
      thunk.dispatch(latestOffersSlice.actions.savelatestOffers(response.data));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const latestOffersSlice = createSlice({
  name: 'latestOffers',
  initialState,
  reducers: {
    savelatestOffers: (state, action) => {
      state.latestOffers = action.payload;
    },
  },
  // extraReducers: {
  //   [login.fulfilled]: (state, action) => {},
  //   [login.rejected]: (state, action) => {},
  //   [verifyOtpAndLogin.fulfilled]: (state, action) => {},
  //   [verifyOtpAndLogin.rejected]: (state, action) => {},
  //   [logout.fulfilled]: (state, action) => {},
  //   [logout.rejected]: (state, action) => {},
  // },
});

export const {latestOffers} = latestOffersSlice.actions;
export default latestOffersSlice.reducer;
