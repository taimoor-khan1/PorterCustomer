import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getLatestOffers = async () => {
  const onSuccess = ({data}) => {
    // // console.log('get getLatestOffers: ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('get getLatestOffers error: ', error);
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_LATEST_OFFERS, {
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

const latestOffersService = {
  getLatestOffers,
};

export default latestOffersService;
