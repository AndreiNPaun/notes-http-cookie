import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Center, Text } from '@chakra-ui/react';
import UseHttp from '../../hooks/useHttp';

import Card from '../UI/Card';
import Button from '../UI/Button';
import InputFields from '../UI/InputFields';
import Styles from '../UI/LoginRegiserFormStyles';

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [labelStyle, inputStyle, cardStyle] = Styles();

  // after for submission store input data in variables and then call the register function to create user account
  const registerHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    const url = 'http://localhost:8000/api/register';

    // submits input data to server
    try {
      await UseHttp({ method: 'post', url, values: user });

      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      confirmPasswordInputRef.current.value = '';

      navigate('/login');
    } catch (error) {
      // return error sent from server and display it to user
      setErrorMessage(error.response.data.error);
      throw error;
    }
  };

  return (
    <Card cardStyle={cardStyle}>
      <form onSubmit={registerHandler}>
        <Center>
          <Text fontSize="3xl">Register</Text>
        </Center>
        <Center>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Center>
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="email"
          labelText="Email"
          type="text"
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

        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="confirmPassport"
          labelText="Confirm Password"
          type="password"
          id="confirmPassport"
          ref={confirmPasswordInputRef}
        />
        <Center mt="1rem">
          <Button type="submit">Register</Button>
        </Center>
      </form>
    </Card>
  );
};

export default Register;
