import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import Row from '../../../components/Row';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';

export default function StartUpLocation({navigation}) {
  const isFirstTime = AsyncStorage.getItem(CONSTANTS.CACHE_KEYS.IS_FIRST_TIME);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
        paddingHorizontal: SIZES.fifteen,
      }}>
      <Image
        source={IMAGES.loactionIcon}
        style={{
          height: SIZES.twenty * 10,
          width: SIZES.twenty * 10,
        }}
        resizeMode={'contain'}
      />
      <Text
        style={[
          {
            fontFamily: FONTFAMILY.Medium,
            fontSize: SIZES.h24 * 1.9,
            color: COLORS.normal.charcoalGrey,
          },
        ]}>
        Porter
      </Text>
      <Text
        style={[
          {
            fontFamily: FONTFAMILY.Medium,
            fontSize: SIZES.body12,
            color: COLORS.normal.charcoalGrey,
            marginTop: SIZES.ten,
          },
        ]}>
        Fastest Delivery at Anywhere
      </Text>
      <CustomButton
        style={{marginTop: SIZES.twenty}}
        label={'Use my current location '}
        onPress={() => {
          Number(isFirstTime) === 0
            ? navigation.navigate(SCREENS.OnBoarding)
            : navigation.navigate(SCREENS.Startup);
        }}
      />
      <CustomButton
        style={{
          marginTop: SIZES.twenty,
          backgroundColor: COLORS.normal.transparent,
          borderWidth: 1,
          borderColor: COLORS.primary.cherry,
        }}
        label={'My address'}
        lableColor={COLORS.primary.cherry}
        onPress={() => {
          navigation.navigate(SCREENS.SelectAddress);
        }}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Image
          style={{width: width, height: SIZES.twenty * 9}}
          source={IMAGES.buildingBg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
