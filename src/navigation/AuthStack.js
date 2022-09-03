import React from 'react';
import {COLORS, FONTFAMILY, FONTS, SCREENS, SIZES} from '../constants';
import RiderLogin from '../screens/customer/Auth/Login';
import FastDelivery from '../screens/customer/Delivery/FastDelivery';
import SignUp from '../screens/customer/Auth/SignUp';
import OtpVerification from '../screens/customer/Auth/OtpVerification';
import ResetPassword from '../screens/customer/Auth/ResetPassword';
import StartUpLocation from '../screens/customer/Auth/StartUpLocation';
import OnBoarding from '../screens/customer/Auth/OnBoarding';
import Startup from '../screens/customer/Auth/StartUp';
import SelectAddress from '../screens/customer/MyAddresses/SelectAddress';
import AddLocation from '../screens/customer/MyAddresses/AddLocation';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from '../screens/customer/Auth/ForgotPassword';

export default function AuthStack() {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary.navy,
        },
        headerTitleStyle: {
          color: COLORS.normal.white,
          fontFamily: FONTFAMILY.Medium,
          fontSize: SIZES.body18,
          marginLeft: -SIZES.twentyFive,
        },
        headerTitleAlign: 'left',
      }}
      initialRouteName={SCREENS.Startup}>
      <AuthStack.Screen
        name={SCREENS.Startup}
        component={Startup}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.Login}
        component={RiderLogin}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.SignUp}
        component={SignUp}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.ResetPassword}
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.NewPassword}
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.OtpVerification}
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.RiderFastDelivery}
        component={FastDelivery}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.StartUpLocation}
        component={StartUpLocation}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.OnBoarding}
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.SelectAddress}
        component={SelectAddress}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={SCREENS.AddLocation}
        component={AddLocation}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}
