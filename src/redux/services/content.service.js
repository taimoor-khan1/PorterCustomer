import axios from 'axios';
import {CONSTANTS} from '../../constants';

const getContent = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_CONTENT)
    .then(onSuccess)
    .catch(onFailure);
};

const contentService = {
  getContent,
};
export default contentService;
