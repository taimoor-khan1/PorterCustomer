import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import EditText from '../../../components/EditText';
import {COLORS, CONSTANTS, FONTS, SCREENS, SIZES} from '../../../constants';
import utils from '../../../utils';
import axios from 'axios';
import {hide, show} from '../../../redux/slice/loader';
import {show as showError} from '../../../redux/slice/error';
import BackArrow from '../../../components/BackArrow';

export default function ForgotPassword({navigation}) {
  const dispatcher = useDispatch();
  const [email, setEmail] = useState('');

  // forget password send otp method api call
  const forgotPassword = () => {
    if (!utils.validateEmail(email)) {
      utils.errorAlert('Invalid Email');
      return;
    }

    const onSuccess = ({data}) => {
      // // console.log('ForgotPassword onSuccess: ', data.data.otp);

      dispatcher(hide());
      navigation.navigate(SCREENS.OtpVerification, {
        email: email,
        from: CONSTANTS.DESTINATIONS.FORGOT_PASSWORD,
      });
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

    var postData = null;
    postData = {
      email: email,
    };

    dispatcher(show());
    axios
      .get(`${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`, {
        params: postData,
      })
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
          Forgot Password
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
          Please enter your email to receive a OTP to reset your password
        </Text>
      </View>

      <View style={{marginTop: SIZES.twentyFive * 2}}>
        <EditText
          keyboardType={'email-address'}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <CustomButton
        label={'Send'}
        style={{
          marginTop: SIZES.twentyFive * 2,
        }}
        onPress={forgotPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
