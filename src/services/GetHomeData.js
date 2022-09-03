import {CONSTANTS} from '../constants';
import axios from 'axios';
import utils from '../utils';

export const getHomeData = (token, type, callback) => {
  // // console.log(
  //   'CONSTANTS.API_URLS.BASE1 ==== >>>> ',
  //   CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_HOME_DATA + type,
  // );
  axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_HOME_DATA + type, {
      headers: {Authorization: token},
    })
    .then(({data}) => {
      callback(data, {success: 1, error: null});
      return data;
    })
    .catch(e => {
      let response = {status: 1, message: 'success', data: []};
      let err = utils.showResponseError(e);
      callback(response, {success: 0, error: err});
      return response;
    });
};

//  http://192.168.18.6/porter/api/v1/customer/home?type=grocery
