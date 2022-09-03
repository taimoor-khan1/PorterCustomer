import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import StarRating from 'react-native-star-rating';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PermissionModal from '../../../components/modals/PermissionModal';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {emptyCart, saveCartItem} from '../../../redux/slice/cart';
import utils from '../../../utils';
import {
  COLORS,
  height,
  width,
  SIZES,
  FONTFAMILY,
  FONTS,
  STYLES,
  CONSTANTS,
  SCREENS,
} from '../../../constants';

export default function SingleItem(props) {
  const dispatcher = useDispatch();
  const navigation = useNavigation();
  const {item} = props.route.params;
  const {cartItems} = useSelector(state => state.Cart);

  const portionHeight = useRef(new Animated.Value(0)).current;
  const ingredientsHeight = useRef(new Animated.Value(0)).current;
  const [portionCollapsed, setPortionCollapsed] = useState(true);
  const [ingredientsCollapsed, setingredientsCollapseds] = useState(true);
  const [emptyCartModal, setEmptyCartModal] = useState(false);
  const [portionCount, setportionCount] = useState(1);

  useEffect(() => {
    if (portionCollapsed) {
      portioncollapseView();
    } else {
      portionexpandView();
    }
  }, [portionCollapsed]);

  const portiontoggleCollapsed = () => {
    setPortionCollapsed(!portionCollapsed);
  };

  const portioncollapseView = () => {
    Animated.timing(portionHeight, {
      duration: 500,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const portionexpandView = () => {
    Animated.timing(portionHeight, {
      duration: 700,
      toValue: 100,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (ingredientsCollapsed) {
      ingredientsollapseView();
    } else {
      ingredientsexpandView();
    }
  }, [ingredientsCollapsed]);

  const ingredientsToggle = () => {
    setingredientsCollapseds(!ingredientsCollapsed);
  };

  const ingredientsollapseView = () => {
    Animated.timing(ingredientsHeight, {
      duration: 500,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const ingredientsexpandView = () => {
    Animated.timing(ingredientsHeight, {
      duration: 700,
      toValue: 150,
      useNativeDriver: false,
    }).start();
  };

  const onSaveCartItem = () => {
    if (cartItems.length > 0 && cartItems[0].vendor?.id !== item?.vendor?.id) {
      setEmptyCartModal(true);
    } else if (cartItems.findIndex(i => i.id === item.id) >= 0) {
      utils.warningAlert('You have already added this item.');
    } else {
      utils.successAlert('Item added successfully.');
      dispatcher(saveCartItem({...item, qty: portionCount}));
    }
  };

  const onEmptyCart = () => {
    setEmptyCartModal(false);
    dispatcher(emptyCart());
    utils.successAlert(
      'Your cart has been emptied successfully. You can add items now.',
    );
  };

  // const RendorSizeOfPortion = ({title}) => {
  //   return (
  //     <Animated.View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         marginTop: SIZES.ten * 1.5,
  //       }}>
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <TouchableOpacity
  //           style={{}}
  //           onPress={() => {
  //             setportionItem(title);
  //           }}>
  //           <Icon
  //             type={FONTFAMILY.MaterialCommunityIcons}
  //             name={
  //               portionItem === title ? 'radiobox-marked' : 'radiobox-blank'
  //             }
  //             style={{color: COLORS.primary.cherry, fontSize: SIZES.twenty}}
  //           />
  //         </TouchableOpacity>
  //         <Text
  //           style={[
  //             FONTS.mediumFont12,
  //             {
  //               color: COLORS.normal.black,
  //               marginStart: SIZES.ten * 1.5,
  //             },
  //           ]}>
  //           {title}
  //         </Text>
  //       </View>
  //       <Text style={[FONTS.semiBoldFont10, {color: COLORS.primary.cherry}]}>
  //         $40.00
  //       </Text>
  //     </Animated.View>
  //   );
  // };

  // const RendorIngredients = ({title, isChecked}) => {
  //   return (
  //     <Animated.View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         marginTop: SIZES.ten * 1.5,
  //       }}>
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <TouchableOpacity
  //           style={{}}
  //           onPress={() => {
  //             setingredientsItem(title);
  //           }}>
  //           <Icon
  //             type={FONTFAMILY.MaterialCommunityIcons}
  //             name={
  //               ingredientsItem === title ? 'radiobox-marked' : 'radiobox-blank'
  //             }
  //             style={{color: COLORS.primary.cherry, fontSize: SIZES.twenty}}
  //           />
  //         </TouchableOpacity>
  //         <Text
  //           style={[
  //             FONTS.mediumFont12,
  //             {
  //               color: COLORS.normal.black,
  //               marginStart: SIZES.ten * 1.5,
  //             },
  //           ]}>
  //           {title}
  //         </Text>
  //       </View>
  //       <Text style={[FONTS.semiBoldFont10, {color: COLORS.primary.cherry}]}>
  //         $40.00
  //       </Text>
  //     </Animated.View>
  //   );
  // };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.headerImgStyle}
        source={{uri: CONSTANTS.API_URLS.IMAGE + item?.image}}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}>
        <View style={{paddingHorizontal: SIZES.fifteen}}>
          <Text style={[FONTS.boldFont20, {marginTop: SIZES.twenty}]}>
            {item.name}
          </Text>

          {/* ========================  RATINGS AND DOLLAR VIEW START======================== */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: SIZES.ten,
            }}>
            <View>
              <StarRating
                disabled
                maxStars={5}
                fullStarColor={COLORS.primary.cherry}
                halfStarColor={COLORS.primary.cherry}
                emptyStarColor={COLORS.primary.cherry}
                starSize={SIZES.twenty}
                rating={Number(item.ratings)}
                starStyle={{marginRight: SIZES.five}}
                containerStyle={{
                  width: SIZES.twenty * 2,
                }}
              />
              <Text
                style={[
                  FONTS.mediumFont12,
                  {color: COLORS.primary.cherry, marginTop: SIZES.five},
                ]}>
                {item.count_ratings}
              </Text>
            </View>
            <View>
              <Text style={[FONTS.boldFont24, {color: COLORS.primary.cherry}]}>
                ${item.price}
              </Text>
              {/* <Text style={[FONTS.regularFont10, {marginTop: SIZES.five}]}>
                / per Portion
              </Text> */}
            </View>
          </View>

          {/* ========================  RATINGS AND DOLLAR VIEW START======================== */}

          {/* ========================  DESCRIPTION VIEW START======================== */}

          <View style={{marginVertical: SIZES.ten}}>
            <Text style={[FONTS.boldFont20]}>Description</Text>
            <Text
              style={[
                FONTS.mediumFont10,
                {
                  textAlign: 'justify',
                  lineHeight: SIZES.fifteen,
                  marginTop: SIZES.five,
                },
              ]}>
              {item.description}
            </Text>
          </View>

          {/* ========================  DESCRIPTION VIEW END======================== */}

          <View style={[STYLES.horLine, {}]} />

          {/* ======================== CUSTOMIZE ORDER VIEW START ======================== */}

          <View style={{marginTop: SIZES.twenty}}>
            {/* <Text style={[FONTS.boldFont20]}>Customize Your Order</Text> */}

            {/* ======================== SIZE OF PORTION VIEW START ======================== */}

            {/* <View
              style={{
                marginTop: SIZES.twenty,
                width: '100%',

                paddingHorizontal: SIZES.fifteen,
                // height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: SIZES.five,
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: COLORS.normal.black,
                  },
                ]}>
                Select the size of portion
              </Text>
              <TouchableOpacity
                style={{padding: SIZES.five * 1.3}}
                activeOpacity={0.7}
                onPress={() => {
                  setPortionCollapsed(!portionCollapsed);
                }}>
                <Icon
                  name={portionCollapsed ? 'right' : 'down'}
                  type={FONTFAMILY.AntDesign}
                  style={{
                    color: portionCollapsed
                      ? COLORS.normal.charcoalGrey
                      : COLORS.normal.black,
                    fontSize: SIZES.fifteen,
                  }}
                />
              </TouchableOpacity>
            </View> */}

            {/* order detail View Using Collaps and expands Animation  */}

            {/* <Animated.View
              style={{
                maxHeight: portionHeight,
                opacity: portionHeight,
                paddingHorizontal: SIZES.fifteen,
              }}>
              <RendorSizeOfPortion title="Large" />
              <RendorSizeOfPortion title="Medium " />
              <RendorSizeOfPortion title="Small" />
            </Animated.View> */}
            {/* ======================== SIZE OF PORTION VIEW END ======================== */}

            {/* ======================== SSELECT INGREDIENTS VIEW START ======================== */}

            {/* <View
              style={{
                width: '100%',
                marginTop: SIZES.twenty,
                paddingHorizontal: SIZES.fifteen,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: SIZES.five,
              }}>
              <Text
                style={[
                  FONTS.mediumFont16,
                  {
                    color: COLORS.normal.black,
                  },
                ]}>
                Select the ingredients
              </Text>
              <TouchableOpacity
                style={{padding: SIZES.five * 1.3}}
                activeOpacity={0.7}
                onPress={() => {
                  ingredientsToggle();
                }}>
                <Icon
                  name={ingredientsCollapsed ? 'right' : 'down'}
                  type={FONTFAMILY.AntDesign}
                  style={{
                    color: ingredientsCollapsed
                      ? COLORS.normal.charcoalGrey
                      : COLORS.normal.black,
                    fontSize: SIZES.fifteen,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Animated.View
              style={{
                maxHeight: ingredientsHeight,
                opacity: ingredientsHeight,
                paddingHorizontal: SIZES.fifteen,
              }}>
              <RendorIngredients title="Option1" />
              <RendorIngredients title="Option2" />
              <RendorIngredients title="Option3" />
              <RendorIngredients title="Option4" />
            </Animated.View> */}
            {/* ======================== SSELECT INGREDIENTS VIEW END ======================== */}
          </View>

          {/* ======================== NUMBER OF PORTION VIEW START ======================== */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.twenty,
            }}>
            <Text style={[FONTS.boldFont20]}>Number of Portions</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: COLORS.primary.cherry,
                  borderRadius: SIZES.ten,
                  paddingHorizontal: SIZES.ten,
                  paddingVertical: SIZES.five - 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (portionCount <= 1) {
                    return;
                  } else {
                    setportionCount(portionCount - 1);
                  }
                }}>
                <Icon
                  type={FONTFAMILY.AntDesign}
                  name="minus"
                  style={{fontSize: SIZES.twenty, color: COLORS.normal.white}}
                />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: COLORS.normal.white,
                  borderRadius: SIZES.ten,
                  paddingHorizontal: SIZES.ten,
                  paddingVertical: SIZES.five - 3,
                  borderWidth: 1,
                  borderColor: COLORS.primary.cherry,
                  marginHorizontal: SIZES.ten,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[FONTS.lightFont10]}>{portionCount}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setportionCount(portionCount + 1);
                }}
                style={{
                  backgroundColor: COLORS.primary.cherry,
                  borderRadius: SIZES.ten,
                  paddingHorizontal: SIZES.ten,
                  paddingVertical: SIZES.five - 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  type={FONTFAMILY.AntDesign}
                  name="plus"
                  style={{fontSize: SIZES.twenty, color: COLORS.normal.white}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* ======================== NUMBER OF PORTION VIEW END ======================== */}
        </View>

        {/* ======================== TOTAL PRICE VIEW START ======================== */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.twenty * 2.7,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary.cherry,
              position: 'absolute',
              height: SIZES.twenty * 9,
              width: '30%',
              borderTopRightRadius: SIZES.twenty * 2.5,
              borderBottomRightRadius: SIZES.twenty * 2.5,

              left: 0,
            }}
          />
          <View
            style={[
              STYLES.shadow,
              {
                backgroundColor: COLORS.normal.white,
                alignSelf: 'center',
                width: '80%',
                paddingVertical: SIZES.fifteen,
                borderTopLeftRadius: SIZES.twenty * 1.2,
                borderTopRightRadius: SIZES.ten,
                borderBottomLeftRadius: SIZES.twenty * 1.2,
                borderBottomRightRadius: SIZES.ten,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View>
              <Text style={[FONTS.boldFont20]}>Total Price</Text>
              <Text style={[FONTS.boldFont20, {marginVertical: SIZES.ten}]}>
                $ {portionCount * item.price}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary.cherry,
                  paddingHorizontal: SIZES.twenty * 2,
                  paddingVertical: SIZES.ten,
                  borderRadius: SIZES.twenty,
                }}
                onPress={() => {
                  onSaveCartItem();
                  // let data = {
                  //   item: item,
                  //   itemCount: portionCount,
                  //   roughTotal: portionCount * item.price,
                  // };
                  // navigation.navigate(SCREENS.MyCart, {data: data});
                }}>
                <Icon
                  name={'cart'}
                  type={FONTFAMILY.Ionicons}
                  style={{
                    color: COLORS.normal.white,
                    fontSize: SIZES.twenty,
                    // marginRight: SIZES.twenty,
                    position: 'absolute',
                    left: SIZES.ten,
                  }}
                />
                <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: SIZES.ten,
                  borderRadius: SIZES.twentyFive,
                  position: 'absolute',
                  right: -SIZES.fifteen,
                },
              ]}>
              <Icon
                name={'cart'}
                type={FONTFAMILY.Ionicons}
                style={{
                  color: COLORS.primary.cherry,
                  fontSize: SIZES.twentyFive,
                }}
              />
            </View> */}
          </View>
        </View>
      </ScrollView>
      {/* ======================== TOTAL PRICE VIEW END ======================== */}

      <PermissionModal
        isVisible={emptyCartModal}
        text="You already have items in your cart from differant restaurant. Do you want to empty your cart first?"
        onConfirm={() => onEmptyCart()}
        onCancel={() => setEmptyCartModal(false)}
      />
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
