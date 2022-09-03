import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import contentService from '../services/content.service';

export const getContents = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CONTENT,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await contentService.getContent();
      // // console.log('contentService ==== >>>>> ', response);

      thunk.dispatch(contentSlice.actions.saveContent(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const contentSlice = createSlice({
  name: 'content',
  initialState: {Content: {}},
  reducers: {
    saveContent: (state, action) => {
      state.Content = action.payload;
    },
  },
  extraReducers: {
    [getContents.fulfilled]: (state, action) => {},
    [getContents.rejected]: (state, action) => {},
  },
});

export const {saveContent} = contentSlice.actions;
export default contentSlice.reducer;
