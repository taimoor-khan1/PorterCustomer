import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackArrow from '../../../components/BackArrow';
import CustomButton from '../../../components/CustomButton';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {saveAddress} from '../../../redux/slice/profile';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';

export default function SelectAddress({navigation}) {
  const dispatcher = useDispatch();
  const SELECTEDSECTION = useSelector(state => state.Home.SelectedSection);
  const {selectedAddress} = useSelector(state => state.Profile);
  const {addressList} = useSelector(state => state.Profile);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setAddresses(addressList);
  }, [addressList]);

  const onSelectAddress = async item => {
    await dispatcher(saveAddress(item));
    navigation.goBack();
  };

  const RendorAddress = ({id, address, iconName, iconType, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twenty,
            borderRadius: SIZES.ten,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor:
              selectedAddress?.id === id
                ? COLORS.primary.cherrywithOpacity
                : `${COLORS.normal.charcoalGrey}30`,
            backgroundColor: COLORS.normal.white,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: COLORS.primary.cherry,
              padding: SIZES.ten,
            }}>
            <Icon
              name={iconName}
              type={iconType}
              style={{
                color: COLORS.normal.white,
                fontSize: SIZES.twenty,
              }}
            />
          </View>
          <Text
            numberOfLines={2}
            style={[
              FONTS.regularFont12,
              {
                flex: 1,
                marginHorizontal: SIZES.ten,
                marginVertical: SIZES.five,
              },
            ]}>
            {address}
          </Text>
        </View>

        <View style={STYLES.horLine} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.ten,
            height: SIZES.twenty * 2,
          }}>
          {selectedAddress?.id === id && (
            <Icon
              name={'checkcircleo'}
              type={FONTFAMILY.AntDesign}
              style={{
                color: COLORS.primary.cherry,
                fontSize: 20,
              }}
            />
          )}

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyTouchableOpacity>
              <Icon
                name={'edit'}
                type={FONTFAMILY.AntDesign}
                style={{
                  color: COLORS.primary.cherry,
                  fontSize: 20,
                }}
              />
            </MyTouchableOpacity>
            <MyTouchableOpacity>
              <Icon
                name={'cross'}
                type={FONTFAMILY.Entypo}
                style={{
                  fontSize: 20,
                  color: COLORS.primary.cherry,
                  marginStart: SIZES.ten,
                }}
              />
            </MyTouchableOpacity>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={STYLES.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <BackArrow style={{position: 'absolute', start: SIZES.fifteen}} />
        <Icon
          name="address-book"
          type={FONTFAMILY.FontAwesome}
          style={{fontSize: SIZES.twenty * 1.2}}
        />
        <Text style={[FONTS.semiBoldFont20, {marginStart: SIZES.ten}]}>
          Select Address
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.fifteen,
          marginVertical: SIZES.twenty,
          paddingBottom: SIZES.fifty,
        }}>
        {addresses.map((item, index) => (
          <RendorAddress
            id={item.id}
            address={item.address}
            iconName={
              item.address_name === 'Home'
                ? 'home'
                : item.address_name === 'Work'
                ? 'office-building'
                : 'address'
            }
            iconType={
              item.address_name === 'Home'
                ? FONTFAMILY.FontAwesome
                : item.address_name === 'Work'
                ? FONTFAMILY.MaterialCommunityIcons
                : FONTFAMILY.Entypo
            }
            onPress={() => onSelectAddress(item)}
          />
        ))}
      </ScrollView>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SIZES.fifteen,
          marginBottom: SIZES.twentyFive,
          marginTop: SIZES.ten,
        }}>
        <CustomButton
          label={'Add New Address'}
          style={{
            backgroundColor: COLORS.primary.navy,
            borderRadius: SIZES.ten,
          }}
          onPress={() => {
            navigation.navigate(SCREENS.AddLocation);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
const Data = [
  {
    latitude: '37.784',
    longitude: '-122.405857',
  },
  {
    latitude: '37.78984',
    longitude: '-122.40517',
  },
  {
    latitude: '37.7884',
    longitude: '-122.409117',
  },
  {
    latitude: '37.78184',
    longitude: '-122.40897',
  },
];
