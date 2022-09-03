import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Slider from '@react-native-community/slider';
import BackArrow from '../../../components/BackArrow';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {COLORS, FONTS, SIZES, STYLES, width} from '../../../constants';
import CustomButton from '../../../components/CustomButton';

export default function Filter({navigation}) {
  const [selectedType, setselectedType] = useState('');
  const [selectedCatData, setselectedCatData] = useState([]);
  const [CategoryData, setCategoryData] = useState(CatData);
  const [price, setPrice] = useState(0);
  const [selctedDistance, setSelctedDistance] = useState('');

  const onCategoryItemPress = (id, type) => {
    let newArray = CategoryData.map((val, i) => {
      if (val.id === id) {
        return {...val, isSelected: type};
      }
      return val;
    });
    setCategoryData(newArray);
  };

  const onSelectedItem = (id, type) => {
    let newArray = CategoryData.filter((val, i) => {
      if (val.isSelected === true) {
        return val;
      }
    });
  };

  const FilterTypeComponant = ({name}) => {
    return (
      <MyTouchableOpacity
        style={[
          STYLES.shadow,
          {
            backgroundColor:
              selectedType === name ? COLORS.primary.cherry : '#f1ecec',
            width: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: SIZES.ten,
            marginRight: SIZES.twenty,
            borderRadius: SIZES.five,
          },
        ]}
        onPress={() => {
          setselectedType(name);
        }}>
        <Text
          style={[
            FONTS.regularFont14,
            {
              color:
                selectedType === name
                  ? COLORS.normal.white
                  : COLORS.normal.charcoalGrey,
            },
          ]}>
          {name}
        </Text>
      </MyTouchableOpacity>
    );
  };

  const rendorCategory = ({item, index}) => {
    return (
      <MyTouchableOpacity
        style={[
          STYLES.shadow,
          {
            backgroundColor: item.isSelected
              ? COLORS.primary.cherry
              : '#f1ecec',

            paddingVertical: SIZES.ten,
            marginRight: SIZES.fifteen + 2,
            borderRadius: SIZES.five,
            marginTop: SIZES.twenty,
            width: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        onPress={() => onCategoryItemPress(item.id, !item.isSelected)}>
        <Text
          style={[
            FONTS.regularFont12,
            {
              color: item.isSelected
                ? COLORS.normal.white
                : COLORS.normal.charcoalGrey,
            },
          ]}>
          {item.title}
        </Text>
      </MyTouchableOpacity>
    );
  };

  const rendorDisance = ({item, index}) => {
    return (
      <MyTouchableOpacity
        style={[
          STYLES.shadow,
          {
            backgroundColor:
              selctedDistance === item.id ? COLORS.primary.cherry : '#f1ecec',
            width: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: SIZES.ten,
            marginRight: SIZES.twenty,
            borderRadius: SIZES.five,
            marginTop: SIZES.twenty,
          },
        ]}
        onPress={() => {
          setSelctedDistance(item.id);
        }}>
        <Text
          style={[
            FONTS.regularFont12,
            {
              color:
                selctedDistance === item.id
                  ? COLORS.normal.white
                  : COLORS.normal.charcoalGrey,
            },
          ]}>
          1-5 km
        </Text>
      </MyTouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={[{flex: 1}]}
      scrollEventThrottle={16}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: SIZES.twenty * 5}}>
      {/* ======================== HEADER VIEW  START ======================== */}
      <View
        style={{
          backgroundColor: COLORS.primary.cherry,
          padding: SIZES.fifteen,
          borderBottomRightRadius: SIZES.twenty * 1.5,
        }}>
        <View
          style={{
            marginTop:
              Platform.OS === 'android' ? SIZES.ten : getStatusBarHeight(true),
          }}>
          <BackArrow
            arrowColor={COLORS.normal.white}
            style={{bottom: SIZES.twenty}}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: SIZES.twenty,
            }}>
            <Text style={[FONTS.boldFont24, {color: COLORS.normal.white}]}>
              Filter
            </Text>
            <MyTouchableOpacity
              onPress={() => {
                let newArray = CategoryData.map((val, i) => {
                  return {...val, isSelected: false};
                });
                setCategoryData(newArray);
                setSelctedDistance('');
                setselectedType('');
                setPrice(0);
              }}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}>
                Reset
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </View>
      {/* ======================== HEADER VIEW  END ======================== */}

      {/* ======================== TYPW VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty, paddingHorizontal: SIZES.fifteen}}>
        <Text style={[FONTS.mediumFont16, {color: COLORS.normal.charcoalGrey}]}>
          Type
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            marginTop: SIZES.twenty,
          }}>
          <FilterTypeComponant name={'All'} />
          <FilterTypeComponant name={'Grocery'} />
          <FilterTypeComponant name={'Pick Up'} />
        </View>
        <View style={{marginTop: SIZES.twenty}}>
          <FilterTypeComponant name={'Delivery'} />
        </View>
      </View>
      {/* ======================== TYPW VIEW  START ======================== */}

      {/* ======================== CATEGORY VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text
          style={[
            FONTS.mediumFont16,
            {color: COLORS.normal.charcoalGrey, paddingLeft: SIZES.fifteen},
          ]}>
          {' '}
          Category
        </Text>

        <FlatList
          data={CategoryData}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          renderItem={rendorCategory}
          numColumns={4}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={{
            paddingHorizontal: SIZES.fifteen,
            paddingBottom: SIZES.twenty,
          }}
        />
      </View>
      {/* ======================== CATEGORY VIEW  END ======================== */}

      {/* ======================== CHOOSE YOUR PRICE VIEW  START ======================== */}

      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.normal.charcoalGrey}]}>
          Choose your Price Range
        </Text>

        <Slider
          style={{
            width: '100%',
            height: SIZES.fifteen,
            marginTop: SIZES.twenty,
          }}
          value={price}
          minimumValue={0}
          maximumValue={100}
          tapToSeek={true}
          // step={1}
          onSlidingComplete={val => {
            setPrice(parseInt(val));
          }}
          minimumTrackTintColor={COLORS.primary.cherry}
          maximumTrackTintColor={COLORS.normal.brownGrey}
          thumbTintColor={COLORS.primary.cherry}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.twenty,
          }}>
          <Text style={[FONTS.regularFont12, {color: COLORS.primary.cherry}]}>
            $5
          </Text>
          <Text style={[FONTS.regularFont12, {color: COLORS.primary.cherry}]}>
            ${price}
          </Text>
        </View>
      </View>
      {/* ======================== CHOOSE YOUR PRICE VIEW  END ======================== */}

      {/* ======================== DISTANCE FROM LOACTION  VIEW  START ======================== */}
      <View style={{marginTop: SIZES.twenty, paddingHorizontal: SIZES.fifteen}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[FONTS.mediumFont18, {color: COLORS.normal.charcoalGrey}]}>
            Distance from your location
          </Text>
          <MyTouchableOpacity>
            <Text
              style={[FONTS.lightFont10, {color: COLORS.normal.charcoalGrey}]}>
              Clear All
            </Text>
          </MyTouchableOpacity>
        </View>

        <FlatList
          data={DistanceData}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          renderItem={rendorDisance}
          horizontal
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SIZES.fifteen,
            paddingBottom: SIZES.twenty,
          }}
        />

        <CustomButton
          label={'Apply Filter'}
          style={{marginTop: SIZES.twenty}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      {/* ======================== DISTANCE FROM LOACTION  VIEW  END ======================== */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

const CatData = [
  {
    id: 1,
    title: 'Fast Food',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Pizza',

    isSelected: false,
  },
  {
    id: 3,
    title: 'Sushi',

    isSelected: false,
  },
  {
    id: 4,
    title: 'Dessert',

    isSelected: false,
  },
  {
    id: 5,
    title: 'Breakfast',

    isSelected: false,
  },
  {
    id: 6,
    title: 'Breakfast',

    isSelected: false,
  },
  {
    id: 7,
    title: 'Chinese',

    isSelected: false,
  },
  {
    id: 8,
    title: 'Soup',

    isSelected: false,
  },
  {
    id: 9,
    title: 'Italian',

    isSelected: false,
  },
  {
    id: 10,
    title: 'Dinner',

    isSelected: false,
  },
  {
    id: 11,
    title: 'Burgers',

    isSelected: false,
  },
  {
    id: 12,
    title: 'Vegan',

    isSelected: false,
  },
  {
    id: 13,
    title: 'Healthy',

    isSelected: false,
  },
];

const DistanceData = [
  {
    id: 1,
    title: 'Fast Food',
    isSelected: true,
  },
  {
    id: 2,
    title: 'Pizza',

    isSelected: false,
  },
  {
    id: 3,
    title: 'Sushi',

    isSelected: false,
  },
  {
    id: 4,
    title: 'Dessert',

    isSelected: false,
  },
  {
    id: 5,
    title: 'Breakfast',

    isSelected: false,
  },
  {
    id: 6,
    title: 'Breakfast',

    isSelected: false,
  },
  {
    id: 7,
    title: 'Chinese',

    isSelected: false,
  },
  {
    id: 8,
    title: 'Soup',

    isSelected: false,
  },
  {
    id: 9,
    title: 'Italian',

    isSelected: false,
  },
  {
    id: 10,
    title: 'Dinner',

    isSelected: false,
  },
  {
    id: 11,
    title: 'Burgers',

    isSelected: false,
  },
  {
    id: 12,
    title: 'Vegan',

    isSelected: false,
  },
  {
    id: 13,
    title: 'Healthy',

    isSelected: false,
  },
];
