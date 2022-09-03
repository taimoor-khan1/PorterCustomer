import React, {useState} from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import {Icon} from 'native-base';
import {Swipeable} from 'react-native-gesture-handler';
import CircularImage from '../../../components/CircularImage';
import {COLORS, FONTFAMILY, FONTS, SIZES, STYLES} from '../../../constants';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import Row from '../../../components/Row';

// Enable UIManager to enable remove item animation in flatlist
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PastOrders() {
  const MYORDERS = useSelector(state => state.MyOrders.myOrders);
  const [pastOrders, setPastOrders] = useState(MYORDERS);

  // set Animation when Item is removed
  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeIn,
        springDamping: 0.5,
      },
    });
  };

  // removing Item
  const removeItem = id => {
    setAnimation();
    setPastOrders(pastOrders.slice().filter(item => item.id !== id));
  };

  // right swipe action
  const rightSwipeAction = (prgress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 2],
    });

    return (
      <MyTouchableOpacity
        style={{
          backgroundColor: COLORS.primary.navy,
          alignItems: 'center',
          justifyContent: 'center',
          padding: SIZES.fifteen,
          borderTopLeftRadius: SIZES.fifteen,
          borderBottomLeftRadius: SIZES.fifteen,
        }}
        onPress={() => removeItem(item.id)}>
        <Animated.View style={{transform: [{scale: scale}]}}>
          <Icon
            name={'ios-trash-outline'}
            type={FONTFAMILY.Ionicons}
            style={{
              fontSize: SIZES.twentyFive,
              color: COLORS.normal.white,
              transform: [{rotate: '180deg'}],
            }}
          />
        </Animated.View>
      </MyTouchableOpacity>
    );
  };

  const renderPastOrderItem = ({item}) => {
    return (
      <Swipeable renderRightActions={(a, b) => rightSwipeAction(a, b, item)}>
        <Row
          style={{
            marginTop: SIZES.ten,
            paddingVertical: SIZES.ten,
            paddingHorizontal: SIZES.twenty,
          }}>
          <CircularImage
            uri={
              'https://media.istockphoto.com/photos/delicious-meal-picture-id1295387240?b=1&k=20&m=1295387240&s=170667a&w=0&h=KtWYFjSBgpNgVkE3P-WKZ2F6V-VxyUBBtJIP_k8IANM='
            }
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              marginLeft: SIZES.ten * 0.8,
            }}>
            <Text style={[FONTS.mediumFont14, {}]} numberOfLines={1}>
              Royal Spice
            </Text>

            <Row style={{}}>
              <Text style={[FONTS.lightFont08, {}]}>Order Id</Text>
              <Text
                style={[
                  FONTS.lightFont08,
                  {color: COLORS.primary.cherry, marginLeft: SIZES.five * 0.5},
                ]}>
                #123123
              </Text>
            </Row>

            <Row style={{alignItems: 'center'}}>
              <Icon
                name={'clock'}
                type={FONTFAMILY.Feather}
                style={{
                  fontSize: SIZES.fifteen * 0.85,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.lightFont08,
                  {
                    color: COLORS.normal.brownGrey,
                    marginLeft: SIZES.five * 0.5,
                  },
                ]}>
                Delivered 15 July 2021, 22:42
              </Text>
            </Row>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              marginLeft: SIZES.ten * 0.8,
              alignItems: 'flex-end',
            }}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
              Royal Spice
            </Text>

            <Row style={{alignItems: 'center'}}>
              <Text
                style={[FONTS.lightFont08, {marginRight: SIZES.five * 0.5}]}>
                Rating
              </Text>
              {[0, 1, 2, 3, 4].map(item => (
                <Icon
                  key={item}
                  name={'star'}
                  type={FONTFAMILY.FontAwesome}
                  style={{
                    fontSize: SIZES.fifteen * 0.8,
                    color: COLORS.normal.golden,
                    marginLeft: SIZES.five * 0.25,
                  }}
                />
              ))}
            </Row>

            <Row style={{alignItems: 'center'}}>
              <Icon
                name={'ios-location-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.fifteen,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.lightFont08,
                  {
                    color: COLORS.normal.brownGrey,
                    marginLeft: SIZES.five * 0.3,
                  },
                ]}>
                No 03, 4th Lane, Newyork
              </Text>
            </Row>
          </View>
        </Row>
      </Swipeable>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <FlatList
        data={pastOrders}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderPastOrderItem}
        ItemSeparatorComponent={() => <View style={STYLES.horLine} />}
        contentContainerStyle={{paddingVertical: SIZES.twenty}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

const DATA = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
  {
    id: '6',
  },
  {
    id: '7',
  },
  {
    id: '8',
  },
  {
    id: '9',
  },
  {
    id: '10',
  },
  {
    id: '11',
  },
  {
    id: '12',
  },
  {
    id: '13',
  },
  {
    id: '14',
  },
  {
    id: '15',
  },
  {
    id: '16',
  },
  {
    id: '17',
  },
  {
    id: '18',
  },
  {
    id: '19',
  },
  {
    id: '20',
  },
];
