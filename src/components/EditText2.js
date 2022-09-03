import {useLinkProps} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../constants';

export default function EditText2(props) {
  const [borderColor, setBorderColor] = React.useState(COLORS.transparent);

  return (
    <TextInput
      {...props}
      //   secureTextEntry={props.password ? showText : false}
      selectionColor={COLORS.primary}
      placeholderTextColor={COLORS.mushroom}
      onFocus={() => {
        setBorderColor(COLORS.primary);
      }}
      onBlur={() => {
        setBorderColor(COLORS.transparent);
      }}
      style={[
        FONTS.mediumFont14,
        {
          height: 50,
          color: COLORS.primary,
          marginHorizontal: SIZES.five / 2,
          paddingHorizontal: SIZES.five / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
