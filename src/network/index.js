import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {CONSTANTS} from '../constants';

// Create axios client, pre-configured with baseURL
let Axios = axios.create({
  baseURL: CONSTANTS.BaseUrl,
  timeout: 60000,
});

export default Axios;

export const checkConnectivity = () => {
  return new Promise(resolve => {
    if (Platform.OS === 'android') {
      // For Android devices
      NetInfo.fetch().then(state => {
        resolve(state.isInternetReachable);
      });
    } else {
      // For iOS devices
      const unsubscribe = NetInfo.addEventListener(state => {
        unsubscribe();
        resolve(state.isInternetReachable);
      });
    }
  });
};
