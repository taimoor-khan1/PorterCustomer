import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {
  STYLES,
  COLORS,
  FONTS,
  SIZES,
  FONTFAMILY,
  IMAGES,
  SCREENS,
} from '../constants';
import BackArrow from './BackArrow';
export default function ScreenHeader({isBackArrow, status}) {
  return (
    <View style={{height: SIZES.twenty * 10}}>
      <ImageBackground
        source={IMAGES.pizaBackground}
        style={{height: '100%', width: '100%', justifyContent: 'center'}}
        resizeMode={'cover'}
        blurRadius={4}>
        {isBackArrow ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.twenty,
            }}>
            <BackArrow isBright />
            <Text style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}>
              Back
            </Text>
          </TouchableOpacity>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
          }}>
          <Image
            source={{
              uri: 'https://thumbs.dreamstime.com/b/print-134251601.jpg',
            }}
            style={{
              height: SIZES.twenty * 4,
              width: SIZES.twenty * 4,
              borderRadius: SIZES.twenty * 4,
            }}
          />
          <View style={{marginStart: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont18, {color: COLORS.normal.white}]}>
              Pizza Pie Me
            </Text>
            <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
              Fast Food, Pizza Experts
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: SIZES.ten,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Icon
                  name={'star'}
                  type={FONTFAMILY.Entypo}
                  style={{
                    fontSize: SIZES.twenty,
                    color: COLORS.normal.golden,
                  }}
                />
                <Text
                  style={[
                    FONTS.mediumFont10,
                    {color: COLORS.normal.white, marginStart: SIZES.five},
                  ]}>
                  4.5
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.normal.trueGreen,
                  paddingHorizontal: SIZES.ten,
                  borderRadius: SIZES.twenty,
                  paddingVertical: SIZES.five - 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginStart: SIZES.twenty,
                }}>
                <Text
                  style={[FONTS.mediumFont10, {color: COLORS.normal.white}]}>
                  {status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
