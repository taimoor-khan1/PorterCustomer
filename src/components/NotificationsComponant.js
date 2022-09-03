import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import linearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  STYLES,
  SIZES,
  height,
  width,
} from '../constants';
import CircularImage from './CircularImage';
import {Icon} from 'native-base';
import Row from './Row';
import LinearGradient from 'react-native-linear-gradient';

const NotificationsComponant = props => {
  const [cardshadow, setcardshadow] = useState(true);

  const leftSwipe = (progress, dragX) => {
    return (
      <LinearGradient
        colors={[COLORS.primary, COLORS.crimson]}
        style={styles.deletButton}>
        <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.7}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name="ios-trash-outline"
            style={{
              color: COLORS.white,
              alignSelf: 'center',
              fontSize: SIZES.twentyFive,
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <View>
      <Swipeable
        renderRightActions={leftSwipe}
        childrenContainerStyle={{}}
        containerStyle={{
          position: 'relative',
          overflow: 'scroll',
          paddingVertical: SIZES.ten,
          borderRadius: SIZES.fifteen,
        }}
        onSwipeableWillClose={() => {
          setcardshadow(true);
        }}
        onSwipeableRightWillOpen={() => {
          setcardshadow(false);
        }}>
        <View style={[cardshadow ? styles.card : styles.shadow, {}]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CircularImage image={IMAGES.user1} />
            <View style={{flex: 1, marginHorizontal: SIZES.ten}}>
              <Text style={[FONTS.mediumFont14]} numberOfLines={3}>
                {props.data.name}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
      <View style={[STYLES.horLine, {marginVertical: 0}]} />
    </View>
  );
};

export default NotificationsComponant;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.ten,
  },
  shadow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.ten,
  },
  deletButton: {
    paddingHorizontal: SIZES.ten,
    marginVertical: SIZES.ten,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: SIZES.fifteen,
    borderTopLeftRadius: SIZES.fifteen,
    backgroundColor: COLORS.secondary,
  },
});
