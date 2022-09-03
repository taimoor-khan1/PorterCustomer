import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {STYLES, SIZES, FONTS, COLORS} from '../../constants/theme';
import CartHeader from '../../components/CartHeader';
import {useSelector} from 'react-redux';

export default function AboutUs() {
  const AboutApp = useSelector(state => state.content.Content);
  // // console.log('asdasadasdaads ========>>>>>> ', AboutApp);
  const RendorAboutApp = ({paragraph}) => {
    return (
      <View style={{flexDirection: 'row', marginTop: SIZES.ten}}>
        <View
          style={{
            height: SIZES.ten,
            width: SIZES.ten,
            borderRadius: SIZES.ten,
            backgroundColor: COLORS.primary.cherry,
            top: SIZES.five,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {
                textAlign: 'left',
                lineHeight: SIZES.twenty,
                marginStart: SIZES.ten,
              },
            ]}>
            {paragraph ||
              ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.`}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView
      style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      bounces={false}>
      <CartHeader tittle={'About Us'} isBackArrow noCart />
      <View style={{marginTop: SIZES.twenty}}>
        <RendorAboutApp paragraph={AboutApp.about_us_paragraph_a} />
        <RendorAboutApp paragraph={AboutApp.about_us_paragraph_b} />
        <RendorAboutApp paragraph={AboutApp.about_us_paragraph_c} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
