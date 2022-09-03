import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import {DatePicker} from 'react-native-date-picker';
import AddNotesModal from './AddNotesModal';

export default function CustomizeOrderModal({sheetRef}) {
  const [showAddNoted, setshowAddNoted] = useState(false);
  const [pizzaDough, setpizzaDough] = useState('Plain');
  // const [pizzaDough, setpizzaDough] = useState('Plain');

  const CustomRadionButton = ({onPress, style, name}) => {
    return (
      <View
        style={[
          style,
          {
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.31,
            alignSelf: 'center',
            marginLeft: SIZES.five,
            marginVertical: SIZES.five,
          },
        ]}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Icon
            name={
              name === pizzaDough
                ? 'checkmark-circle-sharp'
                : 'radio-button-off'
            }
            type={FONTFAMILY.Ionicons}
            style={{
              color: COLORS.primary.cherry,
              fontSize: SIZES.twenty * 1,
            }}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={2}
          style={[
            FONTS.mediumFont12,
            {color: COLORS.normal.brownGrey, marginStart: SIZES.five - 2},
          ]}>
          {name}
        </Text>
      </View>
    );
  };

  const rendorFreshVegitable = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: SIZES.ten,
          // backgroundColor: "red",
        }}>
        <CustomRadionButton name={item.title} isSelected={item.isSelected} />
      </View>
      // </View>
    );
  };

  const rendorDrinks = ({item, index}) => {
    return (
      <View
        style={
          {
            // backgroundColor: "red",
          }
        }>
        <CustomRadionButton name={item.title} isSelected={item.isSelected} />
      </View>
      // </View>
    );
  };

  const renderContent = () => (
    <View
      style={[
        STYLES.shadow,
        {
          backgroundColor: 'white',
          padding: SIZES.fifteen,
          height: height,
          borderTopLeftRadius: SIZES.twentyFive,
          borderTopRightRadius: SIZES.twentyFive,
        },
      ]}>
      <View
        style={{
          height: 5,
          borderRadius: SIZES.twenty,
          backgroundColor: `${COLORS.normal.brownGrey}85`,
          width: width * 0.2,
          alignSelf: 'center',
          marginBottom: SIZES.fifteen,
        }}
      />
      <Text
        style={[
          FONTS.semiBoldFont16,
          {
            color: COLORS.primary.cherry,
            alignSelf: 'center',
          },
        ]}>
        Customize Your Order
      </Text>

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.boldFont18]}>Barita</Text>
        <Text
          style={[
            FONTS.mediumFont12,
            {color: COLORS.normal.brownGrey, marginTop: SIZES.ten},
          ]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>

      {/* ======================== Choose Your Pizza Dough VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          Choose Your Pizza Dough
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomRadionButton
            name={'Plain'}
            onPress={() => {
              setpizzaDough('Plain');
            }}
          />
          <CustomRadionButton
            name={'Crust'}
            onPress={() => {
              setpizzaDough('Crust');
            }}
          />
          <CustomRadionButton
            name={'Thin'}
            onPress={() => {
              setpizzaDough('Thin');
            }}
          />
        </View>
      </View>

      {/* ======================== Choose Your Pizza Dough VIEW  END ======================== */}

      {/* ======================== Choose Your Fresh Vegetable VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          Choose Your Fresh Vegetable
        </Text>

        <FlatList
          data={VegitableData}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          renderItem={rendorFreshVegitable}
          numColumns={3}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={
            {
              // paddingHorizontal: SIZES.fifteen,
              // paddingBottom: SIZES.twenty,
              // backgroundColor: "red",
            }
          }
        />
      </View>
      {/* ======================== Choose Your Fresh Vegetable VIEW  START ======================== */}

      {/* ======================== Extra Cheese VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          Extra Cheese
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomRadionButton name={'Mozrella Cheese'} />
          <CustomRadionButton name={'Cheddar Cheese'} isSelected={true} />
          <CustomRadionButton name={'No Cheese'} />
        </View>
      </View>
      {/* ======================== Extra Cheese VIEW  END ======================== */}

      {/* ======================== SALAS VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          Salsa
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomRadionButton name={'Spicy'} />
          <CustomRadionButton name={'Sweet Spicy'} isSelected={true} />
          <CustomRadionButton name={'No Spice'} />
        </View>
      </View>
      {/* ======================== SALAS VIEW  END ======================== */}

      {/* ======================== Choose Your DRINK VIEW  START ======================== */}

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          Choose Your Drink
        </Text>

        <FlatList
          data={DrinkData}
          key={'_'}
          keyExtractor={item => '_' + item.id}
          renderItem={rendorDrinks}
          numColumns={3}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={
            {
              // paddingBottom: SIZES.twenty,
              // backgroundColor: "red",
            }
          }
        />
      </View>
      {/* ======================== Choose Your DRINK VIEW  START ======================== */}

      {/* ======================== Any Special InstrusctionsVIEW  START ======================== */}

      <View
        style={{
          marginTop: SIZES.twenty,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[FONTS.semiBoldFont16, {color: COLORS.normal.black}]}>
          Any Special Instrusctions
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
          onPress={() => {
            setshowAddNoted(true);
          }}>
          <Icon
            name={'ios-add'}
            type={FONTFAMILY.Ionicons}
            style={{
              color: COLORS.primary.cherry,
              fontSize: SIZES.twenty * 1.2,
            }}
          />
          <Text style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
            Add Notes
          </Text>
        </TouchableOpacity>
      </View>
      {/* ======================== Any Special InstrusctionsVIEW  END ======================== */}

      <View
        style={{
          padding: SIZES.fifteen,
          backgroundColor: 'red',
          backgroundColor: COLORS.primary.cherry,
          justifyContent: 'center',
          marginTop: SIZES.twenty * 1.5,
          borderRadius: SIZES.ten,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingHorizontal: SIZES.twentyFive,
          }}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
              Add to order
            </Text>
          </TouchableOpacity>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
            100 USD
          </Text>
        </View>
      </View>

      <AddNotesModal
        visibility={showAddNoted}
        setvisibility={setshowAddNoted}
      />
    </View>
  );

  // const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          backgroundColor: 'papayawhip',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        /> */}
      </View>
      <BottomSheet
        ref={sheetRef}
        enabledInnerScrolling={true}
        enabledBottomInitialAnimation={false}
        enabledBottomClamp={false}
        initialSnap={2}
        snapPoints={[height - SIZES.twenty * 6.4, 100, 0]}
        // borderRadius={}
        renderContent={renderContent}
      />
    </>
  );
}

