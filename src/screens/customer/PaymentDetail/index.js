import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import CartHeader from '../../../components/CartHeader';
import PaymentCardComponant from '../../../components/PaymentCardComponant';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function PaymentDetail({navigation}) {
  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <CartHeader tittle={'Payment Details'} isBackArrow noCart />
      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.boldFont18]}>Customize your payment method</Text>

        <View style={styles.viewStyle} />

        <PaymentCardComponant
          onCardPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.btnContainer}>
        <Icon
          name={'plus'}
          type={FONTFAMILY.Entypo}
          style={{
            color: COLORS.normal.white,
            fontSize: SIZES.twenty,
          }}
        />
        <Text style={[FONTS.boldFont18, styles.btnText]}>
          Add another Credit/Debit Card
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    height: 0.3,
    marginTop: SIZES.twenty,
  },
  btnContainer: {
    height: height * 0.07,
    bottom: height * 0.08,
    left: SIZES.fifteen,
    right: SIZES.fifteen,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.fifty,
    backgroundColor: COLORS.primary.cherry,
  },
  btnText: {
    textAlign: 'center',
    color: COLORS.normal.white,
  },
});
