import React, {useRef, useState, useEffect} from 'react';
import {View, Linking, Platform, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getCurrentLocation, locationPermission} from '../../../helpers';
import RiderTrackingCard from '../../../components/RiderTrackingCard';
import CartHeader from '../../../components/CartHeader';
import {SIZES, width} from '../../../constants/theme';
import {COLORS, SCREENS} from '../../../constants';
import TrackDriver from './TrackDriver';
import Maptheme from '../Home/Maptheme';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function TrackMyOrder({navigation, route}) {
  const mapRef = useRef(null);
  const {rider, order, customer} = route.params;
  const [region, setRegion] = useState({
    latitude: 40.7579747,
    longitude: -73.9855426,
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
      setRegion({
        latitude: latitude,
        longitude: longitude,
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
      1500,
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        mapType="standard"
        showsUserLocation={false}
        region={{
          ...region,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        customMapStyle={Maptheme}
        showsCompass={true}
        loadingIndicatorColor={COLORS.primary.cherry}
        loadingBackgroundColor={COLORS.primary.navy}
        style={{flex: 1}}>
        <TrackDriver
          riderId={rider?.id}
          onchange={coords => onCenter(coords.latitude, coords.longitude)}
        />
      </MapView>

      {/* ========================  HEADER VIEW START======================== */}

      <View
        style={{
          width: width,
          marginTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.7
              : getStatusBarHeight(true),
          paddingHorizontal: SIZES.fifteen,
          position: 'absolute',
        }}>
        <CartHeader tittle={`Order ID #${order?.id}`} isBackArrow noCart />
      </View>

      {/* ========================  HEADER VIEW END======================== */}

      <RiderTrackingCard
        rider={rider}
        order={order}
        customer={customer}
        onChatPress={() => {
          navigation.navigate(SCREENS.Chat, {
            rider_data: rider,
            order_data: order,
          });
        }}
        onCallPress={() => {
          Linking.openURL(`tel://0${rider?.phone}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
