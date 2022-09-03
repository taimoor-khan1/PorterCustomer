import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Animated,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Easing,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SIZES,
  SCREENS,
  STYLES,
} from '../../../constants';
import Row from '../../../components/Row';
import {Icon, SwipeRow} from 'native-base';
import CircularImage from '../../../components/CircularImage';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import Maptheme from './Maptheme';

export default function RiderHome(props) {
  const dispatch = useDispatch();

  const ORDERREQUEST = useSelector(
    state => state.HomeScreenReducer.orderRequest,
  );

  const ISORDERACCEPTED = useSelector(
    state => state.HomeScreenReducer.isOrderAccepted,
  );

  const handleOrderRequest = async status => {
    // await dispatch(HomeScreenAction.setOrderRequestStatus(status));
  };
  const handleOrderAcceptReject = async status => {
    // await dispatch(HomeScreenAction.setIsOrderAccepted(status));
  };

  useEffect(() => {
    setTimeout(() => {
      handleOrderRequest(true);
    }, 5000);
  }, []);

  const RendorOrderRoute = () => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: COLORS.normal.halfpwhite,
            padding: SIZES.fifteen,
            borderRadius: SIZES.ten,
          },
        ]}>
        {/* ======================== ORDER NAME AND IMAGE VIEW AND ORDER ID  ======================== */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: COLORS.primary.cherry,
                padding: SIZES.five,
                borderRadius: SIZES.twenty,
                alignSelf: 'baseline',
              }}>
              <Image
                source={IMAGES.groceryIcon}
                style={{height: SIZES.twenty, width: SIZES.twenty}}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{
                backgroundColor: COLORS.primary.cherry,
                padding: SIZES.five,
                zIndex: 1,
                left: -5,
              }}>
              <Text
                style={[FONTS.semiBoldFont08, {color: COLORS.normal.white}]}>
                Grocery Order
              </Text>
            </View>
          </View>
          <Text style={[FONTS.semiBoldFont08]}>
            Order ID
            <Text
              style={[FONTS.semiBoldFont08, {color: COLORS.primary.cherry}]}>
              {' '}
              #25237222
            </Text>
          </Text>
        </View>
        {/* ======================== ORDER NAME AND IMAGE VIEW END ======================== */}

        {/* ======================== CUSTOMER LOACTION VIEW START ======================== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: SIZES.ten,
          }}>
          <View
            style={[
              STYLES.shadow,
              {
                backgroundColor: COLORS.normal.white,
                padding: SIZES.five,
                borderRadius: SIZES.twenty,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'baseline',
              },
            ]}>
            <Icon
              name={'home'}
              type={FONTFAMILY.Ionicons}
              style={{fontSize: SIZES.twenty, color: COLORS.primary.navy}}
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <Text style={[FONTS.regularFont12]}>Customer location</Text>
            <Text
              style={[FONTS.regularFont10, {color: COLORS.normal.brownGrey}]}>
              20028 Abi Bakr as siddiq,Rd ,Riyadh, California
            </Text>
          </View>
        </View>

        {/* ======================== CUSTOMER LOACTION VIEW END ======================== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {/* ======================== RIDER ICON VIEW ======================== */}

          <View
            style={[
              STYLES.shadow,
              {
                backgroundColor: COLORS.primary.cherry,
                padding: SIZES.five,
                borderRadius: SIZES.twenty,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon
              name={'bicycle-sharp'}
              type={FONTFAMILY.Ionicons}
              style={{fontSize: SIZES.fifteen, color: COLORS.normal.white}}
            />
          </View>

          {/* ======================== TO STORE AND AMOUNT VIEW ======================== */}

          <View style={{marginTop: SIZES.ten}}>
            <View
              style={{
                width: SIZES.twenty * 5,
                height: 1,
                backgroundColor: COLORS.primary.cherry,
                marginVertical: SIZES.five,
              }}
            />
            <Text
              style={[
                FONTS.regularFont12,
                {alignSelf: 'center', color: COLORS.primary.cherry},
              ]}>
              1.5 KM
            </Text>
          </View>
          {/* ======================== HOME ICON VIEW ======================== */}

          <View
            style={[
              STYLES.shadow,
              {
                backgroundColor: COLORS.primary.navy,
                padding: SIZES.five,
                borderRadius: SIZES.twenty,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon
              name={'home'}
              type={FONTFAMILY.Ionicons}
              style={{fontSize: SIZES.fifteen, color: COLORS.normal.white}}
            />
          </View>
          {/* ======================== FROM STORE AND AMOUNT VIEW ======================== */}

          <View style={{marginTop: SIZES.ten}}>
            <View
              style={{
                height: 1,
                width: SIZES.twenty * 5,
                backgroundColor: COLORS.primary.navy,
                marginVertical: SIZES.five,
              }}
            />
            <Text
              style={[
                FONTS.regularFont12,
                {alignSelf: 'center', color: COLORS.primary.navy},
              ]}>
              4 KM
            </Text>
          </View>
          <View
            style={[
              STYLES.shadow,
              {
                backgroundColor: COLORS.normal.white,
                padding: SIZES.five,
                borderRadius: SIZES.twenty,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon
              name={'home'}
              type={FONTFAMILY.Ionicons}
              style={{fontSize: SIZES.fifteen, color: COLORS.primary.navy}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: SIZES.fifteen * 1.5,
          }}>
          <MyTouchableOpacity
            onPress={() => {
              handleOrderRequest(false);
              handleOrderAcceptReject(true);
            }}
            style={{
              backgroundColor: COLORS.primary.cherry,
              paddingHorizontal: SIZES.twenty,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.five,
            }}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
              Accept
            </Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={() => {
              handleOrderRequest(false);
              // handleOrderAcceptReject(false);
            }}
            style={{
              backgroundColor: COLORS.normal.halfpwhite,
              paddingHorizontal: SIZES.twenty,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.five,
              borderWidth: 1,
              borderColor: COLORS.primary.navy,
            }}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.primary.navy}]}>
              Decline
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    );
  };

  const RendorOrderDetail = () => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: COLORS.normal.halfpwhite,
            padding: SIZES.fifteen,
          },
        ]}>
        {/* ======================== STORE LOCATION VIEW ======================== */}
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingVertical: SIZES.five,
          }}>
          <Row style={{alignItems: 'center'}}>
            <View
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.white,
                  padding: SIZES.five,
                  borderRadius: SIZES.twenty,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'baseline',
                },
              ]}>
              <Icon
                name={'shopping-store'}
                type={FONTFAMILY.Fontisto}
                style={{
                  fontSize: SIZES.twenty * 0.8,
                  color: COLORS.primary.navy,
                }}
              />
            </View>
            <View style={{marginStart: SIZES.five}}>
              <Text style={[FONTS.regularFont10]}>Store location</Text>
              <Text
                style={[
                  FONTS.regularFont08,
                  {
                    color: COLORS.normal.charcoalGrey,
                    marginTop: SIZES.five * 0.6,
                  },
                ]}>
                House No. 241 , Street 231, illinois
              </Text>
            </View>
          </Row>
          <Row>
            <MyTouchableOpacity
              onPress={() => {
                props.navigation.navigate(SCREENS.Chat);
              }}
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.primary.cherry,
                  padding: SIZES.five * 1.2,
                  borderRadius: SIZES.twenty,
                },
              ]}>
              <Icon
                name={'chatbox-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.normal.white,
                }}
              />
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.primary.navy,
                  padding: SIZES.five * 1.2,
                  borderRadius: SIZES.twenty,
                  marginStart: SIZES.ten,
                },
              ]}>
              <Icon
                name={'ios-call-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.normal.white,
                }}
              />
            </MyTouchableOpacity>
          </Row>
        </Row>

        <View style={[STYLES.horLine, {marginVertical: SIZES.fifteen}]} />
        {/* ======================== USER LOCATION VIEW ======================== */}

        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingVertical: SIZES.five,
          }}>
          <Row style={{alignItems: 'center'}}>
            <View
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.white,
                  padding: SIZES.five,
                  borderRadius: SIZES.twenty,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'baseline',
                },
              ]}>
              <Icon
                name={'home'}
                type={FONTFAMILY.Ionicons}
                style={{fontSize: SIZES.twenty, color: COLORS.primary.navy}}
              />
            </View>
            <View style={{marginStart: SIZES.five}}>
              <Text style={[FONTS.regularFont10]}>Customer location</Text>
              <Text
                style={[
                  FONTS.regularFont08,
                  {
                    color: COLORS.normal.charcoalGrey,
                    marginTop: SIZES.five * 0.6,
                  },
                ]}>
                20028 Abi Bakr as siddiq,Rd ,Riyadh, California
              </Text>
            </View>
          </Row>

          <Row>
            <MyTouchableOpacity
              onPress={() => {
                props.navigation.navigate(SCREENS.Chat);
              }}
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.primary.cherry,
                  padding: SIZES.five * 1.2,
                  borderRadius: SIZES.twenty,
                },
              ]}>
              <Icon
                name={'chatbox-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.normal.white,
                }}
              />
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.primary.navy,
                  padding: SIZES.five * 1.2,
                  borderRadius: SIZES.twenty,
                  marginStart: SIZES.ten,
                },
              ]}>
              <Icon
                name={'ios-call-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.normal.white,
                }}
              />
            </MyTouchableOpacity>
          </Row>
        </Row>
      </View>
    );
  };

  const mapRef = useRef();
  const HeaderView = useRef(new Animated.Value(0)).current;

  const [initRegion, setInitRegion] = useState({
    latitude: 37.4219587,
    longitude: -122.0842883,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: SCREENS.Login}],
  });

  useEffect(() => {
    getLocation();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    }, []),
  );

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setInitRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });

        // mapRef.current.animateToRegion(
        //   {
        //     longitude: position.coords.latitude,
        //     latitude: position.coords.longitude,
        //     latitudeDelta: 0.015,
        //     longitudeDelta: 0.0121,
        //   },
        //   1500,
        // );
      },
      error => {
        // console.error('gettttttLLLoccattioonnnnn ============= ', error);
      },
    );
  };

  const hideHeaderBar = () => {
    Animated.timing(HeaderView, {
      toValue: 0,
      easing: Easing.ease,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };

  const showHeaderBar = () => {
    Animated.timing(HeaderView, {
      toValue: -1500,
      easing: Easing.ease,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      {/* <StatusBar
        backgroundColor={COLORS.normal.white}
        barStyle={'dark-content'}
      /> */}
      <MapView
        onStartShouldSetResponder={() => true}
        onResponderEnd={() => {
          if (Platform.OS === 'ios') {
            setTimeout(() => {
              hideHeaderBar();
            }, 50);
          } else {
            hideHeaderBar();
          }
        }}
        onTouchStart={() => {
          showHeaderBar();
        }}
        ref={mapRef}
        customMapStyle={Maptheme}
        initialRegion={initRegion}
        mapType="standard"
        provider={PROVIDER_DEFAULT}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsBuildings={true}
        on
        onMapReady={() => {
          mapRef.current.animateToRegion(initRegion, 1500);
        }}
        showsCompass={false}
        loadingIndicatorColor={COLORS.primary.navy}
        loadingBackgroundColor={`${COLORS.primary.cherry}45`}
        style={[{flex: 1}]}>
        <Marker
          coordinate={{
            latitude: initRegion.latitude,
            longitude: initRegion.longitude,
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary.navy,
              padding: SIZES.ten,
              borderRadius: SIZES.fifty * 5,
            }}>
            <Image source={IMAGES.deliveryManMarker} resizeMode="contain" />
          </View>
        </Marker>

        {Restaurant.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}>
              <View
                style={{
                  backgroundColor: COLORS.primary.cherry,
                  padding: SIZES.ten,
                  borderRadius: SIZES.fifty * 5,
                }}>
                <Image
                  source={IMAGES.restaurantMapMarker}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <Animated.View
        style={{
          backgroundColor: COLORS.primary.navy,
          paddingRight: SIZES.twentyFive * 1.3,
          paddingVertical: SIZES.five,
          position: 'absolute',
          top: Platform.OS === 'ios' ? SIZES.fifty : SIZES.fifty * 0.75,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: [{translateX: HeaderView}],
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.3,
          elevation: 15,
        }}>
        <CircularImage
          uri={
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'
          }
          imageStyle={{
            height: SIZES.twenty * 2.5,
            width: SIZES.twenty * 2.5,
            borderRadius: SIZES.twenty * 2.5,
            marginLeft: SIZES.fifteen,
            marginRight: SIZES.ten,
          }}
        />
        <View>
          <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
            Robert Anderson
          </Text>
          <Row style={{alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text
              style={[
                FONTS.lightFont10,
                {color: COLORS.normal.brownGrey, marginRight: SIZES.five},
              ]}>
              Rating
            </Text>
            {[0, 1, 2, 3, 4].map(item => (
              <Icon
                key={item}
                name={'star'}
                type={FONTFAMILY.FontAwesome}
                style={{
                  fontSize: SIZES.fifteen * 0.7,
                  color: COLORS.normal.golden,
                  marginLeft: SIZES.five * 0.5,
                }}
              />
            ))}
          </Row>
        </View>
      </Animated.View>

      {ISORDERACCEPTED && !ORDERREQUEST && (
        <MyTouchableOpacity
          onPress={() => {
            props.navigation.navigate(SCREENS.NewOrder);
          }}
          style={{
            position: 'absolute',
            top:
              Platform.OS === 'ios' ? SIZES.fifty * 1.23 : SIZES.fifty * 0.93,
            right: SIZES.fifteen * 1.5,
          }}>
          <Icon
            name={'ios-cart'}
            type={FONTFAMILY.Ionicons}
            style={{
              fontSize: SIZES.fifteen * 2,
              color: COLORS.primary.cherry,
              marginLeft: SIZES.five * 0.25,
            }}
          />
        </MyTouchableOpacity>
      )}

      {ORDERREQUEST && (
        <View
          style={{
            position: 'absolute',
            bottom: SIZES.twenty * 4.6,
            left: SIZES.fifteen,
            right: SIZES.fifteen,
          }}>
          <RendorOrderRoute />
        </View>
      )}

      {ISORDERACCEPTED && !ORDERREQUEST && (
        <View
          style={{
            position: 'absolute',
            bottom: SIZES.twenty * 3.9,
            left: 0,
            right: 0,
          }}>
          <RendorOrderDetail />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

const Restaurant = [
  {
    latitude: '37.784',
    longitude: '-122.405857',
  },
  {
    latitude: '37.78984',
    longitude: '-122.40517',
  },
  {
    latitude: '37.7884',
    longitude: '-122.409117',
  },
  {
    latitude: '37.78184',
    longitude: '-122.40897',
  },
];
