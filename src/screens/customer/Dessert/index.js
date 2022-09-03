import React, {useCallback, useEffect, useState} from 'react';

import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Icon} from 'native-base';
import CartHeader from '../../../components/CartHeader';
import ItemPlaceholderLoader from '../../../components/ItemPlaceholderLoader';
import ListEmtyComponent from '../../../components/ListEmtyComponent';
import LoadableImage from '../../../components/LoadableImage';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import SearchBar from '../../../components/SearchBar';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
  height,
  width,
} from '../../../constants';
import {getItemsByCategory} from '../../../services/GetItemsByCategory';

import utils from '../../../utils';

export default function Dessert(props) {
  const navigation = useNavigation();
  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  const TOKEN = useSelector(state => state.Auth.accessToken);
  const [item, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [initial, setInitial] = useState(true);
  const {categoryID, expertiseID} = props?.route?.params;

  const searchText = e => {
    if (utils.isEmptyOrSpaces(e)) {
      setData(item);
    } else {
      let text = e.toLowerCase();
      let temp = item;
      let filteredList = temp?.filter(item => {
        return (
          item?.description?.toLowerCase().match(text) ||
          item?.name?.toLowerCase().match(text)
        );
      });
      setData(filteredList);
    }
  };

  useEffect(() => {
    getItemsByCategory(
      SELECTEDSECTION === CONSTANTS.FoodDelievery ? 'restaurant' : 'grocery',
      TOKEN,
      categoryID,
      false,
      resp => {
        // // console.log('resp : ', resp);
        if (resp.success === 1) {
          setItems(resp.data);
          setData(resp.data);
          if (resp.isRefreshing) {
            setRefreshing(false);
          } else {
            setTimeout(() => {
              setInitial(false);
            }, 1500);
          }
        } else {
          if (resp.isRefreshing) {
            setRefreshing(false);
          } else {
            setTimeout(() => {
              setInitial(false);
            }, 1500);
          }
        }
      },
      null,
      expertiseID,
    );
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getItemsByCategory(
      SELECTEDSECTION === CONSTANTS.FoodDelievery ? 'restaurant' : 'grocery',
      TOKEN,
      categoryID,
      true,
      resp => {
        if (resp.success === 1) {
          setItems(resp.data);
          setData(resp.data);
          if (resp.isRefreshing) {
            setRefreshing(false);
          } else {
            setTimeout(() => {
              setInitial(false);
            }, 1500);
          }
        } else {
          if (resp.isRefreshing) {
            setRefreshing(false);
          } else {
            setTimeout(() => {
              setInitial(false);
            }, 1500);
          }
        }
      },
    );
  }, [refreshing]);

  const rendorItem = ({item}) => {
    return (
      <MyTouchableOpacity
        style={{marginTop: SIZES.five * 1.5}}
        onPress={() => {
          navigation.navigate(SCREENS.SingleItem, {
            item: item,
          });
        }}>
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

  return (
    <View style={[STYLES.container, {}]}>
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <CartHeader tittle={props.route.params.title} isBackArrow noCart />
        <SearchBar
          disabled={refreshing}
          onChangeText={text => {
            searchText(text);
          }}
          style={{
            marginTop: SIZES.twenty * 1.5,
            marginBottom: SIZES.twenty * 1.5,
          }}
        />
      </View>
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
          data={data}
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
    </View>
  );
}

const styles = StyleSheet.create({});

const FavData = [
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
