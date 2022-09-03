import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {useSelector, useDispatch} from 'react-redux';
import {TabView, SceneMap} from 'react-native-tab-view';
import messaging from '@react-native-firebase/messaging';
import {ScrollTabBar} from '../../../components/CustomTabBar';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import LoadableImage from '../../../components/LoadableImage';
import CustomButton from '../../../components/CustomButton';
import CartHeader from '../../../components/CartHeader';
import Firebase from '../../../firebase/firebaseConfig';
import {hide, show} from '../../../redux/slice/loader';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';

export default function OrderDetail({navigation, route}) {
  const dispatcher = useDispatch();
  const {item} = route?.params;
  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  const TOKEN = useSelector(state => state.Auth.accessToken);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [orderData, setOrderData] = useState(null);
  const [routes] = useState([
    {key: 'OrderStatus', title: 'Order Status'},
    {key: 'OrderSummary', title: 'Order Summary'},
  ]);
  const toggleModal = () => {
    setisLogoutModalVisible(!isLogoutModalVisible);
  };
  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      notificationListener();
      getOrderDetail();
    });
  }, [navigation]);

  const getOrderDetail = () => {
    const onSuccess = ({data}) => {
      dispatcher(hide());
      // console.log('order detail res: ', JSON.stringify(data?.data));
      setOrderData(data.data);
    };

    const onFailure = error => {
      dispatcher(hide());
      // console.log('order detail error: ', error.response);
      const errorMsg = utils.showResponseError(error);
      // console.log('errorMsg: ', errorMsg);
    };

    dispatcher(show());

    axios
      .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_ORDER_DETAIL, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          orderID: item?.id,
        },
      })
      .then(onSuccess)
      .catch(onFailure);
  };

  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  const notificationListener = async () => {
    await Firebase();

    // Check foreground
    messaging().onMessage(async rm => {
      console.log('received in forground >>>> ', rm);
      CheckNotification(rm?.data);
    });
  };

  const CheckNotification = data => {
    switch (data?.trigger_type) {
      case 'order_accepted':
        getOrderDetail();
        break;
      case 'order_ready':
        getOrderDetail();
        break;
      case 'order_picked':
        getOrderDetail();
        break;
      case 'order_completed':
        getOrderDetail();
        break;
      case 'order_delivered':
        getOrderDetail();
        break;

      default:
        break;
    }
  };

  const renderScene = SceneMap({
    OrderStatus: () => (
      <View style={{flex: 1, backgroundColor: COLORS.normal.white}}>
        <View style={{marginTop: SIZES.twenty}}>
          <CustomOrderStatus
            check={orderData?.order?.order_status !== 'cancelled'}
            description={'Good! Your order is being recieved.'}
            title={'Send to the Restaurent'}
          />
          <CustomOrderStatus
            title={'Preparing Your Order'}
            description={'Relax! Your Order is preparing.'}
            check={
              orderData?.order?.order_status === 'preparing' ||
              orderData?.order?.order_status === 'ready' ||
              orderData?.order?.order_status === 'picked' ||
              orderData?.order?.order_status === 'completed' ||
              orderData?.order?.order_status === 'finding_rider' ||
              orderData?.order?.order_status === 'rider_accepted'
            }
          />
          <CustomOrderStatus
            title={'Order Ready'}
            description={'Relax! Waiting For Rider to pick up your order.'}
            check={
              orderData?.order?.order_status === 'ready' ||
              orderData?.order?.order_status === 'picked' ||
              orderData?.order?.order_status === 'completed' ||
              orderData?.order?.order_status === 'finding_rider' ||
              orderData?.order?.order_status === 'rider_accepted'
            }
          />
          <CustomOrderStatus
            title={'Picked up & Coming towards you'}
            description={'Your Rider Is on his way.'}
            check={
              orderData?.order?.order_status === 'picked' ||
              orderData?.order?.order_status === 'completed'
            }
            track={orderData?.order?.order_status === 'picked'}
          />
          {/* <CustomOrderStatus
            title={'Your Rider is Arrived'}
            description={'Kindly collect your food'}
          /> */}
          <CustomOrderStatus
            title={'Order Delivered'}
            description={'We are always here for you.'}
            check={orderData?.order?.order_status === 'completed'}
            islast
          />
          <CustomOrderStatus
            title={'Order Cancelled'}
            description={'We are sorry! Order had been cancelled.'}
            check={orderData?.order?.order_status === 'cancelled'}
            islast
          />
        </View>
      </View>
    ),

    OrderSummary: () => (
      <View style={{flex: 1}}>
        <ScrollView
          style={{}}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.normal.white,
            paddingHorizontal: SIZES.fifteen,
            paddingBottom: height * 0.1,
          }}
          scrollEventThrottle={16}
          bounces={false}>
          <CustomOrderSummary />

          {orderData?.rider !== null && <RiderDetailComp />}
        </ScrollView>

        {orderData?.order?.order_status === 'pending' && (
          <CustomButton
            label={'Cancel Order'}
            style={{
              width: '80%',
              alignSelf: 'center',
              marginVertical: SIZES.twentyFive,
            }}
            onPress={() => setisLogoutModalVisible(true)}
          />
        )}
      </View>
    ),
  });

  const CustomOrderStatus = ({title, description, track, islast, check}) => {
    return (
      <View
        style={{
          height: SIZES.fifty,
          flexDirection: 'row',
          paddingHorizontal: SIZES.fifteen,
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          {!islast && (
            <View
              style={{
                width: 0.5,
                height: '100%',
                backgroundColor: COLORS.primary.cherry,
                position: 'absolute',
              }}
            />
          )}

          <View
            style={{
              height: SIZES.ten,
              width: SIZES.ten,
              backgroundColor: check
                ? COLORS.primary.cherry
                : COLORS.normal.brownGrey,
            }}
          />
        </View>

        <View style={{marginStart: SIZES.ten}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[FONTS.mediumFont16]}> {title}</Text>

            {track && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.ten,
                  paddingVertical: SIZES.five,
                  borderRadius: SIZES.ten,
                  marginLeft: SIZES.twenty * 2,
                  backgroundColor: COLORS.primary.cherry,
                }}
                onPress={() => {
                  navigation.navigate(SCREENS.TrackMyOrder, {
                    rider: orderData?.rider,
                    order: orderData?.order,
                    customer: orderData?.customer,
                  });
                }}>
                <Text
                  style={[FONTS.mediumFont10, {color: COLORS.normal.white}]}>
                  Track
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text
            style={[FONTS.regularFont08, {color: COLORS.normal.charcoalGrey}]}>
            {description}
          </Text>
        </View>
      </View>
    );
  };

  const RiderDetailComp = () => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.fifteen,
            alignItems: 'center',
            padding: SIZES.ten,
            borderRadius: SIZES.ten,
            borderWidth: 1,
            borderColor: `${COLORS.normal.brownGrey}50`,
          },
        ]}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LoadableImage
            url={CONSTANTS.API_URLS.IMAGE + orderData?.rider?.image}
            imageStyle={{
              height: SIZES.twentyFive * 2,
              width: SIZES.twentyFive * 2,
              borderRadius: SIZES.twentyFive * 2,
              marginBottom: SIZES.five,
            }}
            resizeMode="cover"
          />
          <Text
            style={[
              FONTS.mediumFont14,
              {marginTop: SIZES.five, color: COLORS.normal.charcoalGrey},
            ]}>
            {orderData?.rider?.name}
          </Text>
          <StarRating
            disabled
            maxStars={5}
            fullStarColor={COLORS.normal.golden}
            halfStarColor={COLORS.normal.golden}
            emptyStarColor={COLORS.normal.golden}
            starSize={SIZES.twenty}
            rating={Number(orderData?.rider?.ratings)}
            starStyle={{marginRight: SIZES.five}}
            containerStyle={{
              //   width: SIZES.twenty * 2,
              marginVertical: SIZES.five,
            }}
          />
          <Text
            style={[FONTS.semiBoldFont08, {color: COLORS.normal.charcoalGrey}]}>
            Delivery Boy
          </Text>
        </View>

        {orderData?.order?.order_status === 'completed' ? (
          <Text
            style={[
              FONTS.mediumFont14,
              {
                marginTop: SIZES.five,
                color: COLORS.primary.cherry,
                marginVertical: SIZES.five,
              },
            ]}>
            Your order has been delivered
          </Text>
        ) : (
          <>
            <Text
              style={[
                FONTS.mediumFont14,
                {
                  marginTop: SIZES.five,
                  color: COLORS.normal.charcoalGrey,
                  marginVertical: SIZES.five,
                },
              ]}>
              Your order will be at your place in
            </Text>
            <Text
              style={[
                FONTS.semiBoldFont20,
                {marginTop: SIZES.five, color: COLORS.primary.cherry},
              ]}>
              {orderData?.order?.average_time[0]}-
              {orderData?.order?.average_time[2]} mins
            </Text>
          </>
        )}
      </View>
    );
  };

  const CustomOrderSummary = ({title, descriptopn, track}) => {
    return (
      <View style={{marginTop: SIZES.twenty}}>
        {orderData?.order_items?.map(item => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                paddingVertical: SIZES.ten,
                borderBottomColor: COLORS.normal.black,
              }}>
              <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
                {item.name} x{item.qty}
              </Text>
              <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
                ${item.sub_total}
              </Text>
            </View>
          );
        })}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            paddingVertical: SIZES.ten,
            borderBottomColor: COLORS.normal.black,
          }}>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
            Delivery Cost
          </Text>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.black}]}>
            ${orderData?.order?.delivery_cost}
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
            Total
          </Text>
          <Text style={[FONTS.boldFont24, {color: COLORS.primary.cherry}]}>
            ${orderData?.order?.grand_total}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <CartHeader tittle={'Order Detail'} isBackArrow noCart />

      {/* ======================== LOGO ADDRESS RATINGS VIEW START ======================== */}

      <Row
        style={{
          alignItems: 'center',
          marginTop: SIZES.twenty,
          marginBottom: SIZES.ten,
          paddingHorizontal: SIZES.fifteen,
        }}>
        <Image
          source={{uri: CONSTANTS.API_URLS.IMAGE + orderData?.vendor?.image}}
          style={[
            styles.restaurantImage,
            {
              height: width * 0.22,
              width: width * 0.22,
              borderRadius: SIZES.fifteen,
            },
          ]}
          resizeMode="contain"
        />
        <View style={{marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont18, {marginBottom: SIZES.ten * 0.6}]}>
            {orderData?.vendor?.name}
          </Text>

          {orderData?.vendor?.cuisine_type ? (
            <Text
              style={[FONTS.mediumFont12, {color: COLORS.normal.brownGrey}]}>
              {orderData?.vendor?.cuisine_type}
            </Text>
          ) : null}

          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'star'}
              type={FONTFAMILY.FontAwesome}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.normal.golden,
              }}
            />
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.normal.brownGrey, marginStart: SIZES.five},
              ]}>
              {Number(orderData?.vendor?.ratings).toFixed(1)}
            </Text>
          </Row>

          {/* <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Icon
              name={'time-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.primary.cherry,
              }}
            />
            {orderData?.order?.order_status === 'completed' ? (
              <Text
                style={[
                  FONTS.mediumFont12,
                  {
                    color: COLORS.normal.brownGrey,
                    marginLeft: SIZES.five * 0.3,
                  },
                ]}>
                Delivered At:{' '}
                {moment(orderData?.order?.updated_at).format('DD-MM-YYYY')}
              </Text>
            ) : (
              <Text
                style={[
                  FONTS.mediumFont12,
                  {
                    color: COLORS.normal.brownGrey,
                    marginLeft: SIZES.five * 0.3,
                  },
                ]}>
                Delivery Time: {orderData?.order?.average_time[0]}-
                {orderData?.order?.average_time[2]} mins
              </Text>
            )}
          </Row> */}
        </View>
      </Row>
      {/* ======================== LOGO ADDRESS RATINGS VIEW END ======================== */}

      <TabView
        renderTabBar={ScrollTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{width: width}}
        initialLayout={{width: layout.width}}
      />

      {/* Start of Cancel Order Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            backgroundColor: COLORS.normal.white,
            // padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderWidth: 1.5,
            borderColor: COLORS.primary.cherry,
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary.cherry,
              paddingVertical: SIZES.ten,
            }}>
            <Text
              style={[
                STYLES.headingText,
                {
                  color: COLORS.normal.white,
                  marginTop: SIZES.five,
                  textAlign: 'center',
                },
              ]}>
              Cancel Order
            </Text>
          </View>
          <Text
            style={[
              STYLES.mediumText,
              {marginVertical: SIZES.twentyFive, textAlign: 'center'},
            ]}>
            Are you sure you want to cancel order?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: SIZES.ten,
            }}>
            <MyTouchableOpacity
              onPress={() => {
                toggleModal();
                setTimeout(() => {
                  switch (SELECTEDSECTION) {
                    case CONSTANTS.FoodDelievery:
                      navigation.navigate(SCREENS.DelieveryStack);
                      break;

                    case CONSTANTS.PickUp:
                      navigation.navigate(SCREENS.PickUpStack);
                      break;
                    case CONSTANTS.Grocery:
                      navigation.navigate(SCREENS.GroceryStack);
                      break;
                  }
                }, 1000);
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginEnd: SIZES.five,
                backgroundColor: COLORS.primary.cherry,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
                Yes
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => toggleModal()}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginStart: SIZES.five,
                backgroundColor: COLORS.primary.cherry,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
                No
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End of Cancel Order Modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  continerView: {
    flex: 1,
    backgroundColor: '#ebf2fa',
    paddingHorizontal: SIZES.fifteen,
  },
  customButton: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.ten,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingVertical: SIZES.ten,
    paddingHorizontal: SIZES.ten,
  },
  customCard: {
    borderWidth: 0.82,
    margin: SIZES.ten,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  orderNowButton: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    padding: SIZES.ten * 1.4,
    margin: SIZES.ten,
    borderRadius: SIZES.ten,
  },
});
