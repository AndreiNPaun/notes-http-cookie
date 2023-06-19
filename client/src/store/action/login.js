import Cookies from 'js-cookie';
import UseHttp from '../../hooks/useHttp';

import { loginActions } from '../slice/login';

export const setLogin = (user, url) => {
  return async (dispatch) => {
    try {
      const response = await UseHttp({ method: 'post', url, values: user });

      // const response = await UseHttp({
      //   method: 'get',
      //   url: 'http://localhost:8000/api/logging-in',
      // });
      console.log('validation resp:', response);

      Cookies.set('Authenticated', response);

      // update authentication slice
      dispatch(loginActions.login({ loginCheck: response }));
    } catch (error) {
      throw error;
    }
  };
};

export const setTokenFromURL = ({ token, refreshToken }) => {
  return (dispatch) => {
    // try {
    //   // sets the cookie to expire in 2h
    //   const expireTwoHours = 2 / 24;
    //   cookie.set('token', token, { expires: expireTwoHours });
    //   cookie.set('refreshToken', refreshToken, { expires: expireTwoHours });
    //   // update store token
    //   dispatch(loginActions.login({ token }));
    // } catch (error) {
    //   throw error;
    // }
  };
};

export const removeToken = () => {
  return (dispatch) => {
    try {
      Cookies.remove('Authenticated');

      // update store token
      dispatch(loginActions.logout());
    } catch (error) {
      throw error;
    }
  };
};
