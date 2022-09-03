import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGES, SIZES} from '../constants';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

const Page = ({page, translateX, index}) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    // if index === 0
    // [ -PAGE_WIDTH, 0, PAGE_WIDTH]
    // [ 0, 1, 0]

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          rotate: `${progress * Math.PI}rad`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode={'contain'}
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

const CIRCLE_WIDTH = PAGE_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.fifty,
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.fifty,
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: 'absolute',
  },
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: CIRCLE_WIDTH / 2,
  },
  title: {
    textAlign: 'center',
    fontSize: SIZES.twentyFive * 1.3,
    fontWeight: '700',
    marginBottom: 15,
  },
  description: {textAlign: 'center', fontSize: 14, color: 'grey'},
});

export {PAGE_WIDTH};

export default Page;

export const PAGES = [
  {
    title: 'Find Food You Love',
    description:
      'The top of the deck has the same matching graphic in black outline and embodies an overall mellow concave.',
    source: IMAGES.FindFoodLogo,
  },
  {
    title: 'Fast Delivery',
    description: 'Fast food delivery to your home, office wherever you are',
    source: IMAGES.FastDeliveryLogo,
  },
  {
    title: 'Live Tracking',
    description:
      'Real time tracking of your food on the app once you placed the order',
    source: IMAGES.LiveTrackingLogo,
  },
];