const VegitableData = [
  {
    id: 1,
    title: 'Black Olive',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Broccoli',

    isSelected: true,
  },
  {
    id: 3,
    title: 'Green pepper',

    isSelected: false,
  },
  {
    id: 4,
    title: 'Mushroom',

    isSelected: true,
  },
  {
    id: 5,
    title: 'Onion',

    isSelected: false,
  },
  {
    id: 6,
    title: 'Tomatos',

    isSelected: true,
  },
  {
    id: 7,
    title: 'Potatoes',

    isSelected: false,
  },
  {
    id: 8,
    title: 'Black Pepper',

    isSelected: true,
  },
  {
    id: 9,
    title: 'Cucumber',

    isSelected: false,
  },
  {
    id: 10,
    title: 'Dessert',

    isSelected: true,
  },
  {
    id: 11,
    title: 'Breakfast',

    isSelected: false,
  },
];

const DrinkData = [
  {
    id: 1,
    title: 'Pepsi',
    isSelected: false,
  },
  {
    id: 2,
    title: 'Coca Cola',

    isSelected: true,
  },
  {
    id: 3,
    title: 'Sprite',

    isSelected: false,
  },
  {
    id: 4,
    title: 'Marinda',

    isSelected: true,
  },
  {
    id: 5,
    title: 'Fanta',

    isSelected: false,
  },
  {
    id: 6,
    title: '7up',

    isSelected: false,
  },
];
