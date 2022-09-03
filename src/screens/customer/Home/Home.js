import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {setSelectedSection} from '../../../redux/slice/home';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import Firebase from '../../../firebase/firebaseConfig';
import CartHeader from '../../../components/CartHeader';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function Home({navigation}) {
  const dispatcher = useDispatch();
  const User = useSelector(state => state.Profile.profile);

  const handleSection = async (section, screen) => {
    // await dispatcher(HomeAction.setSelectedSection(section));
    dispatcher(setSelectedSection(section));

    navigation.navigate(screen);
    //  getAccessToken();
  };

  useEffect(() => {
    notificationListener();
  }, []);

  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  const notificationListener = async () => {
    await Firebase();
    messaging().setBackgroundMessageHandler(rm => {
      console.log('messaging().setBackgroundMessageHandler ==== >>>>> ', rm);
    });

    // Check foreground
    messaging().onMessage(async rm => {
      console.log('recived in foreground', rm);
      CheckNotification(rm?.data);
    });

    messaging().onNotificationOpenedApp(rm => {
      console.log('Notification caused app to open from background state:', rm);
      CheckNotification(rm?.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(rm => {
        console.log('Notification caused app to open from quit state:', rm);
        CheckNotification(rm?.data);
      })
      .catch(error => {
        console.log('getInitialNotification ======> ', error);
      });
  };

  const CheckNotification = data => {
    switch (data?.trigger_type) {
      case 'order_accepted':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;
      case 'order_ready':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;
      case 'order_picked':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;
      case 'order_completed':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;
      case 'order_delivered':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;
      case 'order_cancelled':
        navigation.navigate(SCREENS.OrderDetail, {
          item: {id: data?.trigger_id},
        });
        break;

      default:
        break;
    }
  };

  return (
    <View style={[STYLES.container, {}]}>
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <CartHeader
          userName
          onProfilePressed={() => {
            navigation.navigate(SCREENS.GroceryStack, {
              screen: SCREENS.Profle,
            });
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: SIZES.twenty,
          paddingHorizontal: SIZES.fifteen,
        }}>
        <Text style={[FONTS.semiBoldFont22, {marginTop: SIZES.fifteen * 0.4}]}>
          Choose Your{' '}
          <Text style={{color: COLORS.primary.cherry}}>Preference</Text>
        </Text>
        <View
          style={{
            backgroundColor: COLORS.primary.cherry,
            position: 'absolute',
            height: '70%',
            width: '30%',
            borderTopRightRadius: SIZES.twenty * 2.5,
            borderBottomRightRadius: SIZES.twenty * 2.5,
            top: 80,
            left: 0,
          }}
        />
        <View style={{marginStart: SIZES.ten * 1.3}}>
          {/* ======================== GROCERY DELIEVERY VIEW START ======================== */}

          <View
            style={{
              // backgroundColor: 'red',
              marginTop: SIZES.twenty * 3.6,
              // height: '40%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* ======================== GROCERY BOX VIEW START ======================== */}

            <MyTouchableOpacity
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.cranBerry,
                  alignSelf: 'baseline',
                  alignItems: 'center',
                  padding: SIZES.fifteen,
                  borderRadius: SIZES.ten,
                },
              ]}
              onPress={() => {
                handleSection(CONSTANTS.Grocery, SCREENS.GroceryStack);
              }}>
              <Text style={[FONTS.boldFont22, {color: COLORS.normal.white}]}>
                Grocery
              </Text>
              <Text
                style={[
                  FONTS.semiBoldFont16,
                  {color: COLORS.normal.white, marginTop: SIZES.five},
                ]}>
                Daily Purpose & More
              </Text>
              <Image
                style={{
                  height: SIZES.twenty * 5.5,
                  width: SIZES.twenty * 5,
                  bottom: -SIZES.twenty * 1.5,
                }}
                source={IMAGES.groceryImage}
                resizeMode="contain"
              />
            </MyTouchableOpacity>
            {/* ======================== GROCERY BOX VIEW END ======================== */}

            {/* ======================== DELIEVERY BOX VIEW START ======================== */}

            <MyTouchableOpacity
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.greenishBlack,
                  alignSelf: 'baseline',
                  alignItems: 'center',
                  padding: SIZES.fifteen,
                  borderRadius: SIZES.ten,
                  marginStart: SIZES.ten,
                },
              ]}
              onPress={() => {
                handleSection(CONSTANTS.FoodDelievery, SCREENS.GroceryStack);
              }}>
              <Text style={[FONTS.boldFont22, {color: COLORS.normal.white}]}>
                Food Delivery
              </Text>
              <Text
                style={[
                  FONTS.semiBoldFont16,
                  {color: COLORS.normal.white, marginTop: SIZES.five},
                ]}>
                Daily Purpose & More
              </Text>
              <Image
                style={{
                  height: SIZES.twenty * 5.5,
                  width: SIZES.twenty * 6.5,
                  bottom: -SIZES.twenty * 1.5,
                  // right: SIZES.twenty *,
                }}
                source={IMAGES.foodDelievery}
                resizeMode="contain"
              />
            </MyTouchableOpacity>
            {/* ======================== DELIEVRY BOX VIEW END ======================== */}
          </View>
          {/* ======================== GROCERY DELIEVERY VIEW END ======================== */}

          {/* ======================== PICK UP FAST FOOD VIEW START ======================== */}

          <MyTouchableOpacity
            style={[
              STYLES.shadow,
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: SIZES.ten,
                marginTop: SIZES.twenty * 3.5,
                paddingHorizontal: SIZES.fifteen,
                paddingVertical: SIZES.twenty * 1.3,
                backgroundColor: COLORS.normal.veryLightPink,
              },
            ]}
            onPress={() => {
              handleSection(CONSTANTS.PickUp, SCREENS.GroceryStack);
            }}>
            <Image
              style={{
                height: SIZES.twenty * 6,
                width: SIZES.twenty * 9,
                bottom: -SIZES.twentyFive * 1.5,
              }}
              source={IMAGES.pickUpIcon}
              resizeMode="contain"
            />

            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={[FONTS.boldFont24, {color: COLORS.normal.black}]}>
                Pick-Up
              </Text>
              <Text
                style={[
                  FONTS.regularFont08,
                  {textAlign: 'center', marginTop: SIZES.ten},
                ]}>
                Call us where ever you are &{'\n'} pick up your order from the
                pick up point
              </Text>
            </View>
          </MyTouchableOpacity>
        </View>
        {/* ======================== PICK UP FAST FOOD VIEW END ======================== */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
