import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Marker, AnimatedRegion} from 'react-native-maps';
import {COLORS, CONSTANTS, IMAGES, SIZES} from '../../../constants/theme';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function TrackDriver(props) {
  const TOKEN = useSelector(state => state.Auth.accessToken);

  const markerRef = React.useRef();

  useEffect(() => {
    setInterval(() => {
      getDriverCoordinates();
    }, 20000);
  }, []);

  const [state, setState] = useState({
    coordinate: new AnimatedRegion({
      latitude: 24.90704991804506,
      longitude: 67.07780815207623,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });

  const getDriverCoordinates = () => {
    const onSuccess = ({data}) => {
      // // console.log('rider location data: ', data);
      const coords = {
        latitude: Number(data.data.latitude),
        longitude: Number(data.data.longitude),
      };
      props.onchange(coords);
      animate(coords.latitude, coords.longitude);
      updateState({
        coordinate: coords,
      });
    };

    const onFailure = error => {
      // console.log('driver error response ===============>', error);
    };

    let config = {
      headers: {
        Authorization: TOKEN,
      },
      params: {
        riderID: props.riderId,
      },
    };

    axios
      .get(
        CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_COORDINATES,
        config,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const updateState = data => setState({...state, ...data});

  const {coordinate} = state;

  return (
    <Marker.Animated ref={markerRef} coordinate={coordinate}>
      <View
        style={{
          width: SIZES.ten * 3.4,
          height: SIZES.ten * 3.4,
          borderRadius: SIZES.fifty,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary.navy,
        }}>
        <Image
          resizeMode="contain"
          source={IMAGES.deliveryManMarker}
          style={{
            height: SIZES.twenty,
            width: SIZES.twenty,
            tintColor: COLORS.normal.white,
          }}
        />
      </View>
    </Marker.Animated>
  );
}

const styles = StyleSheet.create({});
