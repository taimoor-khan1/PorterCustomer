import React, {useCallback} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Page, {PAGES, PAGE_WIDTH} from '../../../components/Page';
import {Icon} from 'native-base';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {COLORS, SIZES, CONSTANTS, SCREENS} from '../../../constants';

export const BACKGROUND_COLOR = '#F1F1F1';

export default function OnBoarding(props) {
  const translateX = useSharedValue(0);
  const scrollRef = useAnimatedRef();

  useFocusEffect(() => {
    AsyncStorage.setItem(CONSTANTS.CACHE_KEYS.IS_FIRST_TIME, '1');
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const onIconPress = useCallback(async () => {
    if (activeIndex.value === PAGES.length - 1) {
      props.navigation.replace(SCREENS.Startup);
    } else {
      scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.normal.white}
      />
      <Animated.ScrollView
        ref={scrollRef}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {PAGES.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={[styles.fillCenter, {flexDirection: 'row'}]}></View>
        <View style={styles.fillCenter}></View>
        <MyTouchableOpacity style={[styles.fillCenter]} onPress={onIconPress}>
          <Icon
            name="arrowright"
            type="AntDesign"
            style={{
              fontSize: SIZES.twentyFive * 2,
              color: COLORS.primary.navy,
            }}
          />
        </MyTouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: SIZES.twentyFive * 1.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
});
