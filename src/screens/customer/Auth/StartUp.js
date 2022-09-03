import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  COLORS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';
import CustomButton from '../../../components/CustomButton';

export default function Startup({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      {/* <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={COLORS.normal.transparent}
      /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary.cherry,
          borderBottomRightRadius: SIZES.twenty,
          borderBottomLeftRadius: SIZES.twenty,
        }}>
        <Image
          style={{width: width}}
          source={IMAGES.backgroundObject}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.normal.white,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'space-evenly',
            paddingHorizontal: SIZES.fifteen,
            // backgroundColor: "red",
          }}>
          <CustomButton
            label="Log In"
            onPress={() => {
              navigation.navigate(SCREENS.Login);
            }}
          />
          <CustomButton
            label="Create an Account"
            style={styles.customBtnStyle}
            lableColor={COLORS.primary.cherry}
            onPress={() => {
              navigation.navigate(SCREENS.SignUp);
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: width * 0.4,
          width: width * 0.4,
          backgroundColor: COLORS.normal.white,
          position: 'absolute',
          alignSelf: 'center',
          top: height * 0.38,
          borderRadius: width,
        }}>
        <Image
          style={{
            height: SIZES.twenty * 9,
            width: SIZES.twenty * 9,
            top: height * 0.05,
            alignSelf: 'center',
            left: SIZES.ten,
          }}
          source={IMAGES.PorterMainLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  customBtnStyle: {
    backgroundColor: COLORS.normal.white,
    borderColor: COLORS.primary.cherry,

    borderWidth: 1,
  },
});
