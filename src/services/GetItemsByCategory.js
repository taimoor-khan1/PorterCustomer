import {CONSTANTS} from '../constants';
import axios from 'axios';
import utils from '../utils';

export const getItemsByCategory = (
  type,
  TOKEN,
  categoryID,
  isRefreshing = false,
  response,
  restID = null,
  expID = null,
) => {
  // &expertiseID
  let url = '';

  let mySlug =
    type === 'grocery' ? '&groceryID=' + restID : '&restID=' + restID;

  if (
    restID !== null &&
    restID !== undefined &&
    categoryID !== null &&
    categoryID !== undefined
  ) {
    url =
      CONSTANTS.API_URLS.BASE1 +
      CONSTANTS.API_URLS.GET_ITEMS_BY_CATEGORIES +
      'catID=' +
      categoryID +
      mySlug;
  } else if (restID !== null && restID !== undefined) {
    url =
      CONSTANTS.API_URLS.BASE1 +
      CONSTANTS.API_URLS.GET_ITEMS_BY_CATEGORIES +
      mySlug;
  } else if (expID !== null && expID !== undefined) {
    url =
      CONSTANTS.API_URLS.BASE1 +
      CONSTANTS.API_URLS.GET_ITEMS_BY_CATEGORIES +
      '&expertiseID=' +
      expID;
  } else if (categoryID !== null && categoryID !== undefined) {
    url =
      CONSTANTS.API_URLS.BASE1 +
      CONSTANTS.API_URLS.GET_ITEMS_BY_CATEGORIES +
      'catID=' +
      categoryID;
  } else {
    url = CONSTANTS.API_URLS.BASE1 + CONSTANTS.API_URLS.GET_ITEMS_BY_CATEGORIES;
  }

  // console.log(
  //   'url ==== : ',
  //   url,
  //   '\n',
  //   categoryID,
  //   isRefreshing,
  //   restID,
  //   mySlug,
  // );

  axios
    .get(url, {headers: {Authorization: TOKEN}})
    .then(({data}) => {
      // // console.log('.then(({data}) => { getItemsByCategory : ', data);
      response({
        success: 1,
        data: data.data,
        error: null,
        isRefreshing: isRefreshing,
      });
    })
    .catch(e => {
      let err = utils.showResponseError(e);
      // // console.log(' .catch(e => { getItemsByCategory : ', err);
      response({
        success: 0,
        data: null,
        error: err,
        isRefreshing: isRefreshing,
      });
    });
};
