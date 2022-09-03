import React, {useEffect, useRef, useState} from 'react';
import {View, Platform, StatusBar, PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS, CONSTANTS, SCREENS} from '../constants';

/* ################################### FIREBASE IMPORTS  ###################################  */
import {requestUserPermission} from '../firebase/NotificationServices';

/* ################################### REDUX IMPORTS  ###################################  */
import {useDispatch, useSelector} from 'react-redux';
import {getContents} from '../redux/slice/content';
import {getLatestOffers} from '../redux/slice/offers';
import {getAddress, profile} from '../redux/slice/profile';
import {saveAccessToken} from '../redux/slice/auth';
import {getMyOrders} from '../redux/slice/MyOrder';
import {getCoupons} from '../redux/slice/coupons';
import {setCart} from '../redux/slice/cart';
import {
  getAllCategoriesForGrocery,
  getAllCategoriesForRestaurant,
} from '../redux/slice/categories';

/* ################################### STACKS  ###################################  */
import AuthStack from './AuthStack';
import Balance from '../screens/customer/Balance/Balance';
import BottomTab from './BottomTab';
import Chat from '../screens/customer/Chat/Chat';
import CheckOut from '../screens/Checkout';
import Dessert from '../screens/customer/Dessert';
import EditProfile from '../screens/customer/Profile/EditProfile';
import ErrorView from '../components/modals/ErrorView';
import Filter from '../screens/customer/Filter';
import Home from '../screens/customer/Home/Home';
import Inbox from '../screens/Inbox';
import Loader from '../components/modals/Loader';
import LocationNotFound from '../screens/LocationNotFound/LocationNotFound';
import MyCart from '../screens/customer/Orders/MyCart';

/* ################################### OTHER SCREENS  ###################################  */
import AboutUs from '../screens/content/AboutUs';
import AddLocation from '../screens/customer/MyAddresses/AddLocation';
import MyOrders from '../screens/customer/Orders/MyOrders';
import Notifications from '../screens/customer/Notifications';
import OrderDetail from '../screens/customer/Orders/OrderDetail';
import PaymentDetail from '../screens/customer/PaymentDetail';
import Profile from '../screens/customer/Profile/Profile';
import ResturantMenu from '../screens/customer/ResturantMenu/ResturantMenu';
import SelectAddress from '../screens/customer/MyAddresses/SelectAddress';
import SingleItem from '../screens/customer/SingleItem';
import TrackMyOrder from '../screens/customer/TrackMyOrder';
import ViewAllCategory from '../screens/customer/ViewAllCategory/index';
import HelpAndSupport from '../screens/HelpAndSupport/index';

