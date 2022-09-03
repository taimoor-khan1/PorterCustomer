import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getCoupons = async () => {
  const onSuccess = ({data}) => {
    // // console.log('get coupons: ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('get coupons error: ', error);
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.COUPONS, {
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

const couponsService = {
  getCoupons,
};

export default couponsService;
