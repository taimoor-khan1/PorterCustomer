import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {getCurrentLocation, locationPermission} from '../../../helpers';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CustomButton from '../../../components/CustomButton';
import {getAddress} from '../../../redux/slice/profile';
import {show, hide} from '../../../redux/slice/loader';
import BackArrow from '../../../components/BackArrow';
import MapThem from '../Home/Maptheme';
import utils from '../../../utils';
import {
  width,
  FONTS,
  height,
  SCREENS,
  SIZES,
  STYLES,
  COLORS,
  CONSTANTS,
  FONTFAMILY,
} from '../../../constants';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function AddLocation() {
  const dispatcher = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.Auth.accessToken);

  const mapRef = useRef(null);
  const [Selected, setSelected] = useState(null);
  const [placeHolder, setplaceHolder] = useState('Enter Location');
  const [region, setRegion] = useState({
    latitude: 40.7579747,
    longitude: -73.9855426,
    longitudeDelta: LATITUDE_DELTA,
    latitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getLiveLocation();
    });
  }, [navigation]);

  const getLiveLocation = async () => {
    const locPermission = await locationPermission();

    if (locPermission) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      // console.log('latitude, longitude: ', latitude, longitude);
      onCenter(latitude, longitude);
      setRegion({
        latitude: latitude,
        longitude: longitude,
        longitudeDelta: LATITUDE_DELTA,
        latitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  const onCenter = (latitude, longitude) => {
    mapRef?.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      1000,
    );
  };

  const onAddAddress = () => {
    if (placeHolder === 'Enter Location') {
      utils.errorAlert('Please select address!');
      return;
    }

    const onSuccess = ({data}) => {
      // console.log('add address res: ', data);
      dispatcher(getAddress(''));
      navigation.goBack();
      dispatcher(hide());
    };

    const onFailure = error => {
      dispatcher(hide());
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    dispatcher(show());

    const data = {
      latitude: region.latitude,
      longitude: region.longitude,
      address: placeHolder === 'Enter Location' ? '' : placeHolder,
      address_name: Selected === 0 ? 'Home' : Selected === 1 ? 'Work' : 'Other',
    };

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.ADD_ADDRESS}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const GooglePlacesInput = props => {
    return (
      <GooglePlacesAutocomplete
        placeholder={placeHolder}
        keyboardKeyType={'search'}
        onPress={(data, details = null) => {
          setplaceHolder(data.description);
          setRegion({
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
            longitudeDelta: 0.009,
            latitudeDelta: 0.0008,
          });
        }}
        textInputProps={{
          selectionColor: COLORS.primary.cherrywithOpacity,
          placeholderTextColor: COLORS.normal.black,
        }}
        isRowScrollable={false}
        query={{
          key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
          language: 'en',
          types: '',
        }}
        enablePoweredByContainer={false}
        minLength={3}
        fetchDetails={true}
        google
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={row => row.description}
        currentLocation={true}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        predefinedPlaces={[]}
        debounce={200}
        renderRow={renderRow}
        renderRightButton={() => (
          <MyTouchableOpacity
            style={{
              backgroundColor: COLORS.primary.cherry,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
              alignItems: 'center',
              justifyContent: 'center',
              right: -SIZES.five,
              marginLeft: SIZES.five,
            }}
            onPress={() => {
              navigation.navigate(SCREENS.SelectAddress);
            }}>
            <Icon
              type={FONTFAMILY.AntDesign}
              name={'edit'}
              style={{
                color: COLORS.normal.white,
                fontSize: SIZES.twenty,
              }}
            />
          </MyTouchableOpacity>
        )}
        renderLeftButton={() => (
          <Icon
            type={FONTFAMILY.EvilIcons}
            name={'search'}
            style={{
              paddingLeft: SIZES.five,
              fontSize: SIZES.twenty + 5,
              color: COLORS.primary.cherrywithOpacity,
            }}
          />
        )}
        styles={{
          container: [
            {
              overflow: 'hidden',
              zIndex: 100000000000,
              backgroundColor: COLORS.normal.white,
            },
          ],
          row: {
            backgroundColor: COLORS.transparent,
          },
          textInputContainer: {
            overflow: 'hidden',
            alignItems: 'center',
            borderRadius: SIZES.ten,
            paddingHorizontal: SIZES.five,
            backgroundColor: 'white',
          },
          textInput: [
            FONTS.mediumFont14,
            {
              marginTop: SIZES.five,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              textTransform: 'capitalize',
              color: COLORS.normal.black,
            },
          ],
          listView: {
            backgroundColor: COLORS.normal.transparent,
          },
          separator: {
            borderBottomWidth: 0.8,
            borderColor: COLORS.normal.brownGrey,
            backgroundColor: COLORS.normal.transparent,
          },
          description: {
            backgroundColor: COLORS.normal.transparent,
          },
        }}
      />
    );
  };

  const renderRow = (data, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: COLORS.normal.white,
        }}>
        <Icon
          type={FONTFAMILY.Ionicons}
          name={'ios-location-sharp'}
          style={{color: COLORS.primary.navy, fontSize: 22, fontWeigth: 'bold'}}
        />
        <View
          style={{
            alignItems: 'baseline',
            marginLeft: SIZES.ten,
            maxWidth: width / 1.32,
          }}>
          <Text
            style={[FONTS.mediumFont14, {color: COLORS.primary.navy}]}
            numberOfLines={2}>
            {data.description}
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {color: COLORS.normal.black, marginTop: SIZES.five},
            ]}>
            {data['structured_formatting']['secondary_text']}
          </Text>
        </View>
      </View>
    );
  };

  const AddressType = ({title, icon, type, onPress, selected}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          backgroundColor:
            Selected === selected ? COLORS.primary.cherry : COLORS.normal.white,
          paddingVertical: SIZES.fifteen,
          paddingHorizontal: SIZES.twenty * 1.5,
          borderRadius: SIZES.ten,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor:
            Selected === selected ? COLORS.primary.cherry : COLORS.normal.black,
        }}>
        <Icon
          type={type}
          name={icon}
          style={{
            color:
              Selected === selected ? COLORS.normal.white : COLORS.normal.black,
            fontSize: SIZES.body14,
          }}
        />
        <Text
          style={{
            fontSize: SIZES.body12,
            fontFamily: FONTFAMILY.Medium,
            marginTop: 2,
            marginLeft: SIZES.five,
            color:
              Selected === selected ? COLORS.normal.white : COLORS.normal.black,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        region={region}
        style={{flex: 1}}
        mapType="standard"
        showsUserLocation={true}
        customMapStyle={MapThem}
        showsCompass={true}
        loadingIndicatorColor={COLORS.primary.cherry}
        loadingBackgroundColor={COLORS.normal.transparent}
        onRegionChangeComplete={event => {
          setRegion({
            latitude: event.latitude,
            longitude: event.longitude,
            longitudeDelta: event.longitudeDelta,
            latitudeDelta: event.latitudeDelta,
          });
        }}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          // title={marker.title}
          // description={marker.description}
        />
      </MapView>

      {/* ========================  HEADER VIEW START======================== */}

      {/* {Platform.OS === 'ios' && ( */}
      <View
        style={[
          {
            position: 'absolute',
            start: SIZES.fifteen,
            top:
              Platform.OS === 'android'
                ? SIZES.twenty
                : getStatusBarHeight(true),
          },
        ]}>
        <BackArrow />
      </View>
      {/* )} */}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          position: 'absolute',
          top:
            Platform.OS === 'android' ? SIZES.twenty : getStatusBarHeight(true),
        }}>
        <Icon
          name="my-location"
          type={FONTFAMILY.MaterialIcons}
          style={{fontSize: SIZES.twenty * 1.2}}
        />
        <Text style={[FONTS.semiBoldFont20, {marginStart: SIZES.ten}]}>
          Select Address
        </Text>
      </View>

      {/* ========================  HEADER VIEW END======================== */}

      {/* ======================== GOOGLE AUTOCOMPLETE VIEW START======================== */}

      <View style={styles.header}>
        {/* <HeaderOne title={"Add Locations"} /> */}
        <View
          style={{
            backgroundColor: COLORS.normal.white,

            margin: SIZES.fifteen,
            borderRadius: SIZES.ten,
            overflow: 'hidden',
          }}>
          <GooglePlacesInput />
        </View>
      </View>

      {/* ======================== GOOGLE AUTOCOMPLETE VIEW START======================== */}

      {/* ======================== BOTTOM SHEET VIEW START======================== */}

      <View
        style={[
          STYLES.shadow,
          {
            bottom: 0,
            width: '100%',
            position: 'absolute',
            padding: SIZES.twenty,
            paddingHorizontal: SIZES.ten,
            backgroundColor: COLORS.normal.white,
            borderTopLeftRadius: SIZES.twenty * 1.5,
            borderTopRightRadius: SIZES.twenty * 1.5,
          },
        ]}>
        <Text
          style={[
            FONTS.semiBoldFont18,
            {paddingLeft: SIZES.ten, marginVertical: SIZES.fifteen},
          ]}>
          {placeHolder === 'Enter Location' ? '' : placeHolder}
        </Text>

        <View style={{height: 0.3, backgroundColor: COLORS.normal.brownGrey}} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.ten,
            paddingVertical: SIZES.fifteen,
            justifyContent: 'space-between',
          }}>
          <AddressType
            title="Home"
            icon="home"
            type={FONTFAMILY.Ionicons}
            selected={0}
            onPress={() => {
              setSelected(0);
            }}
          />

          <AddressType
            title="Work"
            icon="briefcase"
            type={FONTFAMILY.Ionicons}
            selected={1}
            onPress={() => {
              setSelected(1);
            }}
          />

          <AddressType
            title="Other"
            icon="address"
            type={FONTFAMILY.Entypo}
            selected={2}
            onPress={() => {
              setSelected(2);
            }}
          />
        </View>

        <CustomButton
          label={'Confirm Address'}
          style={{
            backgroundColor: COLORS.primary.navy,
            borderRadius: SIZES.ten,
            marginVertical: SIZES.twenty,
          }}
          onPress={onAddAddress}
        />
      </View>

      {/* ======================== BOTTOM SHEET VIEW END======================== */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    top:
      Platform.OS === 'android'
        ? SIZES.twenty * 2.5
        : getStatusBarHeight(true) + SIZES.twenty * 1.5,
  },
  button: {
    backgroundColor: COLORS.primary.cherry,
    borderRadius: SIZES.twenty,
    width: '80%',
    height: height * 0.05,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
