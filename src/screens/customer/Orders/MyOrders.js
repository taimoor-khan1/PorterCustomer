import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import CartHeader from '../../../components/CartHeader';
import LoadableImage from '../../../components/LoadableImage';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {getMyOrders} from '../../../redux/slice/MyOrder';
import Row from '../../../components/Row';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function MyOrders({navigation}) {
  const dispatcher = useDispatch();
  const MYORDERS = useSelector(state => state.MyOrders.myOrders);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatcher(getMyOrders(''));
    });
  }, [navigation]);

  const rendeorOrderDetail = ({item}) => {
    return (
      <MyTouchableOpacity
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twenty,
            padding: SIZES.fifteen,
            borderRadius: SIZES.ten,
          },
        ]}
        onPress={() => {
          navigation.navigate(SCREENS.OrderDetail, {item: item});
        }}>
        {/* ======================== LOGO ADDRESS RATINGS VIEW START ======================== */}

        <Row
          style={{
            // alignItems: "center",
            justifyContent: 'space-between',
          }}>
          <Row style={{}}>
            <LoadableImage
              smallIndicator
              style={styles.restaurantImage}
              imageStyle={styles.restaurantImage}
              url={CONSTANTS.API_URLS.IMAGE + item.vendor_image}
              // resizeMode={'contain'}
            />
            <View
              style={{
                marginStart: SIZES.fifteen,
              }}>
              <Text
                style={[FONTS.mediumFont16, {marginBottom: SIZES.ten * 0.9}]}>
                {item?.vendor_name} {/* resturaunt name ayega yhn */}
              </Text>
              <Row style={{alignItems: 'center'}}>
                {/* <Icon
                  name={"ios-location-outline"}
                  type={FONTFAMILY.Ionicons}
                  style={{
                    fontSize: SIZES.twenty,
                    color: COLORS.primary.cherry,
                  }}
                /> */}
                <Text
                  style={[
                    FONTS.mediumFont12,
                    {
                      color: COLORS.normal.brownGrey,
                    },
                  ]}>
                  {item?.items[0]?.name} {/* item name ayega yhn */}
                </Text>
              </Row>
            </View>
          </Row>
          <Text style={[FONTS.boldFont16, {}]}>${item?.order_amount}</Text>
        </Row>
        {/* ======================== LOGO ADDRESS RATINGS VIEW END ======================== */}

        <Text
          style={[
            FONTS.lightFont10,
            {
              marginTop: SIZES.twenty,
              color: COLORS.normal.black,
              marginStart: SIZES.ten,
            },
          ]}>
          {moment(item.order_date).format('llll')}
        </Text>
      </MyTouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <CartHeader tittle={'My Orders'} isBackArrow noCart />
      </View>

      <FlatList
        data={MYORDERS}
        renderItem={rendeorOrderDetail}
        key={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 150,
          //   backgroundColor: "red",
          paddingHorizontal: SIZES.fifteen,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    height: SIZES.fifty * 1.15,
    width: SIZES.fifty * 1.15,
    borderRadius: SIZES.fifty * 1.15,
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
