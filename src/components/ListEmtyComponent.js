import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, height} from '../constants';

export default function ListEmtyComponent(props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: height / 2,
      }}>
      <Text
        style={[FONTS.mediumFont12, {color: COLORS.primary.cherrywithOpacity}]}>
        {props.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
