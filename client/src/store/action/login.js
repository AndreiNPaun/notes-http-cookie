import Cookies from 'js-cookie';
import UseHttp from '../../hooks/useHttp';

import { loginActions } from '../slice/login';

// post request with user details and store boolean value in cookie
export const setLogin = (user, url) => {
  return async (dispatch) => {
    try {
      const response = await UseHttp({ method: 'post', url, values: user });

      Cookies.set('Authenticated', response);

      // update authentication slice
      dispatch(loginActions.login({ loginCheck: response }));
    } catch (error) {
      throw error;
    }
  };
};

// store boolean value in cookie
export const setLoginFromURL = (success) => {
  return (dispatch) => {
    try {
      Cookies.set('Authenticated', success.success);

      // update authentication slice
      dispatch(loginActions.login({ loginCheck: success.success }));
    } catch (error) {
      throw error;
    }
  };
};

export const unsetAuthentication = () => {
  return async (dispatch) => {
    try {
      Cookies.remove('Authenticated');

      // update store token
      dispatch(loginActions.logout());

      // post request will remove cookie stored tokens
      await UseHttp({
        method: 'post',
        url: 'http://localhost:8000/api/unset-token',
      });
    } catch (error) {
      throw error;
    }
  };
};
