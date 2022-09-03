import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Linking,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CircularImage from '../../../components/CircularImage';
import Row from '../../../components/Row';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';

export default function Chat({navigation, route}) {
  const {rider_data, order_data} = route?.params;
  const user = useSelector(state => state.Profile.profile);

  const flatListRef = React.useRef();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const time = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');

  useEffect(() => {
    getChatForCustomer();
  }, []);

  const getChatForCustomer = async () => {
    try {
      database()
        .ref(CONSTANTS.FIREBASE.CHAT) // chat path
        .child(user?.id.toString()) // user id
        .child(rider_data?.id.toString()) // customer id
        .child(order_data?.id.toString()) // order Id
        .child(CONSTANTS.FIREBASE.MESSAGES)
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach((child, index) => {
            msgs.push({
              senderId: child.val().senderId,
              message: child.val().message,
              type: child.val().type,
              time: child.val().time,
            });
          });
          setMessages(msgs);
        });
    } catch (error) {
      console.log(' get chat error =========>', error);
    }
  };

  const sendMessage = () => {
    const time = moment();

    // current user k liye msg banaya
    database()
      .ref(CONSTANTS.FIREBASE.CHAT) // chat path
      .child(user?.id.toString()) // user id
      .child(rider_data?.id.toString()) // other user id
      .child(order_data?.id.toString()) // order Id
      .child(CONSTANTS.FIREBASE.MESSAGES) // message path
      .push({
        type: 1,
        time: time.toString(),
        message: message,
        senderId: user?.id, // user id
        senderName: user?.name,
        receiverId: rider_data?.id, // other user Id
        receiverName: rider_data?.name,
      });

    // other user k liye msg banaya
    database()
      .ref(CONSTANTS.FIREBASE.CHAT)
      .child(rider_data?.id.toString()) // other user id
      .child(user?.id.toString()) // user id
      .child(order_data?.id.toString()) // order Id
      .child(CONSTANTS.FIREBASE.MESSAGES)
      .push({
        type: 1,
        time: time.toString(),
        message: message,
        senderId: user?.id, // user id
        senderName: user?.name,
        receiverId: rider_data?.id, // other user Id
        receiverName: rider_data?.name,
      });

    setMessage('');
  };

  const renderMessages = ({item}) => {
    return (
      <View
        style={{
          alignSelf: item.senderId === user?.id ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={[
            STYLES.shadow,
            {
              maxWidth: '70%',
              paddingVertical: SIZES.ten,
              paddingHorizontal: SIZES.fifteen,
              borderRadius: SIZES.ten * 1.3,
              marginTop: SIZES.fifteen,
              backgroundColor:
                item.senderId === user?.id
                  ? COLORS.normal.white
                  : COLORS.primary.cherry,
            },
          ]}>
          <Text
            style={[
              FONTS.regularFont14,
              {
                color:
                  item.senderId === user?.id
                    ? COLORS.normal.black
                    : COLORS.normal.white,
              },
            ]}>
            {item.message}
          </Text>

          <Text
            style={[
              FONTS.regularFont10,
              {
                marginTop: SIZES.five,
                alignSelf:
                  item.senderId === user?.id ? 'flex-start' : 'flex-end',
                color:
                  item.senderId === user?.id
                    ? COLORS.normal.black
                    : COLORS.normal.white,
              },
            ]}>
            {moment(item?.time).format('hh:mm a')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Row
        style={{
          padding: SIZES.fifteen,
          backgroundColor: COLORS.normal.white,
          shadowColor: '#00000090',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.3,
          elevation: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyTouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-left'}
              type={FONTFAMILY.Entypo}
              style={{
                color: COLORS.normal.black,
                fontSize: SIZES.twentyFive * 1.25,
              }}
            />
          </MyTouchableOpacity>

          <Row style={{alignItems: 'center'}}>
            <CircularImage
              uri={CONSTANTS.API_URLS.IMAGE + rider_data?.image}
              imageStyle={{
                height: SIZES.fifteen * 4,
                width: SIZES.fifteen * 4,
                borderRadius: SIZES.fifteen * 4,
                marginLeft: SIZES.ten * 1.3,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.ten * 1.3,
              }}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.normal.black}]}>
                {rider_data?.name}
              </Text>
              <Text style={[FONTS.lightFont12, {color: COLORS.normal.black}]}>
                Delivery Boy
              </Text>
            </View>
          </Row>
        </Row>

        <MyTouchableOpacity
          onPress={() => {
            Linking.openURL(`tel://0${rider_data?.phone}`);
          }}>
          <View
            style={{
              backgroundColor: COLORS.normal.white,
              padding: SIZES.ten,
              borderRadius: SIZES.ten,
              shadowColor: '#00000090',
              shadowOffset: {
                width: 0,
                height: 3.85,
              },
              shadowOpacity: 0.34,
              shadowRadius: 3.27,
              elevation: 10,
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-call-outline'}
              style={{
                color: COLORS.primary.cherry,
                fontSize: SIZES.twentyFive,
              }}
            />
          </View>
        </MyTouchableOpacity>
      </Row>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.fifty,
          paddingHorizontal: SIZES.twenty * 0.3,
        }}
        onContentSizeChange={() =>
          flatListRef?.current?.scrollToEnd({animated: true})
        }
      />

      <View
        style={{
          width: width,
          borderTopLeftRadius: SIZES.fifteen,
          borderTopRightRadius: SIZES.fifteen,
          paddingHorizontal: SIZES.fifteen * 1.2,
          backgroundColor: COLORS.normal.white,
          shadowColor: '#00000090',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.3,
          elevation: 100,
        }}>
        <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
          {/* <MyTouchableOpacity style={{padding: SIZES.ten}}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-mic-outline'}
              style={{
                fontSize: SIZES.twenty * 1.5,
                color: COLORS.primary.cherry,
              }}
            />
          </MyTouchableOpacity> */}

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder={'Type Your Message...'}
            style={[
              FONTS.mediumFont14,
              {
                height: 60,
                flex: 1,
                paddingHorizontal: SIZES.ten,
                color: COLORS.normal.black,
              },
            ]}
            selectionColor={COLORS.primary.navy}
            placeholderTextColor={COLORS.normal.charcoalGrey}
          />

          <MyTouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: COLORS.primary.cherry,
              paddingHorizontal: SIZES.fifteen - 2,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.ten,
              shadowColor: '#00000090',
              shadowOffset: {
                width: 0,
                height: 3.85,
              },
              shadowOpacity: 0.34,
              shadowRadius: 3.27,
              marginLeft: SIZES.ten,
              elevation: 10,
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-send-outline'}
              style={{
                fontSize: SIZES.twenty * 1.1,
                color: COLORS.normal.white,
                transform: [{rotate: '-50deg'}],
              }}
            />
          </MyTouchableOpacity>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
