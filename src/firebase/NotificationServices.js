import axios from 'axios';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import Firebase from './firebaseConfig';
import {CONSTANTS} from '../constants';
import utils from '../utils';

export async function requestUserPermission(userToken, userId) {
  // console.log('requestUserPermission ======= >>>>>>>>>>> ');
  Firebase();
  // const isDeviceRegisteredForRemoteMessages = await messaging()
  //   .isDeviceRegisteredForRemoteMessages;
  // if (!isDeviceRegisteredForRemoteMessages) {
  //   await messaging().registerDeviceForRemoteMessages();
  // }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken(userToken, userId);
  }
}

const getFcmToken = async (userToken, userId) => {
  try {
    messaging()
      .getToken()
      .then(token => {
        SetFcmToken(token, userToken, userId);
      });

    messaging().onTokenRefresh(token => {
      SetFcmToken(token, userToken, userId);
    });
  } catch (error) {}
};

const SetFcmToken = async (token, userToken, userId) => {
  console.log(
    'set fcm token ==========>',
    token,
    'user id ==========>',
    userId,
  );

  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child('Customer')
        .child(userId.toString())
        .set(token)
        .then(() => {
          // // console.log('token saved on firebase');
        });
    } catch (error) {
      // console.log('saving fcm token error: ', error);
    }
  }

  let config = {
    headers: {
      Authorization: userToken,
    },
  };
  let data = {
    device_token: token,
  };
  const onSuccess = ({data}) => {
    console.log('user fcm token save from notification service');
  };
  const onFailure = error => {
    let errorMsg = utils.showResponseError(error);
    // // console.log('user fcm token error', errorMsg);
  };

  axios
    .post(
      CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.SAVEDEVICETOKEN,
      data,
      config,
    )
    .then(onSuccess)
    .catch(onFailure);
};

export const removeFcmTokenFromFirebase = async userId => {
  // // console.log('removeFcmTokenFromFirebase ==========>', userId);

  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set('');
      // .then(() => // console.log('Token removed from firebase..!!!!!.'));
    } catch (error) {
      // // console.log('error ====>', error);
    }
  }
};
