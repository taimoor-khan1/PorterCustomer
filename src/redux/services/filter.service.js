import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getFilterOptions = async () => {
  const onSuccess = ({data}) => {
    // // console.log('get getLatestOffers: ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('get getLatestOffers error: ', error);
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_FILTERS, {
      headers: {
        Authorization: store.getState()?.Auth.accessToken,
      },

      // params: {
      //   id: store.getState().Profile.profile.id,
      // },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const applyFilters = async filters => {
  const onSuccess = ({data}) => {
    // // console.log('get getLatestOffers: ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('get getLatestOffers error: ', error);
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.APPLY_FILTERS, {
      filters,
      headers: {
        Authorization: store.getState()?.Auth.accessToken,
      },
      // params: {
      //   id: store.getState().Profile.profile.id,
      // },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const filterService = {
  getFilterOptions,
  applyFilters,
};

export default filterService;
