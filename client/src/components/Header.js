import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAuthentication } from '../store/action/login';

import HeaderStyle from './UI/HeaderStyle';

const Header = () => {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.login.loginCheck);

  const [nav, setNav] = useState([
    { text: 'Login', path: 'login' },
    { text: 'Register', path: 'register' },
  ]);

  // unsets the token if logout option is present on header and clicked on and redirects back home
  const logoutToken = () => {
    dispatch(unsetAuthentication());

    window.location.reload(false);
  };

  // updates navbar once the token state changes
  useEffect(() => {
    if (login) {
      setNav([{ text: 'Logout', path: '', onClick: logoutToken }]);
    }
  }, [login]);

  return <HeaderStyle logo="Notes" links={nav} />;
};

export default Header;
