import React, {useState, useRef} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CustomButton from '../../../components/CustomButton';
import {hide, show} from '../../../redux/slice/loader';
import {useKeyboard} from '../../../hooks/useKeyboard';
import EditText from '../../../components/EditText';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  COLORS,
  FONTS,
  SIZES,
  FONTFAMILY,
  SCREENS,
  CONSTANTS,
  height,
} from './../../../constants/theme';

export default function SignUp({navigation}) {
  const dispatcher = useDispatch();
  const {keyboardShown} = useKeyboard();

  const phoneInput = useRef(null);
  const [countryCode, setCountryCode] = useState('+1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [borderColor, setBorderColor] = useState(COLORS.normal.charcoalGrey);

  const onSelect = country => {
    console.log('country: ', country);
    setCountryCode(
      !country.callingCode[0].includes('+')
        ? `+${country.callingCode[0]}`
        : country.callingCode[0],
    );
  };

  const disabled = () => {
    if (
      !utils.isNull(name) &&
      !utils.isNull(email) &&
      !utils.isNull(phone) &&
      !utils.isNull(password) &&
      !utils.isNull(confirmPassword)
    ) {
      return false;
    }
    return true;
  };

  const checkValidation = () => {
    console.log('countryCode: ', countryCode);
    if (utils.isEmptyOrSpaces(name) || name.length < 3) {
      utils.errorAlert('Invalid name');
      return false;
    }

    if (!utils.validateEmail(email)) {
      utils.errorAlert('Invalid email');
      return false;
    }

    if (utils.isEmptyOrSpaces(phone) || phone.length < 8 || phone.length > 13) {
      utils.errorAlert('Invalid phone number');
      return false;
    }

    if (utils.isEmptyOrSpaces(address)) {
      utils.errorAlert('Invalid address');
      return false;
    }

    if (
      utils.isEmptyOrSpaces(password) ||
      password.length < 6 ||
      password.length > 14
    ) {
      utils.errorAlert('Password should be in range 6-14');
      return false;
    }

    if (password !== confirmPassword) {
      utils.errorAlert('Passwords did not match');
      return false;
    }

    return true;
  };

  const signUpUser = () => {
    if (!checkValidation()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country_code', countryCode);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('password', password);
    formData.append('password_confirmation', password);
    formData.append('verified_by', 'email');

    const onSuccess = ({data}) => {
      // // console.log('signup response: ', data);
      dispatcher(hide());

      utils.successAlert(
        'Registered successfully! Please enter the otp code to continue.',
      );

      navigation.navigate(SCREENS.OtpVerification, {
        from: CONSTANTS.DESTINATIONS.SIGN_UP,
        email: email,
      });
    };

    const onFailure = error => {
      // // console.log('error: ', error);
      // // console.log('error: ', error.response);
      dispatcher(hide());
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    dispatcher(show());
    axios
      .post(`${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.SIGN_UP}`, formData)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: keyboardShown ? height * 0.3 : height * 0.015,
        paddingHorizontal: SIZES.fifteen,
        paddingTop:
          Platform.OS === 'android'
            ? SIZES.twentyFive * 1.8
            : getStatusBarHeight(true),
        backgroundColor: COLORS.normal.white,
      }}>
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
            Sign Up
          </Text>

          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.normal.charcoalGrey, marginTop: SIZES.ten},
            ]}>
            Add your details to login
          </Text>
        </View>
        <MyTouchableOpacity>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary.cherry, marginTop: SIZES.ten},
            ]}>
            Register Your Restaurant
          </Text>
        </MyTouchableOpacity>
      </View>

      {/* ======================== TEXTINPUTS HERE ======================== */}

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder="Name"
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder="Email"
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <PhoneInput
        ref={phoneInput}
        defaultCode="US"
        layout="first"
        defaultValue={phone}
        onChangeCountry={onSelect}
        onChangeText={text => setPhone(text)}
        textInputStyle={{padding: 0}}
        countryPickerButtonStyle={{
          borderRadius: SIZES.fifty,
        }}
        textContainerStyle={{
          borderRadius: SIZES.fifty,
          backgroundColor: 'transparent',
        }}
        containerStyle={{
          height: 60,
          width: '100%',
          borderRadius: SIZES.fifty,
          borderWidth: 1,
          borderColor: borderColor,
          marginTop: SIZES.fifteen * 1.3,
        }}
      />
      {phone.length && !phoneInput.current?.isValidNumber(phone) ? (
        <Text
          style={{
            color: 'red',
            fontSize: SIZES.body10,
            marginLeft: SIZES.twenty,
          }}>
          Invalid phone number
        </Text>
      ) : null}

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          value={address}
          placeholder="Address"
          onChangeText={txt => setAddress(txt)}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          hasIcon
          password
          name="lock-open"
          value={password}
          placeholder="Password"
          type={FONTFAMILY.SimpleLineIcons}
          onChangeText={txt => setPassword(txt)}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          hasIcon
          password
          name="lock-open"
          value={confirmPassword}
          placeholder="Confirm Password"
          type={FONTFAMILY.SimpleLineIcons}
          onChangeText={txt => setConfirmPassword(txt)}
        />
      </View>

      <CustomButton
        label={'Sign Up'}
        onPress={signUpUser}
        disabled={disabled()}
        style={{
          marginTop: SIZES.twentyFive,
          backgroundColor: disabled()
            ? `${COLORS.primary.cherry}60`
            : COLORS.primary.cherry,
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
          Already have an account?
        </Text>
        <MyTouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.primary.cherry, textAlign: 'center'},
            ]}>
            {' '}
            Log In
          </Text>
        </MyTouchableOpacity>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
