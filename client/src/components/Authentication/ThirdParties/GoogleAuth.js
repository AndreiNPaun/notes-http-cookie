import React, { useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { Link, Button } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { setLoginFromURL } from '../../../store/action/login';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSuccessFromURL = () => {
    const success = props.success;
    console.log(success);

    if (success) {
      dispatch(setLoginFromURL({ success }));
      navigate('/');
    }
  };

  useEffect(() => {
    getSuccessFromURL();
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
