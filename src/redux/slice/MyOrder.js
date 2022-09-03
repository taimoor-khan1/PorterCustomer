import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import MyOrdersService from '../services/myOrders.service';

const initialState = {
  myOrders: [],
};

export const getMyOrders = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PAST_ORDER,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await MyOrdersService.getMyOrders();
      thunk.dispatch(myOrdersSlice.actions.saveMyOrders(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    saveMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
  },
});

export const {saveMyOrders} = myOrdersSlice.actions;
export default myOrdersSlice.reducer;
