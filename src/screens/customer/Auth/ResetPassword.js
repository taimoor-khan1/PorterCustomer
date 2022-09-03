import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BackArrow from '../../../components/BackArrow';
import CustomButton from '../../../components/CustomButton';
import EditText from '../../../components/EditText';
import {useDispatch} from 'react-redux';
import {COLORS, CONSTANTS, FONTS, SCREENS, SIZES} from '../../../constants';
import utils from '../../../utils';
import {hide, show} from '../../../redux/slice/loader';
import {show as showError} from '../../../redux/slice/error';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

export default function ResetPassword({navigation, route}) {
  const dispatcher = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // forget password send otp method api call
  const resetPassword = () => {
    if (
      utils.isEmptyOrSpaces(password) ||
      password.length < 6 ||
      password.length > 14
    ) {
      utils.errorAlert('Password should be in range 6-14');
      return;
    }

    if (password !== confirmPassword) {
      utils.errorAlert('Passwords did not match');
      return;
    }

    const onSuccess = ({data}) => {
      dispatcher(hide());

      utils.successAlert(data.message);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: SCREENS.Login,
            },
          ],
        }),
      );
    };

    const onFailure = error => {
      dispatcher(hide());

      let err = utils.showResponseError(error);
      if (Platform.OS === 'android') {
        utils.errorAlert(err);
      } else {
        setTimeout(() => {
          utils.errorAlert(err);
        }, 350);
      }
    };

    const formData = new FormData();
    formData.append('email', route.params.email);
    formData.append('password', password);
    formData.append('password_confirmation', password);

    dispatcher(show());
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.RESET_PASSWORD}`,
        formData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true) + 10,
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      <BackArrow />
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
          Reset Password
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.normal.charcoalGrey,
              marginTop: SIZES.ten,
              textAlign: 'center',
              lineHeight: SIZES.twentyFive,
            },
          ]}>
          Please enter your desired password to continue
        </Text>
      </View>

      <View style={{marginTop: SIZES.twentyFive * 2}}>
        <EditText
          password
          placeholder=" New Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive * 0.5}}>
        <EditText
          password
          placeholder=" Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <CustomButton
        label={'Reset'}
        style={{
          marginTop: SIZES.twentyFive * 2,
        }}
        onPress={resetPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
