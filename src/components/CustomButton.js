/* @flow weak */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, SIZES, FONTS} from '../constants';

const CustomButton = ({label, onPress, style, icon, lableColor, disabled}) => {
  return (
    <MyTouchableOpacity
      style={[styles.loginBtnBg, style, {}]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          FONTS.boldFont18,
          {
            color: lableColor ? lableColor : COLORS.normal.white,
            textAlign: 'center',
          },
        ]}>
        {label}
      </Text>
    </MyTouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginBtnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.fifty,
    height: 60,
    backgroundColor: COLORS.primary.cherry,
    width: '100%',
  },
});
