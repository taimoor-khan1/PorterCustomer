import {Icon} from 'native-base';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Row from '../../../components/Row';

import {COLORS, FONTFAMILY, FONTS, SIZES, STYLES} from '../../../constants';

export default function NewOrder() {
  const MYORDERS = useSelector(state => state.MyOrders.myOrders);

  const RendorOrderRoute = () => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twenty,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.normal.halfpwhite,
            // backgroundColor: COLORS.normal.halfpwhite,
            padding: SIZES.twenty,
            borderRadius: SIZES.ten,
          },
        ]}>
        <Text
          style={[
            FONTS.boldFont24,
            {color: COLORS.primary.navy, marginBottom: SIZES.twenty},
          ]}>
          Your Order Route
        </Text>

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
              style={{fontSize: SIZES.twentyFive, color: COLORS.normal.white}}
            />
          </View>

          {/* ======================== TO STORE AND AMOUNT VIEW ======================== */}

          <View style={{}}>
            <Text
              style={[
                FONTS.regularFont12,
                {alignSelf: 'center', color: COLORS.normal.charcoalGrey},
              ]}>
              To Store
            </Text>
            <View
              style={{
                width: SIZES.twenty * 7,
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
              style={{fontSize: SIZES.twentyFive, color: COLORS.normal.white}}
            />
          </View>
          {/* ======================== FROM STORE AND AMOUNT VIEW ======================== */}

          <View>
            <Text
              style={[
                FONTS.regularFont12,
                {alignSelf: 'center', color: COLORS.normal.charcoalGrey},
              ]}>
              From Store
            </Text>
            <View
              style={{
                height: 1,
                width: SIZES.twenty * 7,
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
              style={{fontSize: SIZES.twentyFive, color: COLORS.primary.navy}}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {padding: SIZES.fifteen}]}>
      <Row style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?b=1&k=20&m=1254672762&s=170667a&w=0&h=nKrG40G2jj9O8wzJ8wDD2zmUKNp00mcdVWK_f_zixug=',
          }}
          style={styles.restaurantImage}
        />
        <View style={{marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont16, {marginBottom: SIZES.ten * 0.6}]}>
            Burger King
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {color: COLORS.normal.brownGrey, marginBottom: SIZES.five},
            ]}>
            Western Food
          </Text>
          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'ios-location-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                fontSize: SIZES.twenty,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              style={[
                FONTS.lightFont12,
                {
                  color: COLORS.normal.brownGrey,
                  marginLeft: SIZES.five * 0.3,
                },
              ]}>
              No 03, 4th Lane, Newyork
            </Text>
          </Row>
        </View>
        <Text style={[FONTS.lightFont10, {alignSelf: 'flex-start'}]}>
          Order Id{' '}
          <Text style={[FONTS.lightFont10, {color: COLORS.primary.cherry}]}>
            {' '}
            #252372
          </Text>
        </Text>
      </Row>

      {/* ======================== DELIEVERY FEE RATINGS TIME VIEW STATR ======================== */}

      <View
        style={{
          backgroundColor: COLORS.primary.navy,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SIZES.ten,
          marginTop: SIZES.fifteen,
        }}>
        {/* ======================== DELIEVERY  VIEW START ======================== */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'ios-cash'}
            style={{color: COLORS.primary.cherry, fontSize: SIZES.twenty * 1.5}}
          />
          <View style={{marginStart: SIZES.five}}>
            <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
              Delivery Fee
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
                5$
              </Text>
              <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
                USD
              </Text>
            </View>
          </View>
        </View>
        {/* ======================== DELIEVERY  TIME VIEW END ======================== */}

        {/* ========================  TIME VIEW START ======================== */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type={FONTFAMILY.AntDesign}
            name={'clockcircle'}
            style={{color: COLORS.primary.cherry, fontSize: SIZES.twenty * 1.5}}
          />
          <View style={{marginStart: SIZES.five}}>
            <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
              Estimated Time
            </Text>

            <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
              20-25 Mins
            </Text>
          </View>
        </View>
        {/* ========================  TIME VIEW END ======================== */}

        {/* ======================== RATINGS VIEW START ======================== */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type={FONTFAMILY.FontAwesome}
            name={'star'}
            style={{color: COLORS.primary.cherry, fontSize: SIZES.twenty * 1.5}}
          />
          <View style={{marginStart: SIZES.five}}>
            <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
              Customer Rating
            </Text>

            <Text style={[FONTS.regularFont10, {color: COLORS.normal.white}]}>
              4.9
            </Text>
          </View>
        </View>
        {/* ========================  RATINGS VIEW END ======================== */}
      </View>
      {/* ======================== DELIEVERY FEE RATINGS TIME VIEW END ======================== */}
      <ScrollView
        style={{flexGrow: 1}}
        nestedScrollEnabled={true}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <Text
          style={[
            FONTS.boldFont24,
            {color: COLORS.primary.cherry, marginVertical: SIZES.ten},
          ]}>
          Order Items
        </Text>

        {/* ======================== ORDER ITEM LIST START  ======================== */}

        {/* <FlatList
          data={OrderData}
          renderItem={({item}) => {
            return (
              <View>
                <View
                  style={{
                    // backgroundColor: 'red',
                    marginTop: SIZES.ten,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
                    {item.Item}
                  </Text>
                  <Text
                    style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
                    {item.price}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.normal.brownGrey,
                    height: 1,
                    marginTop: SIZES.ten,
                  }}
                />
              </View>
            );
          }}
          keyExtractor={item => item.id}
        /> */}

        {MYORDERS.map(item => {
          return (
            <View>
              <View
                style={{
                  // backgroundColor: 'red',
                  marginTop: SIZES.ten,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
                  {item?.Item}
                </Text>
                <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
                  {item?.price}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.normal.brownGrey,
                  height: 1,
                  marginTop: SIZES.ten,
                }}
              />
            </View>
          );
        })}

        {/* ======================== ORDER ITEM LIST START  END ======================== */}

        {/* ======================== DELIEVERY INSTRUCTION VIEW START  ======================== */}

        <View style={{marginTop: SIZES.ten}}>
          <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
            Delivery Instrusctions
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {
                color: COLORS.normal.brownGrey,
                textAlign: 'justify',
                lineHeight: SIZES.twenty,
                marginTop: SIZES.ten,
              },
            ]}
            numberOfLines={2}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit
          </Text>
          <View
            style={{
              backgroundColor: COLORS.normal.brownGrey,
              height: 1,
              marginTop: SIZES.ten,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
              Sub Total
            </Text>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.cherry}]}>
              $68
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
              Delivery Cost
            </Text>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.cherry}]}>
              $68
            </Text>
          </View>

          <View
            style={{
              backgroundColor: COLORS.normal.brownGrey,
              height: 1,
              marginTop: SIZES.ten,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.ten,
            }}>
            <Text style={[FONTS.boldFont16, {color: COLORS.primary.navy}]}>
              Total
            </Text>
            <Text style={[FONTS.boldFont24, {color: COLORS.primary.cherry}]}>
              $70
            </Text>
          </View>
        </View>
        {/* ======================== DELIEVERY INSTRUCTION VIEW END  ======================== */}

        {/* ======================== OREDER ROUTE COMPONANT  ======================== */}
        <RendorOrderRoute />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    height: SIZES.fifty * 1.15,
    width: SIZES.fifty * 1.15,
    borderRadius: SIZES.fifteen,
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
