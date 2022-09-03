import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {verifyOtpAndLogin} from '../../../redux/slice/auth';
import CustomButton from '../../../components/CustomButton';
import {hide, show} from '../../../redux/slice/loader';
import BackArrow from '../../../components/BackArrow';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  FONTS,
  COLORS,
  SIZES,
  FONTFAMILY,
  SCREENS,
  CONSTANTS,
} from '../../../constants';

export default function Verification({navigation, route}) {
  const dispatcher = useDispatch();
  const [code, setCode] = useState('');

  // verify for sign up api call
  const verifyForSignUp = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      utils.errorAlert('Invalid Code');
      return;
    }

    dispatcher(show());

    dispatcher(verifyOtpAndLogin({email: route.params.email, otp: code}))
      .unwrap()
      .then(_response => {
        dispatcher(hide());
      })
      .catch(e => {
        dispatcher(hide());
        utils.errorAlert(e);
      });
  };

  // reset password api call
  const verifyForForgotPassword = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      utils.errorAlert('Invalid Code');
      return;
    }

    const onSuccess = ({data}) => {
      dispatcher(hide());
      navigation.navigate(SCREENS.ResetPassword, {
        email: data.data.email,
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

    var postData = {
      email: route.params.email,
      otp: code,
      redirectToPassword: true,
    };

    dispatcher(show());
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.VERIFY_OTP}`,
        postData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  // resend otp api call
  const resendOTP = () => {
    // console.log('route.params.email: ', route.params.email);
    setCode('');
    const onSuccess = ({data}) => {
      console.log('resendOTP onSuccess: ', data.data.otp);

      dispatcher(hide());
      utils.successAlert(data.message);
    };

    const onFailure = error => {
      console.log('error: ', error.response);
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

    var postData = {
      email: route.params.email,
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.RESEND_OTP}`,
        postData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const disabled = () => {
    if (!utils.isNull(code)) {
      return false;
    }
    return true;
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
      <Text
        style={[
          FONTS.boldFont24,
          {
            color: COLORS.primary.navy,
            textAlign: 'center',
            lineHeight: SIZES.twentyFive * 1.3,
          },
        ]}>
        We have sent an OTP to your Email Address
      </Text>

      <Text
        style={[
          FONTS.semiBoldFont16,
          {
            color: COLORS.normal.charcoalGrey,
            textAlign: 'center',
            lineHeight: SIZES.twentyFive,
            marginTop: SIZES.ten,
          },
        ]}>
        {route.params.email}
      </Text>

      {/* <Text
        style={[
          FONTS.semiBoldFont16,
          {
            color: COLORS.normal.charcoalGrey,
            textAlign: 'center',
            lineHeight: SIZES.twentyFive,
            marginTop: SIZES.ten,
          },
        ]}>
        Please check your email address to continue
      </Text> */}
      <View
        style={{
          marginTop: SIZES.twentyFive * 1.5,
          paddingHorizontal: SIZES.twentyFive,
        }}>
        <OTPInputView
          style={{
            width: '100%',
            height: SIZES.twenty * 5,
          }}
          pinCount={4}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setCode(code);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {}}
        />
      </View>

      <CustomButton
        label={'Next'}
        disabled={disabled()}
        style={{
          marginTop: SIZES.twentyFive,
          backgroundColor: disabled()
            ? `${COLORS.primary.cherry}60`
            : COLORS.primary.cherry,
        }}
        onPress={() => {
          if (route.params.from === CONSTANTS.DESTINATIONS.SIGN_UP) {
            verifyForSignUp();
          } else {
            verifyForForgotPassword();
          }
        }}
      />

      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.twentyFive * 1.5,
        }}>
        <Text
          style={[
            FONTS.mediumFont12,
            {color: COLORS.normal.charcoalGrey, textAlign: 'center'},
          ]}>
          Didn't Recieve?
        </Text>
        <MyTouchableOpacity onPress={resendOTP}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.primary.cherry, textAlign: 'center'},
            ]}>
            {' '}
            Click here
          </Text>
        </MyTouchableOpacity>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.twentyFive,
    borderColor: COLORS.normal.brownGrey,
    fontSize: SIZES.twentyFive,
    color: COLORS.normal.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.twentyFive,
    borderColor: COLORS.primary.cherry,
    fontSize: SIZES.twentyFive,
    fontFamily: FONTFAMILY.Light,
  },
});
