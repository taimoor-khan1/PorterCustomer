import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {CommonActions} from '@react-navigation/native';

import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

import CartHeader from '../../components/CartHeader';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slice/auth';

export default function More({navigation}) {
  const dispatcher = useDispatch();
  const TOKEN = useSelector(state => state.Auth.accessToken);
  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);

  const toggleModal = () => {
    setisLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = async () => {
    toggleModal();
    await dispatcher(logout(TOKEN));
  };

  const RendorItem = ({iconName, IconType, title, onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: SIZES.fifteen,
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLORS.normal.veryLightPink,
            flexDirection: 'row',
            padding: SIZES.ten,
            alignItems: 'center',
            borderRadius: SIZES.five,
          }}>
          <View
            style={{
              padding: SIZES.fifteen,
              backgroundColor: COLORS.normal.veryLightPink,
              borderRadius: SIZES.twenty * 1.5,
            }}>
            <Icon
              name={iconName}
              type={IconType}
              style={{
                color: COLORS.normal.charcoalGrey,
                fontSize: SIZES.twenty,
              }}
            />
          </View>
          <Text style={[FONTS.semiBoldFont16, {marginStart: SIZES.twenty}]}>
            {title}
          </Text>
        </View>
        <Icon
          name={'right'}
          type={FONTFAMILY.AntDesign}
          style={{
            color: COLORS.primary.cherry,
            fontSize: SIZES.twenty,
            marginLeft: SIZES.fifteen,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <CartHeader tittle={'More'} />
      <View
        style={{
          flex: 0.6,
          marginTop: SIZES.twentyFive,
          //   backgroundColor: 'red',
          justifyContent: 'space-between',
        }}>
        <RendorItem
          iconName={'hand-holding-usd'}
          IconType={FONTFAMILY.FontAwesome5}
          title={'Payments Details'}
        />
        <RendorItem
          iconName={'shopping-bag'}
          IconType={FONTFAMILY.Foundation}
          title={'My Orders'}
          onPress={() => {
            navigation.navigate(SCREENS.MyOrders);
          }}
        />
        <RendorItem
          iconName={'ios-notifications'}
          IconType={FONTFAMILY.Ionicons}
          title={'Notifications'}
          onPress={() => {
            navigation.navigate(SCREENS.Notifications);
          }}
        />
        <RendorItem
          iconName={'envelope'}
          IconType={FONTFAMILY.FontAwesome}
          title={'Inbox'}
          onPress={() => {
            navigation.navigate(SCREENS.Inbox);
          }}
        />
        <RendorItem
          iconName={'info'}
          IconType={FONTFAMILY.Entypo}
          title={'About Us'}
          onPress={() => {
            navigation.navigate(SCREENS.AboutUs);
          }}
        />
        <RendorItem
          iconName={'chat'}
          IconType={FONTFAMILY.Entypo}
          title={'Help & Support'}
          onPress={() => {
            navigation.navigate(SCREENS.HelpAndSupport);
          }}
        />
        <RendorItem
          iconName={'poweroff'}
          IconType={FONTFAMILY.AntDesign}
          title={'Logout'}
          onPress={() => {
            setisLogoutModalVisible(true);
          }}
        />
      </View>

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
            backgroundColor: COLORS.normal.white,
            padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderWidth: 1.5,
            borderColor: COLORS.primary.cherry,
          }}>
          <Text
            style={[
              STYLES.headingText,
              {
                color: COLORS.primary,
                marginTop: SIZES.five,
                textAlign: 'center',
              },
            ]}>
            Porter Customer
          </Text>
          <Text
            style={[
              STYLES.mediumText,
              {marginVertical: SIZES.twenty, textAlign: 'center'},
            ]}>
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={handleLogout}
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
      {/* End of Logout Modal */}
    </View>
  );
}

const styles = StyleSheet.create({});
