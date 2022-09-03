import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../constants';
import {hide} from '../../redux/slice/error';
import CustomButton from '../CustomButton';

export default function ErrorView() {
  const dispatcher = useDispatch();
  const Message = useSelector(state => state.Error.message);
  const Visibility = useSelector(state => state.Error.isVisible);

  const closeModal = async () => {
    await dispatcher(hide());
  };

  return (
    <Modal
      isVisible={Visibility}
      animationIn={'fadeIn'}
      statusBarTranslucent
      backdropColor={COLORS.normal.black}
      backdropOpacity={0.5}
      animationOut={'fadeOut'}>
      <View
        style={{
          backgroundColor: COLORS.normal.white,
          padding: SIZES.ten,
          borderRadius: SIZES.ten,
        }}>
        <Text
          style={[
            FONTS.boldFont24,
            {
              color: COLORS.normal.black,
              marginTop: SIZES.five,
              textAlign: 'center',
              marginBottom: SIZES.twenty,
            },
          ]}>
          Error!!
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              textAlign: 'center',
              marginBottom: SIZES.ten,
              color: COLORS.normal.black,
            },
          ]}>
          {Message}
        </Text>
        <CustomButton
          label={'OK'}
          style={{marginTop: SIZES.twenty}}
          onPress={closeModal}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
