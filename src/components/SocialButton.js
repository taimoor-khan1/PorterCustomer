import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, SIZES, FONTS} from '../constants';
import {Icon} from 'native-base';

const SocialButton = ({
  label,
  onPress,
  style,
  iconName,
  iconType,
  isBrightButton,
  bgColor,
}) => {
  return (
    <View
      style={[
        styles.loginBtnBg,
        style,
        {backgroundColor: bgColor, borderRadius: SIZES.fifty},
      ]}>
      <MyTouchableOpacity
        onPress={onPress}
        style={[
          styles.loginBtnBg,
          {
            borderRadius: SIZES.fifty,
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
          },
        ]}>
        <Icon
          name={iconName}
          type={iconType}
          style={{
            fontSize: SIZES.twenty * 1.5,
            color: COLORS.normal.white,
            position: 'absolute',
            start: SIZES.twenty * 1.5,
          }}
        />
        <Text
          style={[
            FONTS.boldFont18,
            {
              color: COLORS.normal.white,
              textAlign: 'center',
              marginStart: SIZES.fifteen,
            },
          ]}>
          {label}
        </Text>
      </MyTouchableOpacity>
    </View>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  loginBtnBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.fifty,
    width: '100%',
    height: 60,
  },
});
