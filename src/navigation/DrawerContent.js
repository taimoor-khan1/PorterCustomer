import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../constants';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import CircularImage from '../components/CircularImage';
import Row from '../components/Row';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function DrawerContent(props) {
  const [nearBy, setnearBy] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [Chat, setChat] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [orderHistory, setorderHistory] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [Balance, setBalance] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [Help, setHelp] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [TermsCondition, setTermsCondition] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });
  const [Settings, setSettings] = React.useState({
    textColor: COLORS.normal.white,
    bgColor: COLORS.normal.transparent,
  });

  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);

  const navigateToNextScreen = screenName => {
    props.navigation.navigate(screenName);
  };

  return (
    <ScrollView
      {...props}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,30,62,0.8)',
        borderTopRightRadius: SIZES.twenty * 2.5,
        borderBottomRightRadius: SIZES.twenty * 2.5,
        overflow: 'hidden',
      }}>
      {/* Start of Top Container of User */}
      <MyTouchableOpacity
        activeOpacity={1}
        style={{
          paddingVertical: SIZES.fifteen,
        }}
        onPress={() => {}}>
        <Row style={[STYLES.drawerItem]}>
          <CircularImage
            image={IMAGES.user}
            style={{
              height: SIZES.fifty + 10,
              width: SIZES.fifty + 10,
              borderRadius: SIZES.fifty + 10,
            }}
            imageStyle={{
              height: SIZES.fifty + 10,
              width: SIZES.fifty + 10,
              borderRadius: SIZES.fifty + 10,
            }}
          />
          <View style={{marginHorizontal: SIZES.ten}}>
            <Text style={[FONTS.regularFont18, {color: COLORS.normal.white}]}>
              John Andrew,
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'location-outline'}
                style={{
                  color: COLORS.primary.cherry,
                  fontSize: SIZES.twenty,
                }}
              />
              <Text
                numberOfLines={1}
                style={[FONTS.regularFont14, {color: COLORS.normal.brownGrey}]}>
                NJ Shelter , V432
              </Text>
            </View>
          </View>
        </Row>
      </MyTouchableOpacity>
      {/* End of Top Container of User */}

      <View style={{marginTop: SIZES.ten, paddingHorizontal: SIZES.fifteen}}>
        {/* Start of Profile By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: nearBy.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() => {
            setnearBy({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            });
            navigateToNextScreen(SCREENS.Rider.Profle);
          }}
          onPressOut={() =>
            setnearBy({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: nearBy.textColor}]}>
            Profile
          </Text>
        </MyTouchableOpacity>
        {/* End Profile Container */}

        {/* Start of Chat By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: Chat.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() => {
            setChat({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            });
            navigateToNextScreen(SCREENS.Rider.RiderChat);
          }}
          onPressOut={() =>
            setChat({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: Chat.textColor}]}>
            Chat
          </Text>
        </MyTouchableOpacity>
        {/* End Chat Container */}

        {/* Start of orderHistory By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: orderHistory.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() => {
            setorderHistory({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            });
            navigateToNextScreen(SCREENS.Rider.PastOrders);
          }}
          onPressOut={() =>
            setorderHistory({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: orderHistory.textColor}]}>
            order History
          </Text>
        </MyTouchableOpacity>
        {/* End orderHistory Container */}

        {/* Start of Balance By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: Balance.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() => {
            setBalance({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            });
            navigateToNextScreen(SCREENS.Rider.RiderBalance);
          }}
          onPressOut={() =>
            setBalance({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: Balance.textColor}]}>
            Balance
          </Text>
        </MyTouchableOpacity>
        {/* End Balance Container */}

        {/* Start of Help By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: Help.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() =>
            setHelp({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            })
          }
          onPressOut={() =>
            setHelp({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: Help.textColor}]}>
            Help
          </Text>
        </MyTouchableOpacity>
        {/* End Help Container */}

        {/* Start of TermsCondition By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: TermsCondition.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() =>
            setTermsCondition({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            })
          }
          onPressOut={() =>
            setTermsCondition({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: TermsCondition.textColor}]}>
            Terms & Condition
          </Text>
        </MyTouchableOpacity>
        {/* End TermsCondition Container */}

        {/* Start of Settings By Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            {
              backgroundColor: Settings.bgColor,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
            },
          ]}
          onPressIn={() =>
            setSettings({
              textColor: COLORS.normal.white,
              bgColor: COLORS.primary.cherry,
            })
          }
          onPressOut={() =>
            setSettings({
              textColor: COLORS.normal.white,
              bgColor: COLORS.normal.transparent,
            })
          }
          onPress={() => {
            // navigateToNextScreen(SCREENS.NearByMapView);
            //  navigation.toggleDrawer();
          }}>
          <Text style={[FONTS.mediumFont18, {color: Settings.textColor}]}>
            Settings
          </Text>
        </MyTouchableOpacity>
        {/* End Settings Container */}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{}}
        onPress={() => {
          setisLogoutModalVisible(true);
        }}>
        <Text
          style={[
            FONTS.mediumFont16,
            {
              color: COLORS.primary.cherry,
              paddingLeft: SIZES.twentyFive,
              marginTop: SIZES.twenty * 5,
            },
          ]}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* Start of Logout Modal */}
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
            backgroundColor: COLORS.primary.navy,
            padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderWidth: 1,
            borderColor: COLORS.primary.cherry,
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
            Porter Shoper
          </Text>
          <Text
            style={[
              STYLES.mediumText,
              {
                marginVertical: SIZES.twenty,
                textAlign: 'center',
                color: COLORS.normal.white,
              },
            ]}>
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setisLogoutModalVisible(false);
                props.navigation.navigate(SCREENS.BottomTab);
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginEnd: SIZES.five,
                backgroundColor: COLORS.primary.cherry,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.white}]}>
                Yes
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => setisLogoutModalVisible(false)}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginStart: SIZES.five,
                backgroundColor: COLORS.primary.cherry,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.white}]}>No</Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End of Logout Modal */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
