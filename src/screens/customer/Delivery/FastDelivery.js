import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import CustomButton from '../../../components/CustomButton';

import {FONTS, IMAGES, SIZES, STYLES} from '../../../constants';

export default function FastDelivery() {
  return (
    <View
      style={[
        STYLES.container,
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      <Image
        source={IMAGES.FastDeliveryLogo}
        resizeMode={'contain'}
        style={{height: SIZES.fifty * 4, width: SIZES.fifty * 4}}
      />
      <View
        style={{
          marginVertical: SIZES.twentyFive * 1.5,
          alignItems: 'center',
        }}>
        <Text style={FONTS.boldFont22}>Fast Delivery</Text>
        <Text
          style={[
            FONTS.lightFont14,
            {marginTop: SIZES.fifteen * 1.5, textAlign: 'center'},
          ]}>
          Fast food delivery to your home, office{'\n'} wherever you are
        </Text>
      </View>
      <CustomButton
        label={'Next'}
        style={{marginTop: SIZES.ten}}
        onPress={
          () => {}
          //   props.navigation.dispatch(
          //     CommonActions.reset({
          //       routes: [
          //         {
          //           name: SCREENS.BottomBar,
          //         },
          //       ],
          //     }),
          //   )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
