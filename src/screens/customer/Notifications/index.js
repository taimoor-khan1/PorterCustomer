import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {hide, show} from '../../../redux/slice/loader';
import CartHeader from '../../../components/CartHeader';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  SIZES,
  STYLES,
  width,
  height,
  SCREENS,
} from '../../../constants';

export default function Notifications(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const TOKEN = useSelector(state => state.Auth.accessToken);
  const User = useSelector(state => state.Profile.profile);
  const [notificationID, setNotificationID] = useState('');
  const [notificationsData, setNotificationsData] = useState([]);
  const [permissionModal, setPermissionModal] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getNotifications();
    });
  }, [navigation]);

  const getNotifications = () => {
    const onSuccess = ({data}) => {
      console.log('getNotifications =====>>>> ', data);
      setNotificationsData(data.data);
      setLoader(false);
    };

    const onFailure = error => {
      console.log('getNotifications =====>>>> error', error);
      setLoader(false);
    };

    axios
      .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.NOTIFICATIONS, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          user_id: User?.id,
        },
      })
      .then(onSuccess)
      .catch(onFailure);
  };

  const deleteRow = () => {
    const onSuccess = ({data}) => {
      // console.log('delete notification success: ', data);
      const temp = [...notificationsData];
      const index = temp.findIndex(i => i.id === notificationID);
      temp.splice(index, 1);
      setNotificationsData(temp);
      dispatcher(hide());
    };

    const onFailure = error => {
      console.log('delete notification error: ', error.response);
      dispatcher(hide());
    };

    dispatcher(show());

    const postData = {
      id: notificationID,
    };

    axios
      .post(
        CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.DELETE_NOTIFICATION,
        postData,
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <MyTouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            setNotificationID(data.item.id);
            setPermissionModal(true);
          }}>
          <Text style={[FONTS.mediumFont12, styles.backTextWhite]}>Delete</Text>
        </MyTouchableOpacity>
      </View>
    );
  };

  const renderNotificationsItem = ({item}) => {
    return (
      <MyTouchableOpacity
        style={{
          marginTop: SIZES.ten,
          paddingVertical: SIZES.ten,
          backgroundColor: COLORS.normal.white,
        }}
        onPress={() =>
          navigation.navigate(SCREENS.OrderDetail, {
            item: {id: item.order_id},
          })
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.ten,
          }}>
          <View
            style={{
              height: SIZES.ten * 1.3,
              width: SIZES.ten * 1.3,
              borderRadius: SIZES.ten * 1.3,
              backgroundColor: COLORS.primary.cherry,
            }}
          />
          <View style={{marginLeft: SIZES.twentyFive}}>
            <Text style={[FONTS.semiBoldFont16, {color: COLORS.normal.black}]}>
              {item.content}
            </Text>
            <Text
              style={[
                FONTS.mediumFont10,
                {
                  color: COLORS.normal.brownGrey,
                  marginTop: SIZES.five,
                },
              ]}>
              {item.deliver_time}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <View style={{marginBottom: SIZES.ten}}>
        <CartHeader tittle={'Notifications'} isBackArrow noCart />
      </View>

      {loader ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary.cherry}
          style={{marginTop: SIZES.fifteen}}
        />
      ) : (
        <SwipeListView
          stopLeftSwipe={0.5}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          data={notificationsData}
          renderItem={renderNotificationsItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-width * 0.215}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Modal
        deviceHeight={height * height}
        statusBarTranslucent
        isVisible={permissionModal}
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
            Are you sure you want to delete notification?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setPermissionModal(false);
                setTimeout(() => {
                  deleteRow();
                }, 500);
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
              onPress={() => {
                setNotificationID('');
                setPermissionModal(false);
              }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SIZES.fifteen,
  },
  backTextWhite: {
    color: COLORS.normal.white,
  },
  rowFront: {
    marginTop: 10,
    borderRadius: SIZES.ten,
    justifyContent: 'center',
    height: SIZES.twenty * 4,
    backgroundColor: COLORS.normal.white,
  },
  rowBack: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 15,
    borderRadius: SIZES.ten,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.normal.white,
  },
  backRightBtn: {
    top: 4,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.fifteen,
    backgroundColor: COLORS.primary.cherry,
  },
  backRightBtnLeft: {
    right: 75,
    borderRadius: SIZES.ten,
    justifyContent: 'center',
    backgroundColor: COLORS.normal.white,
  },
});
