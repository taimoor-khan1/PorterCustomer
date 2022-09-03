import axios from 'axios';
import {CONSTANTS} from '../../constants';

const login = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  // // console.log(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN);
  // // console.log(formData);

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, formData)
    .then(onSuccess)
    .catch(onFailure);
};

export const appleLoginUser = data => {
  let name = data.user.displayName;
  let email = data.additionalUserInfo.profile.email;
  let socialToken = data.user.uid;
  var postData;

  if (name === null) {
    postData = {
      email: email,
      name: email.split('@')[0],
      social_token: socialToken,
    };
  } else {
    postData = {
      email: email,
      name: name,
      social_token: socialToken,
    };
  }

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.APPLE_SIGN_UP, postData)
    .then(onSuccess)
    .catch(onFailure);
};

const GoogleSighnIn = (name, email, socialToken, role) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('social_token', socialToken);
  formData.append('role', role);

  const data = {
    name: name,
    email: email,
    social_token: socialToken,
    role: role,
  };

  // // console.log('data ========= ', data);
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GOOGLe_SIGN_UP, data)
    .then(onSuccess)
    .catch(onFailure);
};

const FacbookSighnIn = (name, email, socialToken, role) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('social_token', socialToken);
  formData.append('role', role);

  const data = {
    name: name,
    email: email,
    social_token: socialToken,
    role: role,
  };

  // // console.log('data ========= ', data);
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.FACEBOOK_SIGN_UP, data)
    .then(onSuccess)
    .catch(onFailure);
};

const verifyOtpAndLogin = (email, otp) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('otp', otp);

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.VERIFY_OTP}`,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = accessToken => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGOUT, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  verifyOtpAndLogin,
  logout,
  GoogleSighnIn,
  FacbookSighnIn,
  appleLoginUser,
};
export default authService;
