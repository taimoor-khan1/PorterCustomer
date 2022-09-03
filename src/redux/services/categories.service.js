import {CONSTANTS} from '../../constants';
import axios from 'axios';

const getCategoriesRestaurant = token => {
  //   // console.log('CategoriesReducer -=-==-=-=-==-=--=-=- =>>>>> ', token);
  const onSuccess = ({data}) => {
    // // console.log('CategoriesReducer -=-==-=-=-==-=--=-=- =>>>>> ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('CategoriesReducer  error-=-==-=-=-==-=--=-=- =>>>>> ', error);

    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_URLS.BASE1 +
        CONSTANTS.API_URLS.GET_ALL_CATEGORIES_RESTAURANT,
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(onSuccess)
    .catch(onFailure);
};

const getCategoriesGrocery = token => {
  //   // console.log('CategoriesReducer -=-==-=-=-==-=--=-=- =>>>>> ', token);
  const onSuccess = ({data}) => {
    // // console.log('CategoriesReducer -=-==-=-=-==-=--=-=- =>>>>> ', data);
    return data;
  };

  const onFailure = error => {
    // // console.log('CategoriesReducer  error-=-==-=-=-==-=--=-=- =>>>>> ', error);

    throw error;
  };

  return axios
    .get(
      CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_ALL_CATEGORIES_GROCERY,
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(onSuccess)
    .catch(onFailure);
};

const categoriesService = {
  getCategoriesRestaurant,
  getCategoriesGrocery,
};
export default categoriesService;
