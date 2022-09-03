import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import StarRating from 'react-native-star-rating';
import {SIZES, FONTFAMILY, COLORS, FONTS, CONSTANTS} from '../constants/theme';

export default function RiderTrackingCard(props) {
  const {rider, order, customer, onChatPress, onCallPress} = props;

  return (
    <View style={styles.container}>
      <Icon
        name="time"
        type={FONTFAMILY.Ionicons}
        style={styles.clockIconStyle}
      />

      {/* ========================  RIDER NAME RATINGS IMAGE VIEW START======================== */}
      <View style={styles.mainView}>
        <View style={[styles.flexRow1, {justifyContent: 'space-between'}]}>
          <View style={styles.flexRow1}>
            <Image
              style={styles.dpStyle}
              source={{uri: CONSTANTS.API_URLS.IMAGE + rider?.image}}
            />
            <View style={{marginStart: SIZES.ten}}>
              <Text style={[FONTS.boldFont18, {color: COLORS.normal.white}]}>
                {rider?.name}
              </Text>
              <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
                Delivery Boy
              </Text>
              <Text
                style={[
                  FONTS.regularFont08,
                  {color: COLORS.normal.white, marginVertical: SIZES.five},
                ]}>
                Average Delivery Time: {order?.average_time[0]}-
                {order?.average_time[2]} mins
              </Text>
              <StarRating
                disabled
                maxStars={5}
                starSize={SIZES.fifteen - 3}
                rating={Number(rider?.ratings)}
                fullStarColor={COLORS.normal.golden}
                halfStarColor={COLORS.normal.golden}
                emptyStarColor={COLORS.normal.golden}
                starStyle={{marginRight: SIZES.five}}
                containerStyle={{
                  width: SIZES.twenty * 2,
                }}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                padding: SIZES.ten,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.ten,
                backgroundColor: COLORS.normal.cranBerry,
              }}
              onPress={onCallPress}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name="call-outline"
                style={{
                  color: COLORS.normal.white,
                  fontSize: SIZES.twenty * 1.2,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                padding: SIZES.ten,
                marginStart: SIZES.five,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.ten,
                backgroundColor: COLORS.normal.cranBerry,
              }}
              onPress={onChatPress}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name="chatbubble-outline"
                style={{
                  color: COLORS.normal.white,
                  fontSize: SIZES.twenty * 1.2,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* ========================  RIDER NAME RATINGS IMAGE VIEW END======================== */}

        <View style={styles.lineSeparator} />

        {/* ========================  DELIEVERY TIME CURRENT CITY  VIEW START======================== */}
        <View style={styles.flexRow}>
          <View style={styles.flexRow}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name="ios-timer-outline"
              style={{
                color: COLORS.normal.white,
                fontSize: SIZES.twenty * 2,
                right: 2,
              }}
            />
            <View style={{marginStart: SIZES.ten}}>
              <Text style={[FONTS.boldFont18, {color: COLORS.normal.white}]}>
                {order?.average_time[0]}-{order?.average_time[2]} mins
              </Text>
              <Text
                style={[
                  FONTS.lightFont12,
                  {color: COLORS.normal.white, marginTop: SIZES.five},
                ]}>
                Delivery Time
              </Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name="location-outline"
              style={{
                marginRight: 2,
                color: COLORS.normal.white,
                fontSize: SIZES.twenty * 2,
              }}
            />
            <View style={{flex: 1, marginStart: SIZES.ten}}>
              <Text
                numberOfLines={1}
                style={[FONTS.boldFont18, {color: COLORS.normal.white}]}>
                {customer?.address}
              </Text>
              <Text
                style={[
                  FONTS.lightFont12,
                  {color: COLORS.normal.white, marginTop: SIZES.five},
                ]}>
                Delivery Address
              </Text>
            </View>
          </View>
        </View>
        {/* ========================  DELIEVERY TIME CURRENT CITY  VIEW END======================== */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    right: 0,
    left: 0,
    position: 'absolute',
    bottom: SIZES.twenty,
    padding: SIZES.fifteen,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineSeparator: {
    height: 0.3,
    width: '100%',
    backgroundColor: COLORS.normal.white,
    marginVertical: SIZES.twenty,
  },
  mainView: {
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.primary.cherry,
  },
  clockIconStyle: {
    right: 2,
    paddingBottom: SIZES.ten,
    color: COLORS.primary.cherry,
    fontSize: SIZES.twenty * 2,
  },
  dpStyle: {
    height: SIZES.twenty * 3,
    width: SIZES.twenty * 3,
  },
});
