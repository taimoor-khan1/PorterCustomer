import {useState} from 'react';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
  height,
  width,
  CONSTANTS,
} from '../../../constants';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CartHeader from '../../../components/CartHeader';
import {Icon} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ListEmtyComponent from '../../../components/ListEmtyComponent';
import ItemPlaceholderLoader from '../../../components/ItemPlaceholderLoader';
import {useDispatch} from 'react-redux';
import {getLatestOffers} from '../../../redux/slice/offers';
import {useCallback} from 'react';
import {useEffect} from 'react';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import LoadableImage from '../../../components/LoadableImage';

export default function Offers() {
  const navigation = useNavigation();
  const LatestOffers = useSelector(state => state.latestOffers.latestOffers);
  const dispatcher = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInitial(false);
    }, 2000);
  });
  // // console.log('latestOffers ==== >>>> ', LatestOffers);
  const rendorItem = ({item}) => {
    return (
      <MyTouchableOpacity
        style={{marginTop: SIZES.five * 1.5}}
        onPress={() => {
          navigation.navigate(SCREENS.SingleItem, {
            item: item,
            discounted: true,
          });
        }}>
        <View
          style={{
            backgroundColor: COLORS.primary.cherry,
            borderRadius: SIZES.fifty * 2,
            padding: SIZES.ten,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: SIZES.fifteen,
            top: SIZES.fifteen,
            zIndex: 1,
            transform: [{rotate: '-15deg'}],
          }}>
          <Text
            style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}
            numberOfLines={2}
            adjustsFontSizeToFit
            lineBreakMode={'tail'}
            textBreakStrategy={'highQuality'}>
            {item.discount.split(' ').join('') + '\nOFF'}
          </Text>
        </View>
        <LoadableImage
          imageStyle={{
            height: Platform.OS === 'android' ? height * 0.3 : height * 0.23,
            width: width,
          }}
          url={CONSTANTS.API_URLS.IMAGE + item?.image}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: SIZES.fifteen,
            paddingBottom: SIZES.twenty,
            position: 'absolute',
            bottom: SIZES.ten,
            left: SIZES.ten,
          }}>
          <Text style={[FONTS.boldFont20, {color: COLORS.normal.white}]}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                type={FONTFAMILY.Entypo}
                name={'star'}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
                4.5
              </Text>
            </View>
            <Text
              numberOfLines={3}
              adjustsFontSizeToFit
              lineBreakMode={'tail'}
              textBreakStrategy={'highQuality'}
              style={[
                FONTS.mediumFont14,
                {color: COLORS.normal.white, marginStart: SIZES.five},
              ]}>
              {item.description}
            </Text>
          </View>
        </View>
        {/* </Image> */}
      </MyTouchableOpacity>
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatcher(getLatestOffers(''))
      .unwrap()
      .then(res => {
        setRefreshing(false);
      });
  }, [refreshing]);

  return (
    <View style={[STYLES.container, {}]}>
      <View
        style={{
          paddingHorizontal: SIZES.fifteen,
          paddingBottom: SIZES.fifteen,
        }}>
        <CartHeader tittle={'Latest Offers'} />
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.brownGrey, marginTop: SIZES.ten},
          ]}>
          {' '}
          Find discounts, Offers special meals and more!
        </Text>
      </View>
      {/* ========================   LATES OFFERS FLATLIS VIEW START ======================== */}
      {/* <FlatList
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        data={FavData2}
        renderItem={rendorLatestOffers}
        key={item => item.id}
        contentContainerStyle={{
          paddingBottom: SIZES.twenty * 4.75,
        }}
        showsVerticalScrollIndicator={false}
      /> */}

      {initial ? (
        <View style={{height}}>
          <ItemPlaceholderLoader
            numberOfItems={Platform.OS === 'android' ? 3 : 6}
          />
        </View>
      ) : (
        <FlatList
          scrollEventThrottle={16}
          bounces={true}
          overScrollMode="never"
          data={LatestOffers}
          renderItem={rendorItem}
          key={item => item.id}
          contentContainerStyle={{
            paddingBottom: height * 0.01,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            refreshing || initial ? null : (
              <ListEmtyComponent message={'No items.'} />
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* ========================   LATES OFFERS FLATLIS VIEW END ======================== */}
    </View>
  );
}

const styles = StyleSheet.create({});

const FavData2 = [
  {
    id: 1,
    title: 'French Apple Pie',
    image:
      'https://static.onecms.io/wp-content/uploads/sites/23/2021/01/07/Best-romantic-desserts-2000.jpg',
    isSelected: true,
  },
  {
    id: 2,
    title: 'French Apple Pie',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
  {
    id: 3,
    title: 'French Apple Pie',
    image:
      'https://merriam-webster.com/assets/mw/images/gallery/gal-global-footer-recirc/dessert-words-sundae-5950-749e035682593e91328c62b6630c94b1@1x.jpg',
    isSelected: false,
  },
  {
    id: 4,
    title: 'French Apple Pie',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
  {
    id: 5,
    title: 'French Apple Pie',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
];
