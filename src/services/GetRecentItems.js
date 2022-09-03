import axios from 'axios';
import {CONSTANTS} from '../constants';
import utils from '../utils';

export const getRecentItems = (token, type, callback) => {
  // // console.log(
  //   'getRecentItems URL === >>> ',
  //   CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_RECENT_ITEMS + type,
  // );
  axios
    .get(
      CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_RECENT_ITEMS + type,
      {
        headers: {Authorization: token},
      },
    )
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
