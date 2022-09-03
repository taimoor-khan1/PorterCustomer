import {Icon} from 'native-base';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTS, IMAGES, SIZES} from '../constants';
import Card from './Card';
import Row from './Row';
import UserImageWithCrown from './UserImageWithCrown';

export default function NearbyItem(props) {
  const inputRange = [];
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <Card
        style={{
          backgroundColor: COLORS.paleGrey,
          paddingVertical: SIZES.ten,
          margin: SIZES.fifteen,
          borderRadius: SIZES.fifteen,
        }}>
        <Row style={{marginHorizontal: SIZES.fifteen, alignItems: 'center'}}>
          <UserImageWithCrown style={{}} />
          <Text
            style={[
              FONTS.mediumFont12,
              {flex: 1, color: COLORS.black, marginHorizontal: SIZES.ten},
            ]}>
            Ms. Jennifer
          </Text>

          <Row>
            <Image
              source={IMAGES.IconStarRed}
              style={{
                height: SIZES.twentyWidth * 0.9,
                width: SIZES.twentyWidth * 0.9,
              }}
            />
            <Text
              style={[
                FONTS.lightFont12,
                {color: COLORS.brownGrey, marginLeft: SIZES.five},
              ]}>
              4.0
            </Text>
          </Row>
        </Row>

        <Row
          style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.fifteen,
            marginTop: SIZES.ten,
            paddingVertical: SIZES.ten,
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                backgroundColor: '#ffe2e8',
                alignItems: 'center',
                paddingVertical: SIZES.five / 2,
                borderTopRightRadius: SIZES.ten,
                borderBottomRightRadius: SIZES.ten,
              }}>
              <Text style={[FONTS.mediumFont10, {color: COLORS.primary1}]}>
                Party
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: SIZES.ten * 0.7,
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={3}
                style={[
                  FONTS.mediumFont10,
                  {color: COLORS.black, textAlign: 'center'},
                ]}>
                Party Photoshop Inspiration
              </Text>
              <Text style={[FONTS.lightFont10, {color: COLORS.brownGrey}]}>
                23 mins ago
              </Text>
              <Text
                style={[
                  FONTS.lightFont08,
                  {
                    color: COLORS.primary1,
                    marginTop: SIZES.twenty,
                    textAlign: 'center',
                  },
                ]}>
                New York, USA
              </Text>
            </View>
          </View>
          <ImageBackground
            resizeMode={'cover'}
            source={IMAGES.ImageParty}
            style={{
              height: SIZES.fiftyWidth * 3.8,
              flex: 1,
              marginHorizontal: SIZES.five,
            }}
            imageStyle={{
              borderRadius: SIZES.fifteen,
            }}>
            <Row
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.45)',
                paddingHorizontal: SIZES.ten,
                alignSelf: 'baseline',
                position: 'absolute',
                bottom: SIZES.ten,
                alignItems: 'center',
                right: SIZES.ten,
                borderRadius: SIZES.twenty,
              }}>
              <Text style={[FONTS.lightFont08, {color: COLORS.white}]}>
                12k
              </Text>
              <Icon
                name={'ios-bookmark-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.twentyWidth * 0.6,
                  marginLeft: SIZES.five,
                }}
              />
            </Row>
          </ImageBackground>
        </Row>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
