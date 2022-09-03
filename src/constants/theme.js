import {Dimensions, Platform, StyleSheet} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

export const {width, height} = Dimensions.get('window');

/* *************** Colors ********** */

export const COLORS = {
  primary: {
    navy: '#001e3e',
    cherry: '#dd003e',
    cherrywithOpacity: '#dd003e66',
  },

  normal: {
    black: '#000000',
    white: '#ffffff',
    charcoalGrey: '#4a4b4d',
    brownGrey: '#949494',
    blue: '#0037c1',
    brightYellow: '#fcf400',
    golden: '#FFD700',
    veryLightPink: '#d5d5d5',
    halfpwhite: '#eeeeee',
    transparent: 'transparent',
    naviWithOpacity: 'rgba(0,30,62,0.4)',
    trueGreen: '#1eaf08',
    cranBerry: '#ab0030',
    greenishBlack: '#2b2b2b',
  },
};

const appTheme = {COLORS};

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: 'Metropolis-Light',
  Medium: 'Metropolis-Medium',
  Regular: 'Metropolis-Regular',
  SemiBold: 'Metropolis-SemiBold',
  Bold: 'Metropolis-Bold',
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
  EvilIcons: 'EvilIcons',
  Entypo: 'Entypo',
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Fontisto: 'Fontisto',
  FontAwesome5: 'FontAwesome5',
  Foundation: 'Foundation',
};

/* * Images * */
export const IMAGES = {
  iconArrowDown: require('../assets/IconArrowDown.png'),
  DeliveryFeeIcon: require('../assets/DeliveryFeeIcon.png'),
  FastDeliveryLogo: require('../assets/FastDeliveryLogo.png'),
  identyCard: require('../assets/identyCard.png'),
  bycke: require('../assets/bycke.png'),
  pizaBackground: require('../assets/Piza.jpg'),
  visalogo: require('../assets/visa-logo.png'),
  paypal: require('../assets/paypal.png'),
  deliveryManMarker: require('../assets/deliveryManMarker.png'),
  restaurantMapMarker: require('../assets/restaurantMapMarker.png'),
  user: require('../assets/user.png'),
  groceryIcon: require('../assets/groceryIcon.png'),
  loactionIcon: require('../assets/loactionIcon.png'),
  buildingBg: require('../assets/buildingBg.png'),
  FindFoodLogo: require('../assets/FindFoodLogo.png'),
  LiveTrackingLogo: require('../assets/LiveTrackingLogo.png'),
  user1: require('../assets/user1.png'),
  foodDelievery: require('../assets/foodDelievery.png'),
  groceryImage: require('../assets/groceryImage.png'),
  pickUpIcon: require('../assets/pickUpIcon.png'),
  pizaImage: require('../assets/pizaImage.png'),
  triangleImage: require('../assets/triangleImage.png'),
  PizaPieLogo: require('../assets/PizaPieLogo.png'),
  backgroundObject: require('../assets/backgroundObject.png'),
  PorterMainLogo: require('../assets/PorterMainLogo.png'),
  piza2: require('../assets/piza2.png'),
  ThankyouModalimage: require('../assets/ThankyouModalimage.png'),
  Loader: require('../assets/Loader.gif'),
  Loader1: require('../assets/Loader1.gif'),
  noWifi: require('../assets/no-wifi.png'),
  removeIcon: require('../assets/remove-icon.png'),
  basket: require('../assets/shopping-basket.png'),
};

/* * Screens * */
export const SCREENS = {
  /* * Auth  Screens * */
  Splash: 'Splash',
  TermsAndConditions: 'TermsAndConditions',
  ResetPassword: 'ResetPassword',
  NewPassword: 'NewPassword',
  OtpVerification: 'Verification',
  Faqs: 'Faqs',
  Login: 'Login',
  SignUp: 'SignUp',
  StartUpLocation: 'StartUpLocation',
  OnBoarding: 'OnBoarding',
  Startup: 'Startup',
  SelectAddress: 'SelectAddress',
  AddLocation: 'AddLocation',
  /* * Other Screens * */

  BottomTab: 'BottomTab',
  DrawerNavigation: 'DrawerNavigation',
  Settings: 'Settings',
  AuthStack: 'AuthStack',
  Profle: 'Profle',
  EditProfile: 'RiderEditProfile',
  Notifications: 'Notifications',
  HelpAndSupport: 'HelpAndSupport',
  NewOrder: 'New Order',
  PastOrders: 'Past Order',
  Home: 'Home',
  More: 'More',
  Chat: 'RiderChat',
  Balance: 'RiderBalance',
  RiderFastDelivery: 'RiderFastDelivery',
  VehicleVerification: 'VehicleVerification',
  BankInformation: 'BankInformation',
  OnBoarding: 'OnBoarding',
  Dessert: 'Dessert',
  HomeCategory: 'HomeCategory',
  Menu: 'Menu',
  SingleItem: 'SingleItem',
  MyCart: 'MyCart',
  MyOrders: 'MyOrders',
  OrderDetail: 'OrderDetail',
  Inbox: 'Inbox',
  CheckOut: 'CheckOut',
  Offers: 'Offers',
  GroceryStack: 'GroceryStack',
  PickUpStack: 'PickUpStack',
  DelieveryStack: 'DelieveryStack',
  Filter: 'Filter',
  AboutUs: 'AboutUs',
  ResturantMenu: 'ResturantMenu',
  PaymentDetail: 'PaymentDetail',
  TrackMyOrder: 'TrackMyOrder',
  ViewAllCategory: 'ViewAllCategory',
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.normal.black,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.normal.black,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.normal.black,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.normal.black,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.normal.black,
  },
  semiBoldFont08: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.body08,
    color: COLORS.normal.black,
  },
  semiBoldFont10: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.body10,
    color: COLORS.normal.black,
  },
  semiBoldFont16: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h16,
    color: COLORS.normal.black,
  },
  semiBoldFont18: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h18,
    color: COLORS.normal.black,
  },
  semiBoldFont20: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h20,
    color: COLORS.normal.black,
  },
  semiBoldFont22: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h22,
    color: COLORS.normal.black,
  },
  semiBoldFont24: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h24,
    color: COLORS.normal.black,
  },
  mediumFont10: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10},
  mediumFont12: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12},
  mediumFont14: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14},
  mediumFont16: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16},
  mediumFont18: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18},
  regularFont08: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body08},
  regularFont10: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body10},
  regularFont12: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body12},
  regularFont14: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body14},
  regularFont16: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body16},
  regularFont18: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body18},
  lightFont08: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08},
  lightFont10: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10},
  lightFont12: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12},
  lightFont14: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14},
  lightFont16: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16},
  lightFont18: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18},
};

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: COLORS.normal.white,
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? SIZES.twentyFive * 1.7
        : getStatusBarHeight(true),
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: 'center',
  },
  loginView: {
    flex: 1,
    width: '100%',
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 2,
    color: COLORS.normal.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.normal.black,
  },
  drawerItem: {
    paddingHorizontal: SIZES.fifteen + 3,
    paddingVertical: SIZES.fifteen,
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.normal.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.5,
    backgroundColor: COLORS.normal.brownGrey,
  },
  shadow: {
    backgroundColor: COLORS.normal.white,
    shadowColor: COLORS.normal.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 5,
  },
});

