import React, {useState} from 'react';
import {Icon} from 'native-base';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import CircularImage from '../../../components/CircularImage';
import EditText from '../../../components/EditText';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
} from '../../../constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CartHeader from '../../../components/CartHeader';
import CustomButton from '../../../components/CustomButton';
import UploadPhotoModal from '../../../components/modals/UploadPhotoModal';
import {useDispatch, useSelector} from 'react-redux';
import {hide, show} from '../../../redux/slice/loader';
import utils from '../../../utils';
import axios from 'axios';
import {profile} from '../../../redux/slice/profile';

export default function EditProfile({route, navigation}) {
  const dispatcher = useDispatch();
  const User = useSelector(state => state.Profile.profile);
  const token = useSelector(state => state.Auth.accessToken);

  const {email, country_code} = User;

  const [name, setName] = useState(User.name);
  const [phone, setPhone] = useState(User.phone);
  const [address, setaddress] = useState(User.address);
  const [image, setImage] = useState(' ');

  const [identity, setIdentity] = useState();
  const [visibility, setVisibility] = useState(false);
  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] =
    useState(false);
  const [countryCode, setCountryCode] = useState('+' + country_code);
  const [borderColor, setBorderColor] = useState(COLORS.normal.charcoalGrey);

  const toggleIsCountryCodePickerVisible = () => {
    setisCountryCodePickerVisible(!isCountryCodePickerVisible);
  };

  const onSelect = country => {
    setCountryCode(
      !country.callingCode[0].includes('+')
        ? `+${country.callingCode[0]}`
        : country.callingCode[0],
    );
  };

  const updateProfile = () => {
    const body = {
      name: name,
      phone: phone,
      address: address,
      country_code: countryCode.replaceAll('+', ''),
      image:
        image === '' || image === ' ' || image === null || image === undefined
          ? CONSTANTS.API_URLS.IMAGE + User.image
          : image,
    };

    const formData = new FormData();

    for (var [key, value] of Object.entries(body)) {
      if (key === 'image') {
        if (
          image === '' ||
          image === ' ' ||
          image === null ||
          image === undefined
        ) {
        } else {
          // console.log(' =========== key : ', key, '   value : ', value);
          formData.append('image', {
            ...image,
            uri:
              Platform.OS === 'android' ? image : image.replace('file:///', ''),
            type: 'image/jpg',
            name: `profile_picture.jpg`,
          });
        }
      } else {
        // console.log('key : ', key, '   value : ', value);
        formData.append(key, value);
      }
    }

    const onSuccess = ({data}) => {
      // console.log('sadasdassad ======= ', data);
      dispatcher(profile(false, false))
        .unwrap()
        .then(_reponse => {
          // console.log('onSuccess update profile ====== ', _reponse);
          dispatcher(hide());
          navigation.goBack();
        });
    };

    const onFailure = error => {
      // console.log('sdasdsaasd ===== ', error.response);
      dispatcher(hide());
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.UPDATE_PROFILE}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View
      style={[
        {
          paddingHorizontal: SIZES.fifteen,
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.ten * 1.3
              : getStatusBarHeight(true),
        },
      ]}>
      {/* <StatusBar
        backgroundColor={COLORS.primary.navy}
        barStyle={"dark-content"}
      /> */}
      <CartHeader tittle={'Profile Edit'} isBackArrow noCart />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{}}>
          <CircularImage
            uri={image === ' ' ? CONSTANTS.API_URLS.IMAGE + User.image : image}
            imageStyle={{
              height: SIZES.twentyFive * 4,
              width: SIZES.twentyFive * 4,
              borderRadius: SIZES.twentyFive * 4,
            }}
          />

          <TouchableOpacity
            style={[
              STYLES.shadow,
              {
                height: SIZES.fifty * 0.4,
                width: SIZES.fifty * 0.4,
                borderRadius: SIZES.fifty * 0.4,
                position: 'absolute',
                bottom: 2.5,
                right: 2.5,
                backgroundColor: COLORS.primary.cherry,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => {
              setVisibility(true);
            }}
            activeOpacity={0.7}>
            <Icon
              name={'camera'}
              type={FONTFAMILY.EvilIcons}
              style={{
                fontSize: SIZES.twenty,
                color: COLORS.normal.white,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.mediumFont14, {marginTop: SIZES.five}]}>
          Hi there {name.split(' ')[0]}!
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{
          paddingTop: SIZES.ten,
          paddingBottom: 150,
        }}>
        <View style={{}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            Name
          </Text>
          <EditText placeholder="Name" value={name} onChangeText={setName} />
        </View>

        <View style={{marginTop: SIZES.twenty}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            Email Address
          </Text>
          <EditText
            placeholder="Email Address"
            value={email}
            editable={false}
          />
        </View>
        {/* <View style={{marginTop: SIZES.twenty}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginBottom: SIZES.five,
                marginLeft: SIZES.fifteen * 0.6,
              },
            ]}>
            phone
          </Text>
          <EditText placeholder="Phone Number" value={phone.toString()} />
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
            borderRadius: SIZES.fifty,
            borderWidth: 1,
            borderColor: borderColor,
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen * 1.3,
          }}
          activeOpacity={1}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleIsCountryCodePickerVisible()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: SIZES.fifteen,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountryPicker
                onSelect={onSelect}
                countryCode={countryCode}
                visible={isCountryCodePickerVisible}
                withCallingCode
                withFlagButton={false}
                theme={{
                  fontFamily: FONTFAMILY.Medium,
                  resizeMode: 'contain',
                }}
              />
              <Text style={[FONTS.mediumFont14, {color: COLORS.BLACK}]}>
                {countryCode}
              </Text>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'chevron-down'}
                style={{
                  color: COLORS.normal.black,
                  fontSize: 20,
                  marginLeft: SIZES.five,
                }}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            selectionColor={COLORS.normal.black}
            placeholderTextColor={COLORS.normal.charcoalGrey}
            placeholder="Enter Phone Number"
            value={phone}
            onChangeText={txt => {
              setPhone(txt);
            }}
            style={[
              FONTS.mediumFont14,
              {
                flex: 1,
                color: COLORS.normal.black,
              },
            ]}
            onFocus={() => {
              setBorderColor(COLORS.primary.cherry);
            }}
            onBlur={() => {
              setBorderColor(COLORS.normal.charcoalGrey);
            }}
          />
        </View>

        <View style={{marginTop: SIZES.twenty}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginBottom: SIZES.five,
                marginLeft: SIZES.fifteen * 0.6,
              },
            ]}>
            Address
          </Text>
          <EditText
            placeholder="Address"
            value={address}
            onChangeText={setaddress}
          />
        </View>

        <CustomButton
          label={'Save'}
          style={{marginTop: SIZES.twenty * 2}}
          onPress={() => {
            updateProfile();
          }}
        />
      </ScrollView>

      <UploadPhotoModal
        visibility={visibility}
        setVisibility={setVisibility}
        isCircle
        onImageSelected={image => {
          setImage(image);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

const identities = [
  {id: 1, name: 'something'},
  {id: 2, name: 'something1'},
  {id: 3, name: 'something2'},
];
