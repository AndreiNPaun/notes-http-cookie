import React, { useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { Link, Button } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setTokenFromURL } from '../../../store/action/login';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTokensFromUrl = () => {
    const token = props.token;
    const refreshToken = props.refreshToken;

    if (token && refreshToken) {
      dispatch(setTokenFromURL({ token, refreshToken }));
      navigate('/');
    }
  };

  useEffect(() => {
    getTokensFromUrl();
  }, []);

  return (
    <Link
      _hover={{ textDecoration: 'none' }}
      href="http://localhost:8000/api/auth/google"
    >
      <Button
        bg="#FFFFFF"
        border="1px solid #ccc"
        borderColor="rgba(0, 0, 0, 0.15)"
        leftIcon={<FcGoogle size={26} />}
      >
        Sign In with Google
      </Button>
    </Link>
  );
};

export default GoogleAuth;
