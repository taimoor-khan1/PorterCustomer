import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CartHeader from '../../../components/CartHeader';
import OrderDetailCompnanat from '../../../components/OrderDetailCompnanat';
import {COLORS, FONTS, IMAGES, SIZES, STYLES} from '../../../constants';

export default function MyCart({navigation}) {
  const {cartItems} = useSelector(state => state.Cart);

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      {/* <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary.cherry}
      /> */}
      <CartHeader tittle={'My Cart'} isBackArrow noCart />

      {cartItems.length > 0 ? (
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SIZES.fifty}}>
          <OrderDetailCompnanat />

          {/* <QRCode value="http://awesome.link.qr" /> */}
        </ScrollView>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Image
            resizeMode="contain"
            source={IMAGES.basket}
            style={styles.imgStyle}
          />
          {/* <Text style={FONTS.boldFont20}>No Internet</Text> */}
          <Text style={FONTS.boldFont22}>Hungry?</Text>
          <Text style={[FONTS.mediumFont12, styles.textStyle]}>
            You haven't added anything to your cart!
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btnContainer}
            onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Browse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.normal.white,
  },
  imgStyle: {
    height: SIZES.fifty * 2,
    width: SIZES.fifty * 2,
    marginBottom: SIZES.fifteen,
    tintColor: COLORS.primary.cherry,
  },
  textStyle: {
    marginTop: 5,
    textAlign: 'center',
  },
  btnContainer: {
    height: 30,
    marginTop: 20,
    borderRadius: 6,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary.cherry,
  },
  btnText: {
    fontSize: SIZES.fifteen,
    fontWeight: 'bold',
    color: COLORS.normal.white,
  },
});
