import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import LoadableImage from '../../../components/LoadableImage';
import CartHeader from '../../../components/CartHeader';
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

export default function Menu({navigation}) {
  const FD_Categories = useSelector(
    state => state.categories.RestaurantCategories,
  );
  const G_Categories = useSelector(state => state.categories.GroceryCategories);

  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);

  const CategoryType = ({name, categoryID, item_count}) => {
    return (
      <MyTouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.Dessert, {
            title: name,
            categoryID: categoryID,
            expertiseID: null,
          });
        }}
        style={[
          STYLES.shadow,
          {
            backgroundColor: COLORS.normal.white,
            marginTop: SIZES.twenty,
            width: '80%',
            paddingVertical: SIZES.fifteen,
            borderTopLeftRadius: SIZES.twenty * 1.2,
            borderTopRightRadius: SIZES.ten,
            borderBottomLeftRadius: SIZES.twenty * 1.2,
            borderBottomRightRadius: SIZES.ten,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <LoadableImage
            imageStyle={{
              height: SIZES.fifteen * 3,
              width: SIZES.fifteen * 3,
              borderRadius: SIZES.fifteen * 3,
            }}
            style={[
              // STYLES.shadow,
              {
                height: SIZES.fifteen * 3,
                width: SIZES.fifteen * 3,
                borderRadius: SIZES.fifteen * 3,
                right: SIZES.fifteen * 1.6,
                zIndex: 1,
              },
            ]}
            source={IMAGES.pizaBackground}
          />
          <View style={{}}>
            <Text style={[FONTS.boldFont20]}>{name}</Text>
            <Text
              style={[
                FONTS.mediumFont14,
                {color: COLORS.normal.brownGrey, marginTop: SIZES.five},
              ]}>
              {item_count} {item_count > 1 ? 'Items' : 'Item'}
            </Text>
          </View>
        </View>
        <View
          style={[
            STYLES.shadow,
            {
              backgroundColor: COLORS.normal.white,
              zIndex: 1,
              left: SIZES.twenty,
              padding: SIZES.five,
              borderRadius: SIZES.twenty,
            },
          ]}>
          <Icon
            type={FONTFAMILY.Entypo}
            name={'chevron-right'}
            style={{
              fontSize: SIZES.twentyFive,
              color: COLORS.primary.cherry,
            }}
          />
        </View>
      </MyTouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.ten * 1.3
              : getStatusBarHeight(true),
          backgroundColor: COLORS.normal.white,
        },
      ]}>
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <CartHeader tittle={'Menu'} noCart />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.fifteen,
          paddingVertical: SIZES.fifty * 0.5,
        }}>
        <View
          style={{
            left: 0,
            width: '30%',
            position: 'absolute',
            top: SIZES.fifty * 0.5,
            height: G_Categories.length * SIZES.fifty * 0.63,
            borderTopRightRadius: SIZES.twenty * 2.5,
            borderBottomRightRadius: SIZES.twenty * 2.5,
            backgroundColor: COLORS.primary.cherry,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {SELECTEDSECTION === CONSTANTS.FoodDelievery &&
            FD_Categories?.slice(0, 6)?.map((item, index) => (
              <CategoryType
                key={index}
                name={item.name}
                categoryID={item.id}
                item_count={item?.item_count}
              />
            ))}

          {SELECTEDSECTION === CONSTANTS.PickUp &&
            FD_Categories?.slice(0, 6)?.map((item, index) => (
              <CategoryType
                key={index}
                name={item.name}
                categoryID={item.id}
                item_count={item?.item_count}
              />
            ))}

          {SELECTEDSECTION === CONSTANTS.Grocery &&
            G_Categories?.slice(0, 6)?.map((item, index) => (
              <CategoryType
                key={index}
                name={item.name}
                categoryID={item.id}
                item_count={item?.item_count}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
