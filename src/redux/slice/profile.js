import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import profileService from '../services/profile.service';

const initialState = {
  profile: null,
  addressList: [],
  selectedAddress: '',
};

export const profile = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await profileService.profile();
      thunk.dispatch(profileSlice.actions.saveProfile(response.data.records));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const getAddress = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ADDRESS,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await profileService.getAddress();
      thunk.dispatch(profileSlice.actions.saveAddressList(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload;
    },
    saveAddressList: (state, action) => {
      state.addressList = action.payload;
      state.selectedAddress = action.payload.find(
        i => i.address_name === 'Home',
      );
    },
    saveAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

// const {reducer} = profileSlice;
// export default reducer;

export const {saveProfile, saveAddressList, saveAddress} = profileSlice.actions;
export default profileSlice.reducer;
