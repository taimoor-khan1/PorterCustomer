import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTS, SCREENS, SIZES} from '../constants';

import Dessert from '../screens/customer/Dessert';
import {DrawerActions} from '@react-navigation/routers';
import HomeCategory from '../screens/customer/Home/HomeCategory';
import {Icon} from 'native-base';
import Menu from '../screens/customer/Menue/index';
import More from '../screens/More';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import NewOrders from '../screens/customer/Orders/NewOrders';
import Notifications from '../screens/customer/Notifications';
import Offers from '../screens/customer/Offers';
import PastOrders from '../screens/customer/Orders/PastOrders';
import Profile from '../screens/customer/Profile/Profile';
import React from 'react';
import {STYLES} from '../constants/theme';
import {TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  const RendorHomeScreen = () => {
    const SelectedCategroy = 'PickUp';

    if (SelectedCategroy === 'PickUp') {
      return <HomeCategory />;
    } else {
      return <HomeCategory />;
    }
  };

  const CustomText = ({isFocused, label}) => {
    return (
      <Text
        style={[
          FONTS.mediumFont10,
          {
            color:
              label === 'Home'
                ? COLORS.normal.transparent
                : isFocused
                ? COLORS.primary.cherry
                : COLORS.normal.brownGrey,
            marginBottom: SIZES.ten,
          },
        ]}>
        {label}
      </Text>
    );
  };

  const CenterCustomIcon = ({
    isFocused,
    type,
    seletedIcon,
    unSelectedIcon,
    cart,
  }) => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            backgroundColor: COLORS.primary.cherry,
            padding: SIZES.twenty,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999999999,
            position: 'absolute',
            borderRadius: SIZES.fifty,
            bottom: SIZES.five,
          },
        ]}>
        <Icon
          name={isFocused ? seletedIcon : unSelectedIcon}
          type={type}
          style={{
            color: COLORS.normal.white,
            fontSize: SIZES.h24 * 1.2,

            // marginTop: 5,
          }}
        />
      </View>
    );
  };

  const CustomIcon = ({isFocused, type, seletedIcon, unSelectedIcon, cart}) => {
    return (
      <Icon
        name={isFocused ? seletedIcon : unSelectedIcon}
        type={type}
        style={{
          color: isFocused ? COLORS.primary.cherry : COLORS.normal.brownGrey,
          fontSize: SIZES.h24 * 1.2,

          // marginTop: 5,
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        tabBarShowLabel: true,
        anmationEnabled: true,
        lazy: true,
        unmountOnBlur: true,
        headerStyle: {backgroundColor: COLORS.primary.navy},

        headerTitleStyle: {
          color: COLORS.normal.white,
          fontFamily: FONTFAMILY.Medium,
          fontSize: SIZES.h22,
        },
        ...TransitionPresets.SlideFromRightIOS,
        tabBarStyle: {
          height: SIZES.twentyFive * 3,
          elevation: 0, // this solved the triangle type view problem in android
          backgroundColor: COLORS.normal.white,
          paddingBottom: Platform.OS === 'ios' ? 15 : 0,
          // position: 'absolute',
          // bottom: 0,
        },
      }}
      initialRouteName={SCREENS.HomeCategory}>
      <Tab.Screen
        name={SCREENS.Menu}
        component={Menu}
        options={{
          headerShown: false,
          keyboardHidesTabBar: true,
          tabBarLabel: ({focused, color}) => (
            <CustomText isFocused={focused} label={'Menu'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <CustomIcon
              isFocused={focused}
              type={FONTFAMILY.Ionicons}
              seletedIcon={'md-apps-sharp'}
              unSelectedIcon={'md-apps-sharp'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.Offers}
        component={Offers}
        options={{
          keyboardHidesTabBar: true,
          tabBarLabel: ({focused, color}) => (
            <CustomText isFocused={focused} label={'Offers'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <CustomIcon
              isFocused={focused}
              type={FONTFAMILY.FontAwesome}
              seletedIcon={'shopping-bag'}
              unSelectedIcon={'shopping-bag'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.HomeCategory}
        component={HomeCategory}
        options={{
          keyboardHidesTabBar: true,
          tabBarLabel: ({focused, color}) => {
            return <CustomText isFocused={focused} label={'Home'} />;
          },

          tabBarIcon: ({color, focused}) => {
            return (
              <CenterCustomIcon
                isFocused={focused}
                type={FONTFAMILY.Ionicons}
                seletedIcon={'ios-home-sharp'}
                unSelectedIcon={'ios-home-sharp'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={SCREENS.Profle}
        component={Profile}
        options={{
          keyboardHidesTabBar: true,
          tabBarLabel: ({focused, color}) => (
            <CustomText isFocused={focused} label={'Profile'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <CustomIcon
              isFocused={focused}
              type={FONTFAMILY.FontAwesome5}
              seletedIcon={'user'}
              unSelectedIcon={'user'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.More}
        component={More}
        options={{
          keyboardHidesTabBar: true,
          tabBarLabel: ({focused, color}) => (
            <CustomText isFocused={focused} label={'More'} />
          ),
          tabBarIcon: ({color, focused}) => (
            <CustomIcon
              isFocused={focused}
              type={FONTFAMILY.AntDesign}
              seletedIcon={'menufold'}
              unSelectedIcon={'menufold'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
