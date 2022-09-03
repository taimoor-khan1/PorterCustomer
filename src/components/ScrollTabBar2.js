import React from 'react';
import {Text, Dimensions} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../constants';

const {width, height} = Dimensions.get('window');

export function ScrollTabBar2(props) {
  return (
    <TabBar
      {...props}
      scrollEnabled={true}
      pressOpacity={0.85}
      labelStyle={FONTS.mediumFont14}
      pressColor={COLORS.primary.cherry}
      activeColor={COLORS.primary.cherry}
      inactiveColor={COLORS.normal.brownGrey}
      style={{backgroundColor: COLORS.normal.white}}
      tabStyle={{width: 'auto', paddingHorizontal: SIZES.twentyFive}}
      indicatorStyle={{backgroundColor: COLORS.primary.cherry}}
      renderLabel={({route, focused, color}) => (
        <Text
          numberOfLines={1}
          style={[
            {
              fontSize: SIZES.body10,
              textTransform: 'capitalize',
              fontFamily: FONTFAMILY.Medium,
              color: focused
                ? COLORS.primary.cherry
                : COLORS.normal.charcoalGrey,
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );
}
