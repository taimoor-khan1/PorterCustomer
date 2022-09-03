import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import couponsService from '../services/coupons.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  coupons: [],
};

export const getCoupons = createAsyncThunk(
  CONSTANTS.API_URLS.COUPONS,
  async ({dummyData}, thunk) => {
    try {
      const response = await couponsService.getCoupons();
      thunk.dispatch(couponsSlice.actions.saveCoupons(response.data));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    saveCoupons: (state, action) => {
      state.coupons = action.payload;
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

export const {saveCoupons} = couponsSlice.actions;
export default couponsSlice.reducer;
