import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import {COLORS, SIZES, FONTFAMILY, FONTS} from '../constants';

const MenuItem = props => {
  const {addItemToTheCart, cart, dish} = props;
  const inCart = cart.find(item => item.id === dish.id);

  return (
    <TouchableWithoutFeedback onPress={e => addItemToTheCart(dish)}>
      <View style={[style.menuItemContainer]}>
        <Text style={style.menuItemTitle}>{dish.name}</Text>
        <Text style={style.price}>TK {dish.price}</Text>
        {inCart && (
          <View style={[style.circle]}>
            <Text style={[style.quantity]}>
              {' '}
              {inCart ? inCart.quantity : 0}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const MEMO = (prev, next) => {
  return next.itemQuantity !== prev.itemQuantity ? false : true;
};

export default React.memo(MenuItem, MEMO);

const style = StyleSheet.create({
  menuItemContainer: {
    paddingVertical: SIZES.ten,
    borderBottomWidth: 1,
    borderColor: COLORS.normal.brownGrey,
    position: 'relative',
  },
  menuItemTitle: {
    textTransform: 'capitalize',
    marginBottom: SIZES.five,
  },
  price: {
    color: COLORS.normal.brownGrey,
  },
  quantity: {
    color: COLORS.normal.white,
    textAlign: 'center',
    marginLeft: -SIZES.five,
  },
  circle: {
    width: SIZES.twentyFive,
    height: SIZES.twentyFive,
    backgroundColor: COLORS.primary.cherry,
    justifyContent: 'center',
    borderRadius: SIZES.twenty,
    position: 'absolute',
    right: 0,
    top: SIZES.fifteen,
  },
});
