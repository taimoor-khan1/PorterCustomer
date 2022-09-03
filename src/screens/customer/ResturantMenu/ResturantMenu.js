import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CustomizeOrderModal from '../../../components/modals/CustomizeOrderModal';
import {getItemsByCategory} from '../../../services/GetItemsByCategory';
import ListEmtyComponent from '../../../components/ListEmtyComponent';
import {ScrollTabBar2} from '../../../components/ScrollTabBar2';
import LoadableImage from '../../../components/LoadableImage';
import Row from '../../../components/Row';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  height,
  width,
} from '../../../constants';

export default function ResturantMenu({navigation, route}) {
  var myTabs = {};
  const TOKEN = useSelector(state => state.Auth.accessToken);
  const {cartItems, subTotal} = useSelector(state => state.Cart);

  const ResturantID = route?.params?.data.id;
  // // console.log('ResturantID: ', ResturantID);
  const Restaurant = route?.params?.data;
  // // console.log('Restaurant: ', Restaurant);

  // // console.log(
  //   'CONSTANTS.API_URLS.IMAGE + Restaurant.image',
  //   CONSTANTS.API_URLS.IMAGE + Restaurant.image,
  // );

  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  // console.log('SELECTEDSECTION: ', SELECTEDSECTION);

  const FD_Categories = useSelector(
    state => state.categories.RestaurantCategories,
  );
  const G_Categories = useSelector(state => state.categories.GroceryCategories);

  const [loader, setLoader] = useState(true);
  const [itemsData, setItemsData] = useState([]);

  const [index, setIndex] = useState(0);
  const [isAddToCard, setIsAddToCard] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [itemprice, setItemprice] = useState(0);

  const showCustomizeOrder = useRef(null);
  // const [routes] = useState([
  //   {key: 'first', title: 'MOST SELLING'},
  //   {key: 'second', title: 'SALADS'},
  //   {key: 'third', title: 'SIDES'},
  //   {key: 'fourth', title: 'APPTIZERS'},
  // ]);

  const [routes] = useState(
    SELECTEDSECTION === CONSTANTS.Grocery
      ? G_Categories.map(item => ({
          key: item.name,
          title: item.name,
          id: item.id,
        }))
      : FD_Categories.map(item => ({
          key: item.name,
          title: item.name,
          id: item.id,
        })),
  );

  const tabs = () => {
    routes.map(
      item =>
        (myTabs[item.key] = () => (
          <View style={{flex: 1, backgroundColor: COLORS.normal.white}}>
            {loader ? (
              <ActivityIndicator
                size="large"
                color={COLORS.primary.cherry}
                style={{marginTop: SIZES.twenty}}
              />
            ) : (
              <FlatList
                data={itemsData}
                renderItem={rendorList}
                key={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: width * 0.03,
                  paddingHorizontal: SIZES.fifteen,
                }}
                ListEmptyComponent={() => (
                  <ListEmtyComponent message={'No items.'} />
                )}
              />
            )}
          </View>
        )),
    );
  };

  useEffect(() => {
    if (cartItems.length > 0) setIsAddToCard(true);
    else setIsAddToCard(false);
  }, [cartItems]);

  useEffect(() => {
    getItemsByCategory(
      SELECTEDSECTION === CONSTANTS.FoodDelievery ? 'restaurant' : 'grocery',
      TOKEN,
      routes[0].id,
      false,
      resp => {
        if (resp.success === 1) {
          setItemsData(resp.data);
          if (resp.isRefreshing) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        } else {
          setLoader(false);
        }
      },
      ResturantID,
    );
  }, [routes]);

  tabs();
  // // console.log(routes, '\n', myTabs);

  const renderScene = SceneMap(myTabs);

  const rendorList = ({item}) => {
    // // console.log('item === >>>>> ', item);

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: SIZES.twenty,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate(SCREENS.SingleItem, {
            item: item,
          });
        }}>
        <LoadableImage
          imageStyle={{
            width: SIZES.twenty * 4.5,
            height: SIZES.twenty * 4.5,
            borderRadius: SIZES.ten,
          }}
          style={{
            width: SIZES.twenty * 4.5,
            height: SIZES.twenty * 4.5,
            borderRadius: SIZES.ten,
          }}
          url={CONSTANTS.API_URLS.IMAGE + item?.image}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            marginStart: SIZES.ten,
            // width: "55%",
          }}>
          <Text
            style={[
              FONTS.boldFont18,
              {
                color: COLORS.normal.black,
                marginBottom: SIZES.five - 2,
                textTransform: 'capitalize',
              },
            ]}>
            {item.name}
          </Text>
          <Text
            numberOfLines={3}
            style={[FONTS.mediumFont10, {color: COLORS.normal.brownGrey}]}>
            {item.description}
          </Text>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.charcoalGrey}]}>
            ${item.price}
          </Text>
          {/* <MyTouchableOpacity
            onPress={() => {
              showCustomizeOrder.current.snapTo(0);
            }}>
            <Text style={[FONTS.mediumFont10, {color: COLORS.primary.cherry}]}>
              Customize Your Order
            </Text>
          </MyTouchableOpacity> */}
        </View>

        {/* <MyTouchableOpacity
          style={{padding: SIZES.fifteen}}
          onPress={() => {
            setItemCount(1);
            setItemprice(item.price);
            setIsAddToCard(true);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.primary.cherry,
              paddingHorizontal: SIZES.ten,
              paddingVertical: SIZES.five,
              borderRadius: SIZES.twenty,
            }}>
            <Icon
              name={'time-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.normal.white,
              }}
            />
            <Text style={[FONTS.semiBoldFont08, {color: COLORS.normal.white}]}>
              Add to Cart
            </Text>
          </View>
        </MyTouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  const PlaceOrderCompopnanat = () => {
    return (
      <View
        style={{
          flex: 0.13,
          backgroundColor: COLORS.primary.cherry,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.twentyFive,
          }}>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
            Place Order | {cartItems.length} items
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
              {subTotal} USD
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.normal.white,
                flexDirection: 'row',
                alignItems: 'center',
                marginStart: SIZES.ten,
                paddingHorizontal: SIZES.five,
                borderRadius: SIZES.ten,
                paddingVertical: SIZES.five - 2,
              }}
              onPress={() => {
                setIsAddToCard(false);
                navigation.navigate(SCREENS.MyCart);
              }}>
              <Icon
                name={'ios-cart'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.fifteen * 1.5,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.semiBoldFont10,
                  {color: COLORS.normal.charcoalGrey},
                ]}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const layout = useWindowDimensions();

  return (
    <View style={{flex: 1}}>
      <ImageBackground style={styles.headerImgStyle} source={IMAGES.pizaImage}>
        <View
          style={{
            marginTop:
              Platform.OS === 'android'
                ? SIZES.twentyFive * 1.5
                : getStatusBarHeight(true),
            marginHorizontal: SIZES.fifteen,
          }}>
          <View style={styles.flexRow}>
            <MyTouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'chevron-back'}
                style={{
                  fontSize: SIZES.twenty * 1.2,
                  color: COLORS.primary.cherry,
                }}
              />
            </MyTouchableOpacity>

            <MyTouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate(SCREENS.MyCart)}>
              <Icon
                name={'ios-cart'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.fifteen * 1.8,
                  color: COLORS.primary.cherry,
                }}
              />

              {cartItems.length > 0 && (
                <View style={styles.counterView}>
                  <Text style={styles.counterText}>
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                  </Text>
                </View>
              )}
            </MyTouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* ======================== MENU DETAIL VIEW  START ======================== */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={_index => {
          setLoader(true);
          setIndex(_index);
          getItemsByCategory(
            SELECTEDSECTION === CONSTANTS.FoodDelievery
              ? 'restaurant'
              : 'grocery',
            TOKEN,
            routes[_index].id,
            false,
            resp => {
              if (resp.success === 1) {
                setItemsData(resp.data);
                if (resp.isRefreshing) {
                  setLoader(false);
                } else {
                  setLoader(false);
                }
              } else {
                setLoader(false);
              }
            },
            ResturantID,
          );
        }}
        initialLayout={{width: layout.width}}
        // renderTabBar={ScrollTabBar2}
        renderTabBar={props => {
          return (
            <ScrollTabBar2
              {...props}
              // firstItem={Object.keys(myTabs)[0]}
              onTabPress={({route, preventDefault}) => {
                setLoader(true);
                getItemsByCategory(
                  SELECTEDSECTION === CONSTANTS.FoodDelievery
                    ? 'restaurant'
                    : 'grocery',
                  TOKEN,
                  route.id,
                  false,
                  resp => {
                    if (resp.success === 1) {
                      setItemsData(resp.data);
                      if (resp.isRefreshing) {
                        setLoader(false);
                      } else {
                        setLoader(false);
                      }
                    } else {
                      setLoader(false);
                    }
                  },
                  ResturantID,
                );
                // getAllItems(route.id);
              }}
            />
          );
        }}
      />

      {/* ======================== MENU DETAIL VIEW  END ======================== */}

      {isAddToCard && <PlaceOrderCompopnanat />}
      <CustomizeOrderModal sheetRef={showCustomizeOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImgStyle: {
    width: width,
    height: height * 0.3,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterView: {
    right: 3,
    bottom: 5,
    height: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: SIZES.five,
    backgroundColor: COLORS.primary.cherry,
  },
  counterText: {
    fontSize: SIZES.ten,
    fontWeight: 'bold',
    color: COLORS.normal.white,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.twenty * 2,
    width: SIZES.twenty * 2,
    borderRadius: SIZES.twenty * 2,
    backgroundColor: COLORS.normal.white,
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
