import React, {useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {COLORS, CONSTANTS, FONTFAMILY, SIZES, IMAGES} from '../constants';
import CircularImage from './CircularImage';

export default function UserImageWithCrown(props) {
  return (
    <View style={[styles.imageView, {overflow: 'hidden'}, props.style]}>
      <Image source={IMAGES.BGUserImage} style={styles.image} />
      <CircularImage
        image={IMAGES.user1}
        style={{
          height: SIZES.twenty * 2.5,
          width: SIZES.twenty * 2.5,
          borderRadius: SIZES.twenty * 2.5,
        }}
        imageStyle={{
          height: SIZES.twenty * 2.5,
          width: SIZES.twenty * 2.5,
          borderRadius: SIZES.twenty * 2.5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    height: SIZES.twenty * 4,
    width: SIZES.twenty * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: SIZES.twenty * 4,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
