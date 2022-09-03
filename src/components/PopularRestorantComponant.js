import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
  height,
  width,
  CONSTANTS,
} from '../constants';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Icon} from 'native-base';
import MyTouchableOpacity from './MyTouchableOpacity';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LoadableImage from './LoadableImage';

export default function PopularRestorantComponant({item}) {
  const navigation = useNavigation();
  return (
    <MyTouchableOpacity
      onPress={() => {
        navigation.navigate(SCREENS.ResturantMenu, {data: item});
      }}>
      <LoadableImage
        style={{
          height: Platform.OS === 'android' ? height * 0.3 : height * 0.23,
          width: width,
          // marginTop: SIZES.five,
        }}
        imageStyle={{
          height: Platform.OS === 'android' ? height * 0.3 : height * 0.23,
          width: width,
          // marginTop: SIZES.five,
        }}
        url={CONSTANTS.API_URLS.IMAGE + item.image}
        resizeMode="cover"
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: SIZES.fifteen,
          paddingVertical: SIZES.ten,
        }}>
        <Text
          style={[
            FONTS.semiBoldFont18,
            {color: COLORS.normal.black, textTransform: 'capitalize'},
          ]}>
          {item.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.five,
            }}>
            <Icon
              type={FONTFAMILY.Entypo}
              name={'star'}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              style={[
                FONTS.regularFont12,
                {color: COLORS.primary.cherry, marginStart: SIZES.five - 2},
              ]}>
              {Number(item.ratings).toFixed(1)}
            </Text>
          </View>
          <Text
            style={[
              FONTS.mediumFont10,
              {color: COLORS.normal.brownGrey, marginStart: SIZES.ten},
            ]}>
            Cakes by Tella Desserts
          </Text>
        </View>
      </View>
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({});
