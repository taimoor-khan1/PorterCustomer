import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getMyOrders = async () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_PAST_ORDER, {
      headers: {
        Authorization: store.getState()?.Auth.accessToken,
      },
      params: {
        customerID: store.getState()?.Profile.profile.id,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const MyOrdersService = {
  getMyOrders,
};
export default MyOrdersService;
