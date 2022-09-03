import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS, CONSTANTS, FONTFAMILY, SIZES, IMAGES} from '../constants';

export default function CircularImage(props) {
  const [loading, setLoading] = useState(true);
  const _onLoadEnd = () => {
    setLoading(false);
  };
  return (
    <View style={[props.style, {overflow: 'hidden'}]}>
      <FastImage
        source={
          !props.uri
            ? props.image
            : {
                uri: props.uri,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }
        }
        resizeMode={FastImage.resizeMode.contain}
        style={[styles.image, props.imageStyle]}
        onLoadEnd={_onLoadEnd}
      />
      <ActivityIndicator style={styles.activityIndicator} animating={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: SIZES.twenty * 3,
    width: SIZES.twenty * 3,
    borderRadius: SIZES.twenty * 3,
    // borderWidth: 1,
    borderColor: COLORS.white,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
