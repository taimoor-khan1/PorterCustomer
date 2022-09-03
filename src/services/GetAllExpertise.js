import {CONSTANTS} from '../constants';
import axios from 'axios';
import utils from '../utils';

export const getAllExpertise = (token, callback) => {
  axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_ALL_EXPERTISE, {
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
