import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MyTouchableOpacity from './MyTouchableOpacity';
import LoadableImage from './LoadableImage';
import BackArrow from './BackArrow';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../constants';

var today = new Date();
var curHr = today.getHours();

if (curHr < 12) {
  // // console.log('good morning');
} else if (curHr < 18) {
  // // console.log('good afternoon');
} else {
  // // console.log('good evening');
}

export default function CartHeader({
  tittle,
  userName,
  isBackArrow,
  noCart,
  style,
  top,
  onProfilePressed,
}) {
  const navigation = useNavigation();
  const User = useSelector(state => state.Profile.profile);
  const {cartItems} = useSelector(state => state.Cart);

  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: Platform.OS === 'android' && top && SIZES.ten,
        },
      ]}>
      {tittle && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {isBackArrow && <BackArrow />}
          <Text
            style={[
              FONTS.semiBoldFont22,
              {color: COLORS.normal.black, textTransform: 'capitalize'},
            ]}>
            {tittle}
          </Text>
        </TouchableOpacity>
      )}

      {userName && (
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 0.8, alignItems: 'center'}}
          activeOpacity={0.7}
          onPress={onProfilePressed}>
          <View
            style={[
              STYLES.shadow,
              {
                borderRadius: SIZES.twenty * 3,
                borderColor: COLORS.primary.cherry,
                borderWidth: 1,
                elevation: 10,
              },
            ]}>
            <LoadableImage
              smallIndicator
              style={[
                {
                  height: SIZES.twenty * 2.5,
                  width: SIZES.twenty * 2.5,
                  borderRadius: SIZES.twenty * 3,
                },
              ]}
              imageStyle={[
                {
                  height: SIZES.twenty * 2.5,
                  width: SIZES.twenty * 2.5,
                  borderRadius: SIZES.twenty * 3,
                },
              ]}
              url={CONSTANTS.API_URLS.IMAGE + User?.image}
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <Text style={[FONTS.mediumFont14]}>
              {curHr < 12
                ? 'Good Morning'
                : curHr < 18
                ? 'Good Afternoon'
                : 'Good Evening'}
              , {User?.name.split(' ')[0]}!
            </Text>
            <Text
              style={[
                FONTS.regularFont10,
                {color: COLORS.normal.charcoalGrey, marginTop: SIZES.five},
              ]}>
              {curHr < 12
                ? 'Wanna start your day with something fresh and healthy?'
                : curHr < 18
                ? 'Confused deciding what to eat for lunch?\nHmm, let us help you to find out a delicious meal.'
                : curHr < 22
                ? 'Night-owl, Huh? There are many restaurants in your area.'
                : 'Evening'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {!noCart && (
        <MyTouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENS.MyCart);
          }}>
          <Icon
            name={'ios-cart'}
            type={FONTFAMILY.Ionicons}
            style={{
              fontSize: SIZES.fifteen * 2,
              color: COLORS.primary.cherry,
              marginLeft: SIZES.five * 0.25,
            }}
          />

          {cartItems.length > 0 && (
            <View style={styles.counterView}>
              <Text style={styles.counterText}>
                {cartItems.length > 9 ? '9+' : cartItems.length}
              </Text>
            </View>
          )}
        </MyTouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  style: {
    backgroundColor: 'red',
  },
  counterView: {
    right: -3,
    bottom: 0,
    height: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: SIZES.five,
    backgroundColor: COLORS.primary.cherry,
  },
  counterText: {
    fontSize: SIZES.ten,
    fontWeight: 'bold',
    color: COLORS.normal.white,
  },
});
