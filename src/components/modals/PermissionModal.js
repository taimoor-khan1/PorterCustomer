import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES, STYLES} from '../../constants';
import MyTouchableOpacity from '../MyTouchableOpacity';

export default function PermissionModal(props) {
  const {isVisible, text, onConfirm, onCancel} = props;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={{
          backgroundColor: COLORS.normal.white,
          padding: SIZES.ten * 2,
          borderRadius: SIZES.ten,
          borderWidth: 1,
          borderColor: COLORS.primary.cherry,
        }}>
        <Text
          style={[
            STYLES.headingText,
            {
              color: COLORS.primary.cherry,
              marginTop: SIZES.five,
              textAlign: 'center',
            },
          ]}>
          Porter Customer
        </Text>
        <Text
          style={[
            STYLES.mediumText,
            {
              marginVertical: SIZES.twenty,
              textAlign: 'center',
              color: COLORS.normal.black,
            },
          ]}>
          {text}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <MyTouchableOpacity
            onPress={onConfirm}
            style={{
              padding: SIZES.ten,
              width: SIZES.fifty,
              alignItems: 'center',
              marginEnd: SIZES.five,
              backgroundColor: COLORS.primary.cherry,
              borderRadius: SIZES.ten,
            }}>
            <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
              Yes
            </Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={onCancel}
            style={{
              padding: SIZES.ten,
              width: SIZES.fifty,
              alignItems: 'center',
              marginStart: SIZES.five,
              backgroundColor: COLORS.primary.cherry,
              borderRadius: SIZES.ten,
            }}>
            <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
              No
            </Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
