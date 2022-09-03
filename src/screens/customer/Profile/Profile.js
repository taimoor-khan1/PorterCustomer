import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfilehHeader from '../../../components/ProfileHeader';
import CircularImage from '../../../components/CircularImage';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function Profile({navigation}) {
  const User = useSelector(state => state.Profile.profile);
  // console.log(User);

  const RenderProfileItems = ({label, info}) => {
    return (
      <View
        style={{
          marginTop: SIZES.twenty,
        }}>
        <Text
          style={[
            FONTS.lightFont14,
            {color: COLORS.primary.cherry, marginBottom: SIZES.ten},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.normal.black,
              marginTop: SIZES.five,
              marginBottom: SIZES.five,
            },
          ]}>
          {info}
        </Text>
        <View style={[STYLES.horLine, {}]} />
      </View>
    );
  };

  return (
    <View
      style={[
        {
          paddingHorizontal: SIZES.fifteen,
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.ten * 1.3
              : getStatusBarHeight(true),
        },
      ]}>
      {/* <StatusBar
        backgroundColor={COLORS.primary.navy}
        barStyle={'light-content'}
      /> */}
      <ProfilehHeader
        title={'Profile'}
        onEditeIconPressed={() => {
          navigation.navigate(SCREENS.EditProfile);
        }}
      />

      <View style={{alignItems: 'center'}}>
        <View>
          <CircularImage
            uri={CONSTANTS.API_URLS.IMAGE + User?.image}
            style={{
              borderColor: COLORS.primary.navy,
              borderWidth: 1,
              borderRadius: SIZES.twentyFive * 4,
            }}
            imageStyle={{
              height: SIZES.twentyFive * 4,
              width: SIZES.twentyFive * 4,
              borderRadius: SIZES.twentyFive * 4,
            }}
          />
        </View>
      </View>

      <View style={{flex: 1}}>
        <RenderProfileItems label={'Name'} info={User?.name} />
        <RenderProfileItems label={'Email'} info={User?.email} />
        <RenderProfileItems label={'Phone'} info={User?.phone} />
        <RenderProfileItems label={'Address'} info={User?.address} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