export default function MainNavigation(props) {
  const [AppLoading, setAppLoading] = useState(true);
  const [showPermission, setShowPermission] = useState(false);
  const TOKEN = useSelector(state => state.Auth.accessToken);

  const dispatcher = useDispatch();
  const mNavigation = useRef();
  const Stack = createStackNavigator();

  useEffect(async () => {
    setData();
    dispatcher(getContents(false, false));
    getUserAccessToken();
  }, [TOKEN]);

  /* GET ACCESS TOKEN FROM ASYNCSTORAGE */
  const getUserAccessToken = async () => {
    const value = await AsyncStorage.getItem(CONSTANTS.CACHE_KEYS.DEFAULT_USER);

    const accessToken = JSON.parse(value);
    if (accessToken !== null && accessToken !== undefined) {
      await dispatcher(saveAccessToken(accessToken));
      getUserProfile();
    } else {
      setTimeout(() => {
        setAppLoading(false);
      }, 2000);
    }
  };

  const setData = async () => {
    const temp = await AsyncStorage.getItem('cartList');
    const cartList = JSON.parse(temp);
    if (cartList?.length > 0) {
      await dispatcher(setCart(cartList));
    }

    await dispatcher(getLatestOffers(''));
    await dispatcher(getCoupons(''));
  };

  const getUserProfile = async () => {
    dispatcher(profile(false, false))
      .unwrap()
      .then(res => {
        // console.log('profile res: ', res.data);
        requestUserPermission(TOKEN, res.data?.records?.id);
        dispatcher(getAddress(''));

        setTimeout(() => {
          dispatcher(getMyOrders(TOKEN));
          dispatcher(getAllCategoriesForRestaurant(TOKEN));
          dispatcher(getAllCategoriesForGrocery(TOKEN));
          setAppLoading(false);
        }, 2000);
      });
  };

  const checkPlatfrom = async () => {
    if (Platform.OS === 'ios') {
      getPermissionStatus();
    } else {
      androidLocationPermission();
    }
  };

  // Get permission status for iOS
  const getPermissionStatus = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        checkStatusForIos(result);
      })
      .catch(error => {
        setShowPermission(true);
      });
  };

  // Check Permision Status if Granted then Get Location if Denied Again Put Request For Allow Location Permission
  const checkStatusForIos = async result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        setShowPermission(true);
        break;
      case RESULTS.DENIED:
        RequestPermission();
        break;
      case RESULTS.LIMITED:
        setShowPermission(true);
        break;
      case RESULTS.GRANTED:
        // getUserAccessToken();
        break;
      case RESULTS.BLOCKED:
        WhenInUseLocation();
        break;
    }
  };

  // Request For location Permision in Ios only
  const RequestPermission = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      checkStatusForIos(result);
    });
  };

  // Request For location Permision in Ios only
  const WhenInUseLocation = async () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      if (result === 'granted') {
        checkStatusForIos(result);
      } else if (result === 'blocked') {
        setShowPermission(true);
      }
    });
  };

  // Request For location Permision in android only
  const androidLocationPermission = async () => {
    const locationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (locationGranted === 'never_ask_again' || locationGranted === 'denied') {
      setShowPermission(true);
    } else {
    }
  };

  if (showPermission) {
    return (
      <View style={{flex: 1}}>
        <LocationNotFound />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />

      {AppLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.normal.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Loader visible={AppLoading} />
        </View>
      ) : (
        <>
          {/* <StatusBar/> */}
          <NavigationContainer ref={mNavigation}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: COLORS.primary.navy,
                },
              }}>
              {TOKEN === null ? (
                <Stack.Screen name={SCREENS.AuthStack} component={AuthStack} />
              ) : (
                <>
                  <Stack.Screen name={SCREENS.Home} component={Home} />
                  <Stack.Screen
                    name={SCREENS.SingleItem}
                    component={SingleItem}
                  />

                  <Stack.Screen
                    name={SCREENS.Notifications}
                    component={Notifications}
                  />
                  <Stack.Screen
                    name={SCREENS.HelpAndSupport}
                    component={HelpAndSupport}
                  />

                  <Stack.Screen name={SCREENS.Chat} component={Chat} />

                  <Stack.Screen
                    name={SCREENS.GroceryStack}
                    component={BottomTab}
                  />

                  <Stack.Screen name={SCREENS.Dessert} component={Dessert} />
                  <Stack.Screen name={SCREENS.Filter} component={Filter} />

                  <Stack.Screen name={SCREENS.MyCart} component={MyCart} />
                  <Stack.Screen name={SCREENS.MyOrders} component={MyOrders} />
                  <Stack.Screen
                    name={SCREENS.OrderDetail}
                    component={OrderDetail}
                  />
                  <Stack.Screen name={SCREENS.Inbox} component={Inbox} />
                  <Stack.Screen name={SCREENS.CheckOut} component={CheckOut} />
                  <Stack.Screen
                    name={SCREENS.ViewAllCategory}
                    component={ViewAllCategory}
                  />

                  <Stack.Screen
                    name={SCREENS.EditProfile}
                    component={EditProfile}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name={SCREENS.Profle}
                    component={Profile}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name={SCREENS.AboutUs}
                    component={AboutUs}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name={SCREENS.Balance}
                    component={Balance}
                    options={{title: 'Your Balance'}}
                  />

                  <Stack.Screen
                    name={SCREENS.ResturantMenu}
                    component={ResturantMenu}
                  />
                  <Stack.Screen
                    name={SCREENS.PaymentDetail}
                    component={PaymentDetail}
                  />
                  <Stack.Screen
                    name={SCREENS.TrackMyOrder}
                    component={TrackMyOrder}
                  />
                  <Stack.Screen
                    name={SCREENS.AddLocation}
                    component={AddLocation}
                  />
                  <Stack.Screen
                    name={SCREENS.SelectAddress}
                    component={SelectAddress}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}

      {/* Loader */}
      <Loader />

      {/* Error */}
      <ErrorView />
    </>
  );
}
