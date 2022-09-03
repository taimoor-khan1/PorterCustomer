import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FacebookSignUp, GoogleSignUp, login} from '../../../redux/slice/auth';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import SocialButton from '../../../components/SocialButton';
import CustomButton from '../../../components/CustomButton';
import {hide, show} from '../../../redux/slice/loader';
import EditText from '../../../components/EditText';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
} from '../../../constants';

export default function Login({navigation}) {
  const [email, setEmail] = useState(__DEV__ ? 'waqas123@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '12345678' : '');

  const dispatcher = useDispatch();

  const disabled = () => {
    return utils.isNull(email) || utils.isNull(password);
  };

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId:
        '559674016382-t5pqqernp3q796fcq2ufumveahki01mc.apps.googleusercontent.com',
      webClientId:
        '559674016382-t5pqqernp3q796fcq2ufumveahki01mc.apps.googleusercontent.com',
      iosClientId:
        '559674016382-r792h7bpv0bnhb8rfupgrrh1uuteniqu.apps.googleusercontent.com',
    });
  }, []);

  const loginUser = async () => {
    if (!utils.validateEmail(email)) {
      utils.errorAlert('Invalid Email');
      return;
    }

    if (utils.isEmptyOrSpaces(password)) {
      utils.errorAlert('Invalid Password');
      return;
    }

    if (password.length < 6) {
      utils.errorAlert('Password should not be less than 6 digits');
      return;
    }

    dispatcher(show());

    dispatcher(login({email, password}))
      .unwrap()
      .then(_response => {
        dispatcher(hide());

        if (_response.status === 2) {
          // // console.log('Login: User Not Verified: ', _response.data.otp);
          utils.warningAlert(_response.message);
          navigation.navigate(SCREENS.OtpVerification, {
            email: email,
            from: CONSTANTS.DESTINATIONS.SIGN_UP,
          });
        }
      })
      .catch(e => {
        dispatcher(hide());
        utils.errorAlert(e);
        //utils.errorAlert(e);
      });
  };

  // FaceBook Login
  async function onFacebookButtonPress() {
    auth().signOut();
    LoginManager.logOut();
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      // setShowLoader(false);
      return;
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    // // console.log(
    //   'const data = await AccessToken.getCurrentAccessToken();',
    //   data,
    // );

    if (!data) {
      // setShowLoader(false);
      return;
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(async res => {
        // // console.log('Facebook ==== ', res);
        dispatcher(
          FacebookSignUp({
            name: res.additionalUserInfo.profile.name,
            email: res.user.email,
            socialToken: res.user.uid,
            role: 2,
          }),
        )
          .unwrap()
          .then(_response => {
            // // console.log('responce ========== ', _response);
            dispatcher(hide());
          })
          .catch(e => {
            dispatcher(hide());
            utils.errorAlert(e);
          });
      })
      .catch(e => {
        // // console.log('exception in fb login ===== >>>> ', e);
      });
  }

  const onGoogleButtonPressed = async () => {
    auth().signOut();
    GoogleSignin.revokeAccess();
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(async res => {
        console.log('google login res ========== ', res);
        dispatcher(
          GoogleSignUp({
            name: res.additionalUserInfo.profile.name,
            email: res.user.email,
            socialToken: res.user.uid,
            role: 2,
          }),
        )
          .unwrap()
          .then(_response => {
            // // console.log('responce ========== ', _response);
            dispatcher(hide());
          })
          .catch(e => {
            dispatcher(hide());
            utils.errorAlert(e);
          });
      })
      .catch(e => {
        // // console.log('error +++==============', e);
      });
  };

  //Apple Login Method
  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      // throw 'Apple Sign-In failed - no identify token returned';
      console.log('not login');
    }

    const {email, email_verified, is_private_email, sub} = await jwt_decode(
      appleAuthRequestResponse.identityToken,
    );
    console.log(
      'email, email_verified, is_private_email, sub: ',
      email,
      email_verified,
      is_private_email,
      sub,
    );

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('appleCredential ====== >>>>>>>> ', appleCredential);

    // Sign-in the user with the apple credential
    auth()
      .signInWithCredential(appleCredential)
      .then(async res => {
        console.log('apple Login Responce ========= >', res);
        // dispatcher(show());
        // await dispatcher(
        //   appleLoginUser(res, responcee => {
        //     setIsloading(false);
        //     // console.log('Api Call back Responce ', responcee);
        //     // setIsloading(true);
        //     if (responcee.success === 0) {
        //       setIsloading(false);
        //       seterrorMsg(JSON.stringify(responcee.data));
        //       setshowErrorView(true);
        //     }
        //   }),
        // );
        // dispatcher(hide());
      })
      .catch(e => {
        console.log(' error apple login ======= >>>>>>>> ', e);
        dispatcher(hide());
      });
  };

  return (
    <ScrollView
      style={[
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true) + 10,
        },
      ]}
      contentContainerStyle={{
        paddingBottom: SIZES.twenty * 2,
        paddingHorizontal: SIZES.fifteen,
      }}>
      {/* ======================== HEADER HERE ======================== */}
      <View style={{}}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
          Login
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.charcoalGrey, marginTop: SIZES.ten},
          ]}>
          Add your details to login
        </Text>
      </View>

      {/* ======================== TEXTINPUTS HERE ======================== */}
      <View style={{}}>
        <View style={{marginTop: SIZES.twentyFive}}>
          <EditText
            placeholder="Enter Email"
            hasIcon
            name="mail"
            type={FONTFAMILY.AntDesign}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen}}>
          <EditText
            placeholder="Enter password"
            password
            hasIcon
            name="lock-open"
            type={FONTFAMILY.SimpleLineIcons}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => {
              loginUser();
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignSelf: 'center'}}
          onPress={() => navigation.navigate(SCREENS.NewPassword)}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary.navy, marginVertical: SIZES.twenty},
            ]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======================== BUTTONS HERE ======================== */}
      <View style={{}}>
        <CustomButton
          // disabled={disabled()}
          label={'Log In'}
          style={{
            marginTop: SIZES.ten,
            backgroundColor: disabled()
              ? `${COLORS.primary.cherry}60`
              : COLORS.primary.cherry,
          }}
          onPress={loginUser}
        />

        <MyTouchableOpacity
        // onPress={() => navigation.navigate(SCREENS.SignUp)}
        >
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.twentyFive * 1.5,
            }}>
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.brownGrey, textAlign: 'center'},
              ]}>
              or Continue with
            </Text>
          </Row>
        </MyTouchableOpacity>

        {/* {Platform.OS === 'ios' && (
          <View>
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                height: 55,
                marginTop: SIZES.ten,
                borderRadius: SIZES.fifty,
              }}
              onPress={() => {
                onAppleButtonPress();
              }}
            />
          </View>
        )} */}

        {/* {Platform.OS === 'ios' && (
          <SocialButton
            label={'Continue with Apple'}
            iconType={FONTFAMILY.FontAwesome}
            iconName={'apple'}
            bgColor={COLORS.normal.black}
            onPress={onAppleButtonPress}
            style={{marginTop: SIZES.twenty, color: COLORS.normal.white}}
          />
        )} */}

        {/* <SocialButton
          label={'Continue with Facebook'}
          iconType={FONTFAMILY.FontAwesome}
          iconName={'facebook'}
          bgColor={'#0037c1'}
          onPress={onFacebookButtonPress}
          style={{marginVertical: SIZES.twenty, color: COLORS.normal.white}}
        /> */}

        <SocialButton
          iconType={FONTFAMILY.Ionicons}
          label={'Continue with Google'}
          iconName={'ios-logo-google'}
          bgColor={'#eb4335'}
          style={{marginVertical: SIZES.twenty}}
          onPress={onGoogleButtonPressed}
        />
      </View>
      <MyTouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.twenty,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.SignUp);
        }}>
        <Text style={[FONTS.mediumFont12]}>Don't Have Account </Text>
        <Text style={[FONTS.mediumFont12, {color: COLORS.primary.cherry}]}>
          SignUp
        </Text>
      </MyTouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
