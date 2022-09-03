import React, {useState} from 'react';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import MessageEditText from '../MessageEditText';
import CustomButton from '../CustomButton';

export default function AddNotesModal(props) {
  const {note, setNote, visibility, setvisibility} = props;
  const [value, setValue] = useState(note);

  const onPressConfirm = () => {
    setNote(value);
    setvisibility(false);
  };

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
          Add Notes
        </Text>

        <MessageEditText
          value={value}
          onChangeText={setValue}
          placeholder={'E.g I m in front of the bus stop.'}
          style={{marginTop: SIZES.fifteen, color: COLORS.normal.black}}
        />

        <CustomButton
          label={'Confirm'}
          onPress={onPressConfirm}
          style={{marginTop: SIZES.twenty * 2, marginBottom: SIZES.ten}}
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
