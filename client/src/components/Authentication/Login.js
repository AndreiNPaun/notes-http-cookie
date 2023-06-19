import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setLogin } from '../../store/action/login';
import GoogleAuth from './ThirdParties/GoogleAuth';

import Card from '../UI/Card';
import InputFields from '../UI/InputFields';
import Button from '../UI/Button';
import Styles from '../UI/LoginRegiserFormStyles';
import { Center, Text } from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const [labelStyle, inputStyle, cardStyle] = Styles();

  // get tokens from url if they exist
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const refreshToken = urlParams.get('refreshToken');

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const url = 'http://localhost:8000/api/login';

    // if login is successful set up authentication token
    try {
      await dispatch(setLogin(user, url));

      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.error);
      throw error;
    }
  };

  return (
    <Card cardStyle={cardStyle}>
      <form onSubmit={loginHandler}>
        <Center>
          <Text fontSize="3xl">Login</Text>
        </Center>
        <Center>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Center>
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="email"
          labelText="Email"
          id="email"
          ref={emailInputRef}
        />
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="password"
          labelText="Password"
          type="password"
          id="password"
          ref={passwordInputRef}
        />
        <Center mt="1rem">
          <Button type="submit">Login</Button>
        </Center>
        <Center m="0.3rem">
          <GoogleAuth token={token} refreshToken={refreshToken} />
        </Center>
      </form>
    </Card>
  );
};

export default Login;
