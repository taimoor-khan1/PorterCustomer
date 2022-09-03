import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import Card from '../Card';
import ImagePicker from 'react-native-image-crop-picker';

export default function UploadPhotoModal({
  visibility,
  setVisibility,
  isCircle,
  onImageSelected,
}) {
  //======================= Image Picker From Gallery Methood ================================//
  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: isCircle,
    }).then(image => {
      setVisibility(false);
      onImageSelected(image.path.toString());
    });
  };

  //======================= Image Capture From Camera Methood ================================//
  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: isCircle,
    }).then(image => {
      setVisibility(false);
      onImageSelected(image.path.toString());
    });
  };

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              FONTS.mediumFont16,
              {
                color: COLORS.normal.black,
              },
            ]}>
            Upload Photo
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisibility(false);
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'close-sharp'}
              style={{color: COLORS.primary.cherry, fontSize: 22}}
              //   onPress={() => props.setVisibility(false)}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            FONTS.lightFont12,
            {
              color: COLORS.normal.brownGrey,
            },
          ]}>
          Select a photo from
        </Text>
        <View
          style={{
            marginTop: SIZES.ten * 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Card
            style={[
              styles.viewSelectImageType,
              {
                marginRight: SIZES.ten,
                backgroundColor: COLORS.primary.cherry,
              },
            ]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                takePhotoFromCamera();
              }}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'camera'}
                style={{
                  color: COLORS.normal.white,
                  fontSize: SIZES.twentyFive * 2,
                }}
              />
            </TouchableOpacity>
          </Card>
          <Card
            style={[
              styles.viewSelectImageType,
              {
                marginLeft: SIZES.ten,
                backgroundColor: COLORS.primary.cherry,
              },
            ]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                choosePhotoFromGallery();
              }}>
              <Icon
                type={FONTFAMILY.MaterialIcons}
                name={'photo-library'}
                style={{
                  color: COLORS.normal.white,
                  fontSize: SIZES.twentyFive * 2,
                }}
              />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={{height: SIZES.fifty}} />
      </View>
    );
  };

  return (
    <Modal isVisible={visibility} style={styles.modal}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.normal.white,
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewSelectImageType: {
    flex: 1,
    height: SIZES.fifty * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
