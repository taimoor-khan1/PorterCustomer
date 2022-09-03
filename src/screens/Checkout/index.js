import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import PaymentModal from '../../components/modals/PaymentModal';
import ThankyouModal from '../../components/modals/ThankyouModal';
import CartHeader from '../../components/CartHeader';
import {hide, show} from '../../redux/slice/loader';
import {emptyCart} from '../../redux/slice/cart';
import utils from '../../utils';
import {
  STYLES,
  FONTFAMILY,
  COLORS,
  SIZES,
  FONTS,
  SCREENS,
  CONSTANTS,
} from '../../constants/theme';

export default function CheckOut({navigation, route}) {
  const dispatcher = useDispatch();
  const {discount, note} = route?.params;
  const user = useSelector(state => state.Profile.profile);
  const {selectedAddress} = useSelector(state => state.Profile);
  const {cartItems, subTotal} = useSelector(state => state.Cart);
  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  const token = useSelector(state => state.Auth.accessToken);

  const [payOption, setpayOption] = useState('onCash');
  const [showModal, setshowModal] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [orderData, setOrderData] = useState(null);

  const [isPaymentModal, setIsPaymentModal] = React.useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (selectedAddress) {
        calculateDeliveryCost();
      }
    });
  }, [navigation, selectedAddress]);

  const calculateDeliveryCost = () => {
    const onSuccess = ({data}) => {
      console.log('delivery cost response: ', data);
      setDeliveryCost(data.delivery_cost);
    };

    const onFailure = error => {
      console.log('delivery cost error: ', error);
      console.log('delivery cost error: ', error.response);
      let err = utils.showResponseError(error);
      // utils.errorAlert(err);
    };

    const data = {
      userID: user?.id,
      address_id: selectedAddress?.id,
      vendorID: cartItems[0]?.vendor?.id,
    };

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.DELIVERY_COST}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const onSendOrder = () => {
    if (selectedAddress?.id === undefined) {
      utils.warningAlert('Please select delivery address.');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('send order response: ', data);
      setOrderData(data.data.id);
      dispatcher(hide());

      setUrl(
        `http://porter.reignsol.net/api/v1/customer/ligdi/${data.data.id}`,
      );
      // setthankYou(true);
      setTimeout(() => {
        setIsPaymentModal(true);
      }, 350);
    };

    const onFailure = error => {
      console.log('send order error: ', error.response);
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      dispatcher(hide());
    };

    const data = {
      card_id: '',
      note: note,
      item: cartItems,
      discount: discount,
      delivery_cost: deliveryCost,
      address_id: selectedAddress?.id,
      [SELECTEDSECTION === CONSTANTS.FoodDelievery
        ? 'restaurant_id'
        : 'grocery_id']: cartItems[0]?.vendor?.id,
      payment_method: 'card',
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE1}${CONSTANTS.API_URLS.PLACE_ORDER}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const RendorRow = ({color, fonts, rightText, leftText, style}) => {
    return (
      <View
        style={[
          style,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: SIZES.ten,
          },
        ]}>
        <Text style={[fonts ? fonts : FONTS.mediumFont16]}>{leftText}</Text>
        <Text
          style={[
            FONTS.boldFont16,
            {color: color ? color : COLORS.normal.black},
          ]}>
          {rightText}
        </Text>
      </View>
    );
  };

  const RendorPaymentMethood = ({onPress, image, description, type}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: SIZES.twenty,
        }}>
        {image ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={image}
              style={{height: SIZES.twenty * 2, width: SIZES.twenty * 2}}
              resizeMode="contain"
            />
            <Text style={[FONTS.mediumFont12]}>{description}</Text>
          </View>
        ) : (
          <View>
            <Text style={[FONTS.mediumFont14]}>Cash on delivery</Text>
            <Text
              style={[
                FONTS.semiBoldFont10,
                {color: COLORS.normal.charcoalGrey, marginTop: SIZES.five},
              ]}>
              order amount cannot exceed 20 $
            </Text>
          </View>
        )}

        <TouchableOpacity style={{}} onPress={onPress} activeOpacity={0.7}>
          <Icon
            type={FONTFAMILY.MaterialCommunityIcons}
            name={type === payOption ? 'radiobox-marked' : 'radiobox-blank'}
            style={{color: COLORS.primary.cherry}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  console.log(selectedAddress);
  return (
    <>
      <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
        <CartHeader tittle={'Check Out'} noCart isBackArrow top />

        <View style={{flex: 1}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.normal.brownGrey, marginTop: SIZES.twenty},
            ]}>
            Delivery Address
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.twenty,
              marginBottom: SIZES.twentyFive,
            }}>
            <Text
              style={[
                FONTS.semiBoldFont16,
                {
                  flex: 1,
                  color: COLORS.normal.black,
                  textTransform: 'capitalize',
                },
              ]}>
              {selectedAddress?.address}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(SCREENS.SelectAddress);
              }}>
              <Text
                style={[FONTS.semiBoldFont16, {color: COLORS.primary.cherry}]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.twenty,
          }}>
          <Text
            style={[FONTS.mediumFont14, {color: COLORS.normal.charcoalGrey}]}>
            Payment method
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(SCREENS.PaymentDetail)}>
            <Text
              style={[FONTS.semiBoldFont16, {color: COLORS.primary.cherry}]}>
              + Add Card
            </Text>
          </TouchableOpacity>
        </View> */}

          {/* ========================  CASH ON DELIEVERY VIEW START======================== */}

          {/* <RendorPaymentMethood
          onPress={() => {
            setpayOption('onCash');
          }}
          type={'onCash'}
        /> */}
          {/* ========================  CASH ON DELIEVERY VIEW END======================== */}
          {/* <RendorPaymentMethood
          onPress={() => {
            setpayOption('visa');
          }}
          image={IMAGES.visalogo}
          description={'**** **** **** 2187'}
          type={'visa'}
        /> */}
          {/* ========================  CASH ON VISA CARD VIEW START======================== */}

          {/* ========================  CASH ON VISA CARD VIEW END======================== */}

          {/* ========================  CASH ON PAY PALL VIEW START======================== */}
          {/* <RendorPaymentMethood
          onPress={() => {
            setpayOption('paypall');
          }}
          image={IMAGES.paypal}
          description={'john@yopmail.com'}
          type={'paypall'}
        /> */}
          {/* ========================  CASH ON PAY PALL VIEW END======================== */}

          <RendorRow
            fonts={FONTS.mediumFont14}
            leftText={'Sub Total'}
            rightText={`$${subTotal}`}
            style={{marginTop: SIZES.twenty}}
          />
          <RendorRow
            fonts={FONTS.mediumFont14}
            leftText={'Delivery Cost'}
            rightText={`$${deliveryCost}`}
            style={{marginTop: SIZES.ten}}
          />
          <RendorRow
            fonts={FONTS.mediumFont14}
            leftText={'Discount'}
            rightText={`$${discount}`}
            style={{marginTop: SIZES.ten}}
          />
          <RendorRow
            fonts={FONTS.mediumFont14}
            color={COLORS.normal.black}
            leftText={'Total'}
            rightText={`$${subTotal + deliveryCost - discount}`}
            style={{marginTop: SIZES.twenty}}
          />
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomButton
            label={'Send order'}
            onPress={() => {
              // setshowModal(true);
              onSendOrder();
            }}
          />
        </View>

        <ThankyouModal
          onClose={() => {
            setshowModal(false);
          }}
          visible={showModal}
          onOpen={() => {
            setshowModal(true);
          }}
          onBackToHome={() => {
            setshowModal(false);
            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: SCREENS.Home}],
                }),
              );
            }, 1000);
          }}
          onTrackMyOrder={() => {
            setshowModal(false);
            navigation.replace(SCREENS.OrderDetail, {item: {id: orderData.id}});
          }}
        />
      </View>
      <PaymentModal
        visibility={isPaymentModal}
        setVisibility={setIsPaymentModal}
        url={url}
        onResponse={resp => {
          console.log('resp ======== >>>>>>>>>>>>> ', resp);
          if (resp === true) {
            dispatcher(emptyCart());
            setTimeout(
              () => {
                setshowModal(true);
              },
              Platform.OS === 'android' ? 350 : 1000,
            );
          } else {
            setTimeout(() => {
              utils.errorAlert('Payment Failed');
            }, 150);
          }
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
