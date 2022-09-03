import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import Card from '../Card';
import ImagePicker from 'react-native-image-crop-picker';
import EditText from '../EditText';
import CustomButton from '../CustomButton';

export default function AddPromoModal({
  visibility,
  setvisibility,
  onApplyCode,
  setPromoCode,
}) {
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            height: SIZES.five,
            backgroundColor: COLORS.brownGrey,
            width: SIZES.twentyFive * 3,
            alignSelf: 'center',
            borderRadius: 5,
          }}
        />
        <Text style={[FONTS.mediumFont16, {marginVertical: SIZES.ten}]}>
          Add Promo Code
        </Text>
        <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
          Please note that only one promo code can be used applied per ride.
        </Text>
        <EditText
          placeholder="Promo Code"
          style={{marginTop: SIZES.twenty}}
          onChangeText={setPromoCode}
        />
        <CustomButton
          label={'Apply Code'}
          style={{marginTop: SIZES.twenty * 7, marginBottom: SIZES.ten}}
          onPress={() => {
            // setvisibility(false);
            onApplyCode();
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={visibility}
      style={styles.modal}
      onBackdropPress={() => setvisibility(false)}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.normal.white,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
