import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {COLORS, SIZES} from '../constants';

const OnBoardingDot = ({activeDotIndex, index}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;
    return {
      backgroundColor: withTiming(isActive ? 'black' : 'white', {
        duration: 150,
      }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {backgroundColor: activeDotIndex.value === index ? 'black' : 'white'},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: SIZES.twenty,
    height: SIZES.twenty,
    marginHorizontal: SIZES.five,
    borderRadius: SIZES.ten,
    borderWidth: 1,
  },
});

export default OnBoardingDot;
