import React from 'react';
import {RefreshControl, Alert} from 'react-native';
import {COLORS, FONTFAMILY, SCREENS} from '../constants';
import ErrorView from '../components/modals/ErrorView';
import ThemeUtils from './ThemeUtils';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

class utils {
  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        {text: 'NO', onPress: () => callback('error')},
        {text: 'YES', onPress: () => callback('success')},
      ],
      {cancelable: false},
    );
  }

  successAlert(message) {
    showMessage({
      message: message,
      type: 'success',
      icon: 'success',
      animated: true,
      style: {
        backgroundColor: COLORS.primary.cherry,
      },
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
    });
  }

  warningAlert(message) {
    showMessage({
      message: message,
      type: 'warning',
      icon: 'warning',
      animated: true,
      style: {
        backgroundColor: COLORS.primary.cherry,
      },
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
    });
  }

  errorAlert(message) {
    showMessage({
      message: message,
      type: 'danger',
      icon: 'danger',
      animated: true,
      style: {
        backgroundColor: COLORS.primary.cherry,
      },
      textStyle: {fontFamily: FONTFAMILY.Medium},
      titleStyle: {fontFamily: FONTFAMILY.Bold},
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  isNull(obj) {
    if (obj === null || obj === undefined || obj === '') {
      return true;
    } else {
      return false;
    }
  }
  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={'blue'}
        colors={['white']}
        progressBackgroundColor={'blue'}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  showResponseError(error) {
    var authErrorRegex = /4[0-9][1-9]/g;
    var serverErrorRegex = /5[0-9][0-9]/g;

    if (error.message === 'Network Error') {
      return 'Please check your network';
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);

        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            var temp = response.data[Object.keys(response.data)[0]];
            error = JSON.stringify(temp).replace('[', '').replace(']', '');
          }
          return error;
        } else if (authErrorRegex.test(errorCode)) {
          return 'Authentication failed';
        } else if (serverErrorRegex.test(errorCode)) {
          return 'Something went wrong with the server';
        }
      } else {
        return error;
      }
    }
  }
}

export default new utils();
export {ThemeUtils};