export const CONSTANTS = {
  Grocery: 'grocery',
  FoodDelievery: 'foodDelievery',
  PickUp: 'PickUp',

  REDUX_ACTIONS: {
    ACCESSTOKEN: 'ACCESSTOKEN',
    LOGIN: 'LOGIN',
    AUTHENTICATE: 'AUTHENTICATE',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',

    SELECTEDSECTION: 'SELECTEDSECTION',
    PICKUP: 'PICKUP',
    GROCERY: 'GROCERY',
    DELIEVERY: 'DELIEVERY',
    SHOWALTER: 'SHOWALTER',
    SHOW_ERROR: 'SHOW_ERROR',
    SHOW_LOADER: 'SHOW_LOADER',
  },

  API_URLS: {
    BASE: 'http://porter.reignsol.net/api/v1/customer/',
    BASE1: 'http://porter.reignsol.net/api/v1/',
    IMAGE: 'http://porter.reignsol.net/',

    LOGIN: 'login',
    GOOGLe_SIGN_UP: 'social/google',
    FACEBOOK_SIGN_UP: 'social/facebook',
    APPLE_SIGN_UP: 'social/apple',
    LOGOUT: 'sign-out',
    SIGN_UP: 'register',
    VERIFY_OTP: 'verify-otp',
    RESEND_OTP: 'resend-otp',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    CHANGE_PASSWORD: 'change-password',
    GET_PROFILE: 'getProfile',
    UPDATE_PROFILE: 'update-profile',
    GET_CONTENT: 'contents',
    GET_ALL_CATEGORIES: 'items/getAllCategories',
    GET_ALL_CATEGORIES_RESTAURANT: 'items/getRestaurantCategories',
    GET_ALL_CATEGORIES_GROCERY: 'items/getGroceryCategories',
    GET_ITEMS_BY_CATEGORIES: 'items/getByCategory?',
    GET_RECENT_ITEMS: 'items/getRecentItems?type=',
    GET_ALL_EXPERTISE: 'items/getAllExpertise',
    GET_LATEST_OFFERS: 'items/latest-offers',
    GET_FILTERS: 'items/get-filters',
    APPLY_FILTERS: 'items/search-filter',
    GET_HOME_DATA: 'customer/home?type=',
    DELIVERY_COST: 'delivery-cost',
    COUPONS: 'coupons',
    VERIFY_COUPON: 'coupons/verify-coupon',
    PLACE_ORDER: 'orders/place',
    GET_PAST_ORDER: 'orders/past-orders',
    GET_ADDRESS: 'address',
    ADD_ADDRESS: 'address/add',
    GET_ORDER_DETAIL: 'orders/getOrderDetails',
    GET_COORDINATES: 'rider/getCoordinate',
    SAVEDEVICETOKEN: 'saveDeviceToken',
    NOTIFICATIONS: 'notification',
    DELETE_NOTIFICATION: 'notification/delete',
  },

  /* * FirebaseConstants * */
  FIREBASE: {
    CHAT: 'Chat',
    MESSAGES: 'messages',
    USERS: 'Users',
    CHATHEADS: 'ChatHeads',
    READ: 'read',
    TOKEN: 'Tokens',
    FCM: 'https://fcm.googleapis.com/fcm/send',
  },

  DESTINATIONS: {
    SIGN_UP: 'sign_up',
    FORGOT_PASSWORD: 'forgot_password',
  },

  CACHE_KEYS: {
    DEFAULT_USER: 'access_token',
    IS_FIRST_TIME: 'is_first_time',
  },
};
