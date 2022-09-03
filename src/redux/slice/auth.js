import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import authService from '../services/auth.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {store} from '../store';

const initialState = {
  accessToken: null,
};

export const login = createAsyncThunk(
  CONSTANTS.API_URLS.LOGIN,
  async ({email, password}, thunk) => {
    try {
      const response = await authService.login(email, password);
      if (response.status === 1)
        thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      // console.log(err);
      return thunk.rejectWithValue(err);
    }
  },
);

export const appleLoginUser = createAsyncThunk(
  CONSTANTS.API_URLS.APPLE_SIGN_UP,
  async ({name, email, socialToken, role}, thunk) => {
    try {
      const response = await authService.appleLoginUser({
        name,
        email,
        socialToken,
        role,
      });
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const GoogleSignUp = createAsyncThunk(
  CONSTANTS.API_URLS.GOOGLe_SIGN_UP,
  async ({name, email, socialToken, role}, thunk) => {
    try {
      const response = await authService.GoogleSighnIn(
        name,
        email,
        socialToken,
        role,
      );
      // // console.log('response =============', response);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const FacebookSignUp = createAsyncThunk(
  CONSTANTS.API_URLS.FACEBOOK_SIGN_UP,
  async ({name, email, socialToken, role}, thunk) => {
    try {
      const response = await authService.FacbookSighnIn(
        name,
        email,
        socialToken,
        role,
      );
      // // console.log('response =============', response);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const verifyOtpAndLogin = createAsyncThunk(
  CONSTANTS.API_URLS.VERIFY_OTP,
  async ({email, otp}, thunk) => {
    try {
      const response = await authService.verifyOtpAndLogin(email, otp);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async (accessToken, thunk) => {
    try {
      const response = await authService.logout(accessToken);
      const userId = store.getState()?.Profile.profile.id;
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child('Customer')
        .child(userId.toString())
        .set('')
        .then(responce => {
          console.log('logout::: ', responce);
        });
      thunk.dispatch(authSlice.actions.removeAccessToken());
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
      saveAccessTokenToStorage(accessToken);
    },
    removeAccessToken: (state, action) => {
      state.accessToken = null;
      removeAccessTokenFromStorage();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {},
    [login.rejected]: (state, action) => {},
    [verifyOtpAndLogin.fulfilled]: (state, action) => {},
    [verifyOtpAndLogin.rejected]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {},
    [logout.rejected]: (state, action) => {},
  },
});

const saveAccessTokenToStorage = accessToken => {
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.DEFAULT_USER,
    JSON.stringify(accessToken),
  );
};

const removeAccessTokenFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.CACHE_KEYS.DEFAULT_USER);
};

export const {saveAccessToken, removeAccessToken} = authSlice.actions;
export default authSlice.reducer;
