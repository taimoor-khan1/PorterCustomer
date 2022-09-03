import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from './slice/auth';
import CategoriesReducer from './slice/categories';
import ContentReducer from './slice/content';
import ErrorReducer from './slice/error';
import HomeReducer from './slice/home';
import LoaderReducer from './slice/loader';
import ProfileReducer from './slice/profile';
import NetworkReducer from './slice/network';
import CartReducer from './slice/cart';
import CouponsReducer from './slice/coupons';
import OffersReducer from './slice/offers';
import filterReducer from './slice/filter';
import MyOrderReducer from './slice/MyOrder';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['Loader'],
};

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Loader: LoaderReducer,
  Error: ErrorReducer,
  Profile: ProfileReducer,
  Home: HomeReducer,
  content: ContentReducer,
  categories: CategoriesReducer,
  network: NetworkReducer,
  Cart: CartReducer,
  coupons: CouponsReducer,
  latestOffers: OffersReducer,
  filter: filterReducer,
  MyOrders: MyOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
