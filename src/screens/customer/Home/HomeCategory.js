import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import SearchBar from '../../../components/SearchBar';
import CartHeader from '../../../components/CartHeader';
import LoadableImage from '../../../components/LoadableImage';
import ListEmtyComponent from '../../../components/ListEmtyComponent';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import ItemPlaceholderLoader from '../../../components/ItemPlaceholderLoader';
import PopularRestorantComponant from '../../../components/PopularRestorantComponant';
import {getAllExpertise} from '../../../services/GetAllExpertise';
import {getRecentItems} from '../../../services/GetRecentItems';
import {getHomeData} from '../../../services/GetHomeData';
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

export default function HomeCategory({navigation}) {
  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  const TOKEN = useSelector(state => state.Auth.accessToken);
  const FILTERS = useSelector(state => state.filter);
  // // console.log('FILTERS ======= >>>>>>>> ,', FILTERS);

  const [recentItems, setRecentItems] = useState([]);
  const [popularRestaurants, setPopularResturants] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const DELEVERYDATA = useSelector(state => state.Home.DelieverData);

  useEffect(() => {
    if (FILTERS.isApplied === false) {
      getScreenAllDataContent();
    } else {
      // in case filters are applied then need call different api for respective data
    }
  }, [SELECTEDSECTION]);

  const getScreenAllDataContent = (isRefresh = false) => {
    if (
      SELECTEDSECTION === CONSTANTS.FoodDelievery ||
      SELECTEDSECTION === CONSTANTS.PickUp
    ) {
      getRecentItems(TOKEN, 'restaurant', callback => {
        // // console.log(
        //   'getRecentItems calllllllback == ====== >>>>>>>',
        //   callback.data,
        // );
        setRecentItems(callback.data);
        getAllExpertise(TOKEN, _callback => {
          setExpertise(_callback.data);
          // // console.log(
          //   'getAllExpertise calllllllback == ====== >>>>>>>',
          //   _callback.data,
          // );
        });
        getHomeData(TOKEN, 'restaurant', __callback => {
          setPopularResturants(__callback.data);
          // // console.log(
          //   'setPopularResturants calllllllback == ====== >>>>>>>',
          //   __callback.data,
          // );
          setIsLoading(false);
          setRefreshing(false);
        });
      });
    } else {
      getHomeData(TOKEN, 'grocery', __callback => {
        setPopularResturants(__callback.data);
        // // console.log(
        //   'setPopularResturants grocery wala calllllllback == ====== >>>>>>>',
        //   __callback.data,
        // );
        setIsLoading(false);
        setRefreshing(false);
      });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getScreenAllDataContent(true);
  }, [refreshing]);

  const rendorPopularResturant = ({item}) => {
    return <PopularRestorantComponant item={item} />;
  };

  const rendorRecentItems = ({item}) => {
    return (
      <MyTouchableOpacity
        style={{
          flexDirection: 'row',
          // backgroundColor: 'red',
          marginTop: SIZES.ten,
          alignItems: 'center',
          paddingHorizontal: SIZES.fifteen,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.SingleItem, {item: item});
        }}>
        <View
          style={{
            height: SIZES.twenty * 4,
            width: SIZES.twenty * 4,
          }}>
          <LoadableImage
            style={{
              height: '100%',
              width: '100%',
              borderRadius: SIZES.ten,
            }}
            imageStyle={{
              height: '100%',
              width: '100%',
              borderRadius: SIZES.ten,
            }}
            url={CONSTANTS.API_URLS.IMAGE + item?.image}
            // resizeMode="contain"
          />
        </View>

        <View style={{marginStart: SIZES.ten}}>
          <View>
            <Text style={[FONTS.semiBoldFont18, {color: COLORS.normal.black}]}>
              {item.name}
            </Text>
            <Text
              style={[
                FONTS.mediumFont10,
                {
                  color: COLORS.normal.brownGrey,
                  opacity: 0,
                  // marginVertical: SIZES.five
                },
              ]}></Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                type={FONTFAMILY.Entypo}
                name={'star'}
                style={{
                  fontSize: SIZES.fifteen,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.regularFont14,
                  {color: COLORS.primary.cherry, marginStart: SIZES.five - 2},
                ]}>
                {Number(item?.ratings).toFixed(1)}
              </Text>
            </View>
            <Text
              style={[
                FONTS.mediumFont10,
                {color: COLORS.normal.brownGrey, marginStart: SIZES.ten},
              ]}>
              ({item?.count_ratings} Ratings)
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
    );
  };

  const RecentItemListComponent = () => {
    return (
      <View>
        {recentItems !== undefined && recentItems.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.fifteen,
              paddingBottom: SIZES.fifteen,
            }}>
            <Text style={[FONTS.boldFont18]}>Recent Items</Text>
            {/* <MyTouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.ViewAllCategory, {
                from: 'Most Recent ',
              });
            }}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.primary.cherry}]}>
              View all
            </Text>
          </MyTouchableOpacity> */}
          </View>
        )}

        {isLoading ? (
          <ItemPlaceholderLoader recentItems={true} />
        ) : (
          // recentItems !== undefined &&
          recentItems.length > 0 && (
            <FlatList
              scrollEventThrottle={16}
              bounces={false}
              overScrollMode="never"
              data={recentItems}
              renderItem={rendorRecentItems}
              key={item => item.id}
              contentContainerStyle={{
                paddingBottom: height * 0.13,
              }}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
      </View>
    );
  };

  const ExpertiseListItem = ({item, index}) => {
    return (
      <MyTouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: expertise.length - 1 === index ? 0 : SIZES.fifteen * 1.3,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.Dessert, {
            title: item.name,
            categoryID: null,
            expertiseID: item.id,
          });
        }}>
        <View
          style={{
            height: SIZES.twenty * 5,
            width: SIZES.twenty * 5,

            borderRadius: SIZES.ten,
            overflow: 'hidden',
          }}>
          <LoadableImage
            style={{
              height: '100%',
              width: '100%',
            }}
            imageStyle={{
              height: '100%',
              width: '100%',
            }}
            url={CONSTANTS.API_URLS.IMAGE + item.image}
            resizeMode="cover"
          />
        </View>
        <Text
          style={[
            FONTS.boldFont16,
            {marginTop: SIZES.five, textTransform: 'capitalize'},
          ]}>
          {item.name}
        </Text>
      </MyTouchableOpacity>
    );
  };

  const ExpertiseListComponent = () => {
    return (
      <View>
        {isLoading ? (
          <ItemPlaceholderLoader horizontal={true} />
        ) : (
          expertise.length > 0 && (
            <FlatList
              data={expertise}
              scrollEventThrottle={16}
              bounces={false}
              horizontal
              renderItem={ExpertiseListItem}
              key={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: SIZES.twenty,
                paddingHorizontal: SIZES.fifteen,
              }}
            />
          )
        )}

        {/* ========================   PAPOLAR RESTURANT VIEW START ======================== */}
        <View
          style={{
            marginTop: SIZES.twenty,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.fifteen,
              paddingBottom: SIZES.fifteen,
            }}>
            <Text style={[FONTS.boldFont18]}>Popular Restaurants</Text>
            <MyTouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.ViewAllCategory, {
                  from: 'Popular Resturant',
                });
              }}>
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary.cherry}]}>
                View all
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
        {/* ========================   PAPOLAR RESTURANT VIEW END ======================== */}
      </View>
    );
  };

  const rendorNearbyRestaurantsItem = ({item}) => {
    return (
      <MyTouchableOpacity
        style={{
          marginRight: SIZES.fifteen,
          width: SIZES.twenty * 9,
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            width: SIZES.twenty * 9,
            height: SIZES.twenty * 5.5,
          }}>
          <LoadableImage
            style={{
              height: '100%',
              width: '100%',
              borderRadius: SIZES.ten,
            }}
            imageStyle={{
              height: '100%',
              width: '100%',

              borderRadius: SIZES.ten,
            }}
            url={CONSTANTS.API_URLS.IMAGE + item.image}
            resizeMode="cover"
          />
        </View>
        <View style={{marginTop: SIZES.five}}>
          <Text style={[FONTS.semiBoldFont18, {color: COLORS.normal.black}]}>
            {item?.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.five,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                type={FONTFAMILY.Entypo}
                name={'star'}
                style={{
                  fontSize: SIZES.ten,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.regularFont08,
                  {color: COLORS.primary.cherry, marginStart: SIZES.five - 3},
                ]}>
                {Number(item?.ratings).toFixed(1)}
              </Text>
            </View>
            <Text
              style={[
                FONTS.mediumFont10,
                {color: COLORS.normal.brownGrey, marginStart: SIZES.five - 2},
              ]}
              numberOfLines={1}>
              {'Café Western Food'}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
    );
  };

  const NearbyListComponant = () => {
    return (
      <View>
        {/* ========================   MOSTPAPOLAR RESTURANT VIEW START ======================== */}
        <View
          style={{
            marginTop: SIZES.twenty,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.fifteen,
              paddingBottom: SIZES.fifteen,
            }}>
            <Text style={[FONTS.boldFont18]}>Nearby</Text>
            <MyTouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.ViewAllCategory, {
                  from: 'Nearby',
                });
              }}>
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary.cherry}]}>
                View all
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <View style={{marginVertical: SIZES.ten}}>
            <ItemPlaceholderLoader horizontal={true} />
          </View>
        ) : (
          <FlatList
            data={popularRestaurants}
            scrollEventThrottle={16}
            bounces={false}
            horizontal
            renderItem={rendorNearbyRestaurantsItem}
            key={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.ten,
              paddingHorizontal: SIZES.fifteen,
              marginBottom: SIZES.twenty,
            }}
          />
        )}
      </View>
    );
  };

  const DelieverToComponant = () => {
    return (
      <View>
        <Text
          style={[
            FONTS.mediumFont12,
            {
              color: COLORS.normal.charcoalGrey,
              marginVertical: SIZES.ten,
            },
          ]}>
          Deliver to{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[FONTS.boldFont20]}>Current Location</Text>
          <MyTouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.AddLocation);
            }}>
            <Text
              style={[FONTS.semiBoldFont08, {color: COLORS.primary.cherry}]}>
              Change{' '}
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    );
  };

  const TitleDescriptionForPickUpandGrocery = () => {
    return (
      <View>
        <Text style={[FONTS.semiBoldFont20]}>
          {SELECTEDSECTION === CONSTANTS.PickUp ? 'Pick Up' : 'Grocery'}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.brownGrey, marginTop: SIZES.ten},
          ]}>
          Find discounts, Offers special discount and more!
        </Text>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <View
        style={{
          paddingHorizontal: SIZES.fifteen,
          paddingBottom: SIZES.fifteen,
        }}>
        <CartHeader
          userName={'Anika!'}
          onProfilePressed={() => {
            navigation.navigate(SCREENS.Profle);
          }}
        />
      </View>

      <ScrollView
        overScrollMode="never"
        scrollEventThrottle={16}
        bounces={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{height: height, width: width}}>
        {/* ======================== DELIEVER TO  START ======================== */}
        <View
          style={{
            paddingHorizontal: SIZES.fifteen,
          }}>
          {SELECTEDSECTION === CONSTANTS.FoodDelievery ? (
            <DelieverToComponant />
          ) : (
            <TitleDescriptionForPickUpandGrocery />
          )}
          {SELECTEDSECTION !== CONSTANTS.FoodDelievery && (
            <SearchBar
              style={{marginVertical: SIZES.fifteen}}
              editable={!isLoading}
            />
          )}
        </View>
        {/* ======================== DELIEVER TO  END ======================== */}

        {/* ========================   HORIZANTAL FLATELIST START ======================== */}
        {SELECTEDSECTION === CONSTANTS.FoodDelievery && (
          <ExpertiseListComponent />
        )}

        {/* ========================   HORIZANTAL FLATELIST END ======================== */}

        {/* ========================   PAPOLAR RESTURANT FLATLIS VIEW START ======================== */}
        {isLoading ? (
          <View style={{marginVertical: SIZES.fifteen}}>
            <ItemPlaceholderLoader
              numberOfItems={Platform.OS === 'android' ? 3 : 6}
            />
          </View>
        ) : (
          <FlatList
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode="never"
            data={
              SELECTEDSECTION === CONSTANTS.FoodDelievery
                ? popularRestaurants.slice(0, 4).reverse()
                : popularRestaurants
            }
            renderItem={rendorPopularResturant}
            key={item => item.id}
            contentContainerStyle={{
              paddingBottom:
                SELECTEDSECTION === CONSTANTS.FoodDelievery
                  ? 0
                  : SIZES.twenty * 5,
            }}
            ListEmptyComponent={() => {
              if (SELECTEDSECTION !== CONSTANTS.FoodDelievery) {
                return <ListEmtyComponent message={'No restaurants.'} />;
              } else {
                return null;
              }
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* ========================   PAPOLAR RESTURANT FLATLIS VIEW END ======================== */}

        {/* ======================== MOST FLATELIST START ======================== */}
        {SELECTEDSECTION === CONSTANTS.FoodDelievery && <NearbyListComponant />}

        {/* ========================   MOST FLATELIST END ======================== */}

        {/* ========================   RECENT ITEM START ======================== */}
        {SELECTEDSECTION === CONSTANTS.FoodDelievery && (
          <View>
            <RecentItemListComponent />
          </View>
        )}

        {/* ========================   RECENT ITEM END ======================== */}
      </ScrollView>

      {/* <MyTouchableOpacity
        style={{
          position: 'absolute',
          bottom: SIZES.twenty * 5,
          right: 10,
          padding: SIZES.twenty,
          borderRadius: SIZES.twenty * 2,
          backgroundColor: COLORS.primary.navy,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.Filter);
        }}>
        <Icon
          name="equalizer"
          type={FONTFAMILY.Fontisto}
          style={{fontSize: SIZES.twenty, color: COLORS.normal.white}}
        />
      </MyTouchableOpacity> */}
      {/* ========================   MOSTPAPOLAR RESTURANT VIEW START ======================== */}
    </View>
  );
}

const styles = StyleSheet.create({});

const FavData = [
  {
    id: 1,
    title: 'Offers',
    image:
      'https://static.onecms.io/wp-content/uploads/sites/23/2021/01/07/Best-romantic-desserts-2000.jpg',
    isSelected: true,
  },
  {
    id: 2,
    title: 'Sri Lankan',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Italian',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',

    isSelected: false,
  },
  {
    id: 4,
    title: 'Indian',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
  {
    id: 5,
    title: 'Pakistani',
    image:
      'https://peekaboo.guru/blog/wp-content/uploads/2019/06/Optimized-max-panama-AWFYboL6BE4-unsplash-e1605788495679-1024x535.jpg',
    isSelected: false,
  },
];

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
