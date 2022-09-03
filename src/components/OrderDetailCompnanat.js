import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ApplyPromo from '../components/modals/AddPromoModal';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
} from '../constants';
import AddNotes from '../components/modals/AddNotesModal';
import MyTouchableOpacity from './MyTouchableOpacity';
import {show, hide} from '../redux/slice/loader';
import CustomButton from './CustomButton';
import utils from '../utils';
import Row from './Row';
import {
  removeCartItem,
  incrementItemCount,
  decrementItemCount,
} from '../redux/slice/cart';

export default function OrderDetailCompnanat() {
  const dispatcher = useDispatch();
  const navigation = useNavigation();
  const {coupons} = useSelector(state => state.coupons);
  const {cartItems, subTotal} = useSelector(state => state.Cart);
  const vendor = cartItems[0]?.vendor;

  const [showApplyPromo, setshowApplyPromo] = useState(false);
  const [showAddNotes, setshowAddNotes] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState('');

  const onRemoveItem = async id => {
    await dispatcher(removeCartItem({id}));
  };

  const onIncrementCount = item => {
    dispatcher(incrementItemCount({id: item.id}));
  };

  const onDecrementCount = item => {
    if (item.qty === 1) {
      onRemoveItem(item.id);
    } else {
      dispatcher(decrementItemCount({id: item.id}));
    }
  };

  const onApplyCode = () => {
    setshowApplyPromo(false);

    if (utils.isEmptyOrSpaces(promoCode)) {
      utils.warningAlert('Please enter promo code.');
      return;
    }

    const onSuccess = ({data}) => {
      // // console.log('verify coupon res: ', data);
      if (data.status === 0) {
        utils.warningAlert(data.message);
      } else {
        const temp = (subTotal * data.data.discount) / 100;
        setDiscount(Math.round(temp));
      }
      dispatcher(hide());
      setPromoCode('');
    };

    const onFailure = error => {
      dispatcher(hide());
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      setPromoCode('');
    };

    dispatcher(show());

    axios
      .get(`${CONSTANTS.API_URLS.BASE1}${CONSTANTS.API_URLS.VERIFY_COUPON}`, {
        params: {
          voucher_code: promoCode,
        },
      })
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={{flex: 1}}>
      {/* ======================== LOGO ADDRESS RATINGS VIEW START ======================== */}

      <Row style={{marginTop: SIZES.twenty}}>
        <Image
          source={{uri: CONSTANTS.API_URLS.IMAGE + vendor?.image}}
          style={styles.restaurantImage}
        />

        <View style={{flex: 1, marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont16, {marginBottom: SIZES.ten * 0.6}]}>
            {vendor?.name}
          </Text>
          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'star'}
              type={FONTFAMILY.FontAwesome}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.primary.cherry, marginStart: SIZES.five},
              ]}>
              {Number(vendor?.ratings).toFixed(2)}
            </Text>
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.normal.brownGrey, marginStart: SIZES.five},
              ]}>
              ({vendor?.count_ratings} ratings)
            </Text>
          </Row>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.normal.brownGrey, marginVertical: SIZES.five},
            ]}>
            {vendor?.cuisine_type}
          </Text>
          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'ios-location-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                fontSize: SIZES.twenty,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              numberOfLines={1}
              style={[
                FONTS.mediumFont12,
                {
                  flex: 1,
                  color: COLORS.normal.brownGrey,
                  marginLeft: SIZES.five * 0.3,
                },
              ]}>
              {vendor?.address}
            </Text>
          </Row>
        </View>
      </Row>
      {/* ======================== LOGO ADDRESS RATINGS VIEW END ======================== */}

      {/* ======================== ORDER ITEM LIST START  ======================== */}
      <View style={{marginVertical: SIZES.fifteen}}>
        {cartItems?.map((item, index) => {
          return (
            <View key={index} style={styles.cartItemView}>
              <View style={styles.flexRow}>
                {/* <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => onRemoveItem(item.id)}>
                  <Image
                    resizeMode="contain"
                    source={IMAGES.removeIcon}
                    style={styles.removeIconStyle}
                  />
                </TouchableOpacity> */}

                <View
                  style={{
                    width: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.counterBtnStyle}
                    onPress={() => onDecrementCount(item)}>
                    <Icon
                      type={FONTFAMILY.AntDesign}
                      name="minus"
                      style={{
                        fontSize: SIZES.fifteen,
                        color: COLORS.normal.white,
                      }}
                    />
                  </TouchableOpacity>

                  <View style={styles.counterText}>
                    <Text
                      style={[
                        FONTS.mediumFont12,
                        {color: COLORS.primary.cherry},
                      ]}>
                      {item.qty}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onIncrementCount(item)}
                    style={styles.counterBtnStyle}>
                    <Icon
                      type={FONTFAMILY.AntDesign}
                      name="plus"
                      style={{
                        fontSize: SIZES.fifteen,
                        color: COLORS.normal.white,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  numberOfLines={1}
                  style={[
                    FONTS.boldFont16,
                    {color: COLORS.normal.black, marginLeft: SIZES.ten},
                  ]}>
                  {item.name}
                </Text>
              </View>

              <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
                ${item.price * item.qty}
              </Text>
            </View>
          );
        })}

        <View
          style={{
            backgroundColor: COLORS.normal.brownGrey,
            marginTop: SIZES.ten,
            height: 1,
          }}
        />

        {/* ======================== ORDER ITEM LIST START  END ======================== */}

        {/* ======================== DELIEVERY INSTRUCTION VIEW START  ======================== */}

        <View style={{marginTop: SIZES.ten}}>
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.cherry}]}>
              Promo Code
            </Text>
            <MyTouchableOpacity
              onPress={() => {
                setshowApplyPromo(true);
              }}>
              <Text
                style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
                Apply Code
              </Text>
            </MyTouchableOpacity>
          </Row>

          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.twenty,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
              Delivery Instructions
            </Text>

            <MyTouchableOpacity
              onPress={() => {
                setshowAddNotes(true);
              }}>
              <Text
                style={[FONTS.mediumFont16, {color: COLORS.primary.cherry}]}>
                <Text
                  style={[FONTS.boldFont20, {color: COLORS.primary.cherry}]}>
                  +
                </Text>{' '}
                Add Notes
              </Text>
            </MyTouchableOpacity>
          </Row>

          {note !== '' && (
            <Row
              style={{
                marginTop: SIZES.twenty,
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
                Note{' '}
              </Text>
              <Text
                style={[FONTS.mediumFont14, {flex: 0.5, textAlign: 'right'}]}>
                {note}
              </Text>
            </Row>
          )}

          <View
            style={{
              backgroundColor: COLORS.normal.brownGrey,
              height: 1,
              marginTop: SIZES.fifteen,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.fifteen,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
              Sub Total
            </Text>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.cherry}]}>
              ${subTotal}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.twenty,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
              Discount
            </Text>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.cherry}]}>
              ${discount}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: COLORS.normal.brownGrey,
              height: 1,
              marginTop: SIZES.fifteen,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
              Total
            </Text>
            <Text style={[FONTS.boldFont24, {color: COLORS.primary.cherry}]}>
              ${subTotal - discount}
            </Text>
          </View>
        </View>
        {/* ======================== DELIEVERY INSTRUCTION VIEW END  ======================== */}

        <CustomButton
          label="Check Out"
          style={{marginTop: SIZES.twentyFive * 1.2}}
          onPress={() => {
            navigation.navigate(SCREENS.CheckOut, {discount, note});
          }}
        />
      </View>

      <ApplyPromo
        visibility={showApplyPromo}
        setvisibility={setshowApplyPromo}
        onApplyCode={onApplyCode}
        setPromoCode={setPromoCode}
      />

      <AddNotes
        note={note}
        setNote={setNote}
        visibility={showAddNotes}
        setvisibility={setshowAddNotes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    height: SIZES.fifty * 1.15,
    width: SIZES.fifty * 1.15,
    borderRadius: SIZES.fifteen,
  },
  removeIconStyle: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginRight: SIZES.ten,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.ten,
  },
  counterBtnStyle: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    backgroundColor: COLORS.primary.cherry,
  },
  counterText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.five,
    backgroundColor: COLORS.normal.white,
  },
});

const OrderData = [
  {
    id: '1',
    Item: 'Beef Burger x1',
    price: '$16',
  },
  {
    id: '2',
    Item: 'Classic Burger x1',
    price: '$14',
  },
  {
    id: '3',
    Item: 'Cheese Chicken Burger x1',
    price: '',
  },
  {
    id: '4',
    Item: 'Chicken Legs Basket x1',
    price: '$17',
  },
  {
    id: '5',
    Item: 'French Fries Large x1',
    price: '$15',
  },
];
