import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {CONSTANTS} from '../../constants';
import categoriesService from '../services/categories.service';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  cartItems: [],
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCartItem: (state, action) => {
      const temp = [...state.cartItems];
      temp.push(action.payload);

      state.cartItems = temp;
      state.subTotal = temp.reduce((sum, i) => sum + i.price * i.qty, 0);
      AsyncStorage.setItem('cartList', JSON.stringify(temp));
    },
    removeCartItem: (state, action) => {
      const temp = [...state.cartItems];
      const index = temp.findIndex(i => i.id === action.payload.id);
      temp.splice(index, 1);

      state.cartItems = temp;
      state.subTotal = temp.reduce((sum, i) => sum + i.price * i.qty, 0);
      AsyncStorage.setItem('cartList', JSON.stringify(temp));
    },
    emptyCart: (state, action) => {
      state.cartItems = [];
      state.subTotal = 0;
      AsyncStorage.setItem('cartList', '');
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.subTotal = action.payload.reduce(
        (sum, i) => sum + i.price * i.qty,
        0,
      );
    },
    incrementItemCount: (state, action) => {
      const temp = [...state.cartItems];
      const index = temp.findIndex(i => i.id === action.payload.id);
      temp[index].qty++;

      state.cartItems = temp;
      state.subTotal = temp.reduce((sum, i) => sum + i.price * i.qty, 0);
      AsyncStorage.setItem('cartList', JSON.stringify(temp));
    },
    decrementItemCount: (state, action) => {
      const temp = [...state.cartItems];
      const index = temp.findIndex(i => i.id === action.payload.id);
      temp[index].qty--;

      state.cartItems = temp;
      state.subTotal = temp.reduce((sum, i) => sum + i.price * i.qty, 0);
      AsyncStorage.setItem('cartList', JSON.stringify(temp));
    },
  },
  //   extraReducers: {
  //     [getAllCategoriesForRestaurant.fulfilled]: (state, action) => {},
  //     [getAllCategoriesForRestaurant.rejected]: (state, action) => {},
  //     [getAllCategoriesForGrocery.fulfilled]: (state, action) => {},
  //     [getAllCategoriesForGrocery.rejected]: (state, action) => {},
  //   },
});

export const {
  saveCartItem,
  removeCartItem,
  emptyCart,
  setCart,
  incrementItemCount,
  decrementItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
