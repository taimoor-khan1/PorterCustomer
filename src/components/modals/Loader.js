import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {height, IMAGES, width} from '../../constants';

export default function Loader(props) {
  const Visibility = useSelector(state => state.Loader.isVisible);

  return (
    <>
      <Modal
        visible={props.visible ? props.visible : Visibility}
        animationIn={'fadeIn'}
        animationInTiming={1500}
        animationOut={'fadeOut'}
        statusBarTranslucent
        animationOutTiming={1500}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height,
            width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.Image
            source={IMAGES.Loader1}
            resizeMode={'contain'}
            style={{height: height * 0.15, width: height * 0.15}}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});
